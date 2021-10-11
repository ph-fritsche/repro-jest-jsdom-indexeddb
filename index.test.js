require("fake-indexeddb/auto")

const { openDB } = require("idb")

test("sequence of store.put()", async () => {
    const db = await openDB("test", undefined, {
        upgrade(_db) {
            _db.createObjectStore("foo")
        }
    })

    const tx = db.transaction("foo", "readwrite")
    await tx.store.put("value1", "key1")

    // With jsdom environment the following line throws InvalidStateError
    await tx.store.put("value2", "key2")
})

test("walk cursor", async () => {
    const db = await openDB("test", undefined, {
        upgrade(_db) {
            _db.createObjectStore("foo")
        }
    })

    await db.transaction("foo", "readwrite").store.put("value1", "key1")
    await db.transaction("foo", "readwrite").store.put("value2", "key1")

    let cursor = await db.transaction("foo", "readonly").store.openCursor()
    while (cursor) {
        // With jsdom environment the following line throws TransactionInactiveError
        cursor = await cursor.continue()
    }
})

test("transaction is `active` on next tick", async () => {
    const db = await openDB("test", undefined, {
        upgrade(_db) {
            _db.createObjectStore("foo")
        }
    })

    const tx = db.transaction("foo", "readwrite")
    expect(tx._state).toBe('active')

    await new Promise(r => process.nextTick(r))

    expect(tx._state).toBe('active')
})

test('nextTick comes before setImmediate', async () => {
    const events = []

    setImmediate(() => events.push('Immediate'))
    process.nextTick(() => events.push('nextTick'))
    events.push('sameTick')

    await new Promise(r => setTimeout(r, 10))

    expect(events).toEqual(['sameTick', 'nextTick', 'Immediate'])
})

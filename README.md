**Reproduction of a bug(?) in idb + fake-indexeddb + jsdom**

1. Install
```
yarn install
```

2. Run tests
```
yarn test
```

The tests use the `idb` package to act upon the `IndexedDB` implementation by `fake-indexeddb`.

With `jsdom` environment in `jest@27` acting on a transaction after allowing other code to run (per `await`) throws errors.
This differs from executing the same calls in a `node` environment.

### Result
![image](https://user-images.githubusercontent.com/39068198/136771019-1d41a845-fb6d-4737-9dce-6f840bdd7ee1.png)

### Issue

The two tests added in https://github.com/ph-fritsche/repro-jest-jsdom-indexeddb/commit/0bd9819d0ab4175e39e446304d9c6353cb3e3aec confirm that the problem is the order of execution with `setImmediate` in `jsdom` environment.

### Workaround

https://github.com/ph-fritsche/repro-jest-jsdom-indexeddb/blob/master/fix.js#L1

```
yarn test:fix
```

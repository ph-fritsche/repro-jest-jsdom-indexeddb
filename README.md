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

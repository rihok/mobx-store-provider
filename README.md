# mobx-store-provider

Use React Hooks with mobx-state-tree.

## Install

```bash
# via NPM
npm install mobx-store-provider --save
```

```bash
# via Yarn
yarn add mobx-store-provider
```

## Intro

Using Hooks with mobx-state-tree requires a bit of glue logic, this library provides that.

mobx-store-provider supplies utilities for creating and supplying your React components with a mobx-state-tree store, so they can bind to and trigger actions on it.

```javascript
import React from "react";
import { types } from "mobx-state-tree";
import { createProvider, createStore } from "mobx-store-provider";
import MyNameDisplay from "./MyNameDisplay";

const AppStore = types.model({
  name: types.string,
});

export default () => {
  const Provider = createProvider("app");
  const appStore = createStore(() => AppStore.create({ name: "Jonathan" }));
  return (
    <Provider value={appStore}>
      <MyNameDisplay />
    </Provider>
  );
};
```

```javascript
// MyNameDisplay.js
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

export default observer(() => {
  const appStore = useStore("app");
  return <div>{appStore.name}</div>;
});
```

### API

- `createProvider(storeIdentifier: any = null): Provider`

  React Hook which you can use to create and/or retrieve the React `Context.Provider` for a given `storeIdentifier`. This is the wrapper component you can use to provide your application with the store.

  ```javascript
  import { createProvider } from "mobx-store-provider";
  const myStore = MyStore.create();

  export default function MainApp() {
    const Provider = createProvider();
    return (
      <Provider value={myStore}>
        <div>My awesome app</div>
      </Provider>
    );
  }
  ```

- `createStore(storeIdentifier: any = null): any`

  React Hook which you can use to instantiate new mobx-state-tree instances inside of components.

  It takes a `Function` as its input, you should instantiate and return your mobx-state-tree instance within that function.

  ```javascript
  import { createStore, createProvider } from "mobx-store-provider";

  function MyComponent() {
    const Provider = createProvider();
    const myStore = createStore(() => MyStore.create());
    return <Provider value={myStore}>...</Provider>;
  }
  ```

- `useStore(storeIdentifier: any = null, mapStateToProps: Function = identity): any`

  React Hook which you can use in your other components to retrieve and use a `store` for a given `storeIdentifier`.

  You can optionally pass it a `mapStateToProps` function which you can use to select and return specific slices of data into your components with. This would be analagous to redux selectors.

  In the absense of a `mapStateToProps` callback, it will return the store instance.

  ```javascript
  import { createStore, createProvider, useStore } from "mobx-store-provider";
  import { types } from "mobx-state-tree";
  const storeIdentifier = "house";

  function selectOwner(store) {
    return store.owner;
  }

  function House() {
    const owner = useStore(storeIdentifier, function mapStateToProps(store) {
      return selectOwner(store);
    });

    return (
      <>
        <div>House</div>
        <div>Owner: {owner}</div>
      </>
    );
  }

  export default function Dashboard() {
    const Provider = createProvider(storeIdentifier);
    const myStore = createStore(() => types.model({ owner: "Jonathan" }).create());
    return (
      <Provider value={myStore}>
        <House />
      </Provider>
    );
  }
  ```

* `useConsumer(storeIdentifier: any = null): Consumer`

  React Hook which you can use in your other components to consume and use a `store` for a given `storeIdentifier`. This is an alternative to using `useStore`, it provides the `store` as a render-prop of `Consumer`.

  ```javascript
  import { createStore, createProvider, useConsumer } from "mobx-store-provider";
  import { types } from "mobx-state-tree";
  const storeIdentifier = "house";

  function House() {
    const Consumer = useConsumer(storeIdentifier);
    return (
      <Consumer>
        {store => (
          <>
            <div>House</div>
            <div>Owner: {store.owner}</div>
          </>
        )}
      </Consumer>
    );
  }

  export default function Dashboard() {
    const Provider = createProvider(storeIdentifier);
    const myStore = createStore(() => types.model({ owner: "Jonathan" }).create());
    return (
      <Provider value={myStore}>
        <House />
      </Provider>
    );
  }
  ```

* `disposeStore(storeIdentifier: any = null): undefined`

  Cleanup, if your app doesn't need the store and Provider anymore.

  You might encounter this scenario if you created a store for a specific component (ie: not a long-lived root store/etc), and that component is removed.

  In that case you need to call `dispose()` so that the store can be fully released and garbage collected.

  ```javascript
  import React, { useEffect } from "react";
  import { types } from "mobx-state-tree";

  import { createProvider, createStore, disposeStore } from "mobx-store-provider";

  const MyStore = types.model({
    name: "Jonathan Newman",
  });

  export default function MyComponent() {
    useEffect(() => disposeStore("my-app"), []);
    const Provider = createProvider("my-app");
    const myStore = createStore(() => MyStore.create());
    return (
      <Provider value={myStore}>
        <div>...</div>
      </Provider>
    );
  }
  ```

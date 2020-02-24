# mobx-store-provider

[![CircleCI](https://circleci.com/gh/jonbnewman/mobx-store-provider.svg?style=svg)](https://circleci.com/gh/jonbnewman/mobx-store-provider)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/mobx-store-provider/badge.svg?branch=master&r=4)](https://coveralls.io/github/jonbnewman/mobx-store-provider?branch=master)

[![NPM Package](https://img.shields.io/npm/v/mobx-store-provider.svg?logo=npm&r=1)](https://www.npmjs.com/package/mobx-store-provider)
![Typescript](https://img.shields.io/npm/types/mobx-store-provider.svg?logo=typescript)
![Package size](https://img.shields.io/bundlephobia/minzip/mobx-store-provider)
![MIT License](https://img.shields.io/npm/l/mobx-store-provider.svg)

React Hooks + [mobx-state-tree](http://mobx-state-tree.js.org/)

**A straight-forward API for using [mobx-state-tree](http://mobx-state-tree.js.org/) with functional React components.**

_mobx-store-provider_ lets you setup and use your [mobx-state-tree](http://mobx-state-tree.js.org/) models (referred to as `stores` in this context) from within functional (hooks-based) React components.

1. [Installation](http://mobx-store-provider.overfoc.us/installation)

1. [Basic example](http://mobx-store-provider.overfoc.us/basic-example)

1. [API details](http://mobx-store-provider.overfoc.us/api-details-and-examples)

   - [useProvider](http://mobx-store-provider.overfoc.us/api-details-and-examples/useprovider) - Provide your components with a store
   - [createStore](http://mobx-store-provider.overfoc.us/api-details-and-examples/createstore) - Create a new store inside a component
   - [useStore](http://mobx-store-provider.overfoc.us/api-details-and-examples/usestore) - Use a store in a component

1. [Using multiple stores](http://mobx-store-provider.overfoc.us/using-multiple-stores)
1. [Typescript](http://mobx-store-provider.overfoc.us/typescript)
1. [Testing](http://mobx-store-provider.overfoc.us/testing)

## Installation

```bash
npm i mobx-store-provider
```

```bash
yarn add mobx-store-provider
```

## Basic example

```javascript
// App.jsx (Main App component, we use it to create and provide the store)
import React from "react";
import { useProvider, createStore } from "mobx-store-provider";
import AppStore from "./AppStore";
import UserDisplay from "./UserDisplay";

function App() {
  // Get the Provider for our AppStore
  const Provider = useProvider();

  // Create our AppStore instance
  const appStore = createStore(() => AppStore.create({ user: "Jonathan" }));

  // Wrap our application with the Provider passing it the appStore
  return (
    <Provider value={appStore}>
      <UserDisplay />
    </Provider>
  );
}

export default App;
```

```javascript
// UserDisplay.jsx (A component, we use the store from above inside it)
import React from "react";
import { observer } from "mobx-react";
import { useStore } from "mobx-store-provider";

function UserDisplay() {
  // Get access to the store
  const appStore = useStore();
  return <div>{appStore.user}</div>;
}

// Wrap it with mobx-react observer(), so updates get rendered
export default observer(UserDisplay);
```

```javascript
// AppStore.js (mobx-state-tree store/model)
import { types } from "mobx-state-tree";

const AppStore = types.model({
  user: types.string,
});

export default AppStore;
```

**[See the full docs](http://mobx-store-provider.overfoc.us)**

---
layout: default
title: Multiple stores
nav_order: 7
---

# Multiple stores

You may have a need to instantiate multiple stores for your particular application. **mobx-store-provider** supports this use case via a unique `identifier` you can pass into the [useProvider](/api/useProvider) and [useStore](/api/useStore) hooks.

This optional value tells **mobx-store-provider** which store you want to use based on the unique `identifier` you pass to it.

## Example

In the `App` component, we create both the `cat` and `owner`, which are then provided to the rest of the application via their respective `Provider`.

```javascript
// App.jsx
import React from "react";
import { useProvider, useCreateStore } from "mobx-store-provider";
import { OwnerStore, CatStore, CatStoreId } from "./stores";
import PetDisplay from "./PetDisplay";

function App() {
  const owner = useCreateStore(() => OwnerStore.create({ name: "Jonathan" }));
  const OwnerProvider = useProvider();

  const cat = useCreateStore(() => CatStore.create({ name: "Cleo" }));
  const CatProvider = useProvider(CatStoreId);

  return (
    <OwnerProvider value={owner}>
      <CatProvider value={cat}>
        <PetDisplay />
      </CatProvider>
    </OwnerProvider>
  );
}

export default App;
```

Note that each `Provider` must be retrieved using its own `identifier`. In the case of the `owner`, we just use the default one supplied by **mobx-store-provider**.

In the `PetDisplay` component we get each store with the [useStore hook](/api/useStore), making sure to pass the same `identifier` used when retreiving their respective `Provider`:

```javascript
// PetDisplay.jsx
import React from "react";
import { useStore } from "mobx-store-provider";
import { CatStoreId } from "./stores";

function PetDisplay() {
  const owner = useStore();
  const cat = useStore(CatStoreId);
  return (
    <div>
      {owner.name} has a cat named {cat.name}
    </div>
  );
}

export default PetDisplay;
```

To keep things clean in this example we define the `stores` and their `identifier` in a separate module.

```javascript
// stores.js
import { types } from "mobx-state-tree";

const OwnerStore = types.model({
  name: types.string,
});

const CatStoreId = "CatStore";
const CatStore = types.model({
  name: types.string,
});

export { OwnerStore, CatStoreId, CatStore };
```

[Next: **Local state**](/local-state){: .btn .btn-blue }

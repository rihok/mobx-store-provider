import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, useCreateStore, useStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./integration.test";

describe("useStore", () => {
  afterEach(cleanup);

  test("with no parameters", () => {
    const firstName = "Jonathan";

    function MyNameDisplay() {
      const testStore: ITestStore = useStore();
      return <div>{testStore.name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider();
      const testStore: ITestStore = useCreateStore(() =>
        TestStore.create({ name: firstName }),
      );
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });

  test("with an identifier", () => {
    const identifier = "identifier";
    const firstName = "Jonathan";

    function MyNameDisplay() {
      const testStore: ITestStore = useStore(identifier);
      return <div>{testStore.name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = useCreateStore(() =>
        TestStore.create({ name: firstName }),
      );
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });

  test("with a mapStore callback", () => {
    const firstName = "Jonathan";
    function selectName(store: ITestStore) {
      return store.name;
    }

    function MyNameDisplay() {
      const name = useStore(selectName);
      return <div>{name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider();
      const testStore: ITestStore = useCreateStore(() =>
        TestStore.create({ name: firstName }),
      );
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });

  test("with an identifier and a mapStore callback", () => {
    const identifier = "identifier";
    const firstName = "Jonathan";
    function selectName(store: ITestStore) {
      return store.name;
    }

    function MyNameDisplay() {
      const name = useStore(identifier, selectName);
      return <div>{name}</div>;
    }

    function TestComponent() {
      const Provider = useProvider(identifier);
      const testStore: ITestStore = useCreateStore(() =>
        TestStore.create({ name: firstName }),
      );
      return (
        <Provider value={testStore}>
          <MyNameDisplay />
        </Provider>
      );
    }

    expect(makeContainer(<TestComponent />)).toHaveTextContent(firstName);
  });
});

import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { useProvider, useCreateStore, useStore } from "../";
import { TestStore, ITestStore, makeContainer } from "./integration.test";

describe("useCreateStore", () => {
  afterEach(cleanup);

  test("with a factory", () => {
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
});

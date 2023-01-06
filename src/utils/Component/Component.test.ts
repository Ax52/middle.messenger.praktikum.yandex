import { Component } from "./Component";

/** NOTE: as Component is an abstract class,
 * we need to inherit a base class from it */
const TestComponent = class extends Component {};

test("should create component", () => {
  expect(() => new TestComponent()).not.toThrow();
});

test("component should render", () => {
  expect(new TestComponent().render()).toBe("");
});

test("componment should update state", () => {
  const comp = new TestComponent();
  const fakeNewState = "asd";
  comp.setState(fakeNewState);

  expect(comp.state).toBe(fakeNewState);
});

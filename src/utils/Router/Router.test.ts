/* eslint-disable @typescript-eslint/no-empty-function */

import { Router } from "./Router";

const fakeData = {
  url: "/testPath",
  component: () => {},
  isPrivate: false,
};

test("Should register route", () => {
  expect(() =>
    Router.use(fakeData.url, fakeData.component, fakeData.isPrivate),
  ).not.toThrow();
});

test("Should route on registered routes", () => {
  Router.go(fakeData.url);
  expect(window.location.pathname).toBe(fakeData.url);
});

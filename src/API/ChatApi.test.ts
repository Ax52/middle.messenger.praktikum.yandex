/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChatApi } from "./ChatApi";

const ATTEMPTS = 3;

test("Should check login user", async () => {
  const res = await ChatApi.checkAccess();
  expect(res).toBe(false);
});

test("Should register user", async () => {
  let attempts = ATTEMPTS;
  let res: any;
  async function attempt() {
    try {
      if (!attempts) {
        res = undefined;
        return;
      }
      const fakeData = {
        first_name: "string",
        second_name: "string",
        login: `string${Math.round(Math.random() * 100)}`,
        email: `string${Math.round(Math.random() * 100)}@asd.asd`,
        password: "stringString123",
        phone: "0123456789",
      };
      res = await ChatApi.register(fakeData);
    } catch {
      attempts--;
      attempt();
    }
  }
  await attempt();

  expect(typeof res?.id).toBe("number");
});

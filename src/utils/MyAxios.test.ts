import { Axios } from "./MyAxios";

const baseUrl = "https://jsonplaceholder.typicode.com";

test("Should get method works", async () => {
  const fakeUrl = `${baseUrl}/todos/1`;
  const res = await Axios.get(fakeUrl);
  const response = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  };
  expect(res).toMatchObject(response);
});

test("Should post method works", async () => {
  const fakeUrl = `${baseUrl}/posts`;
  const fakePost = JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  });
  const options: { headers: [string, string][] } = {
    headers: [["Content-type", "application/json; charset=UTF-8"]],
  };
  const res = await Axios.post(fakeUrl, fakePost, options);
  const response = {
    id: 101,
    title: "foo",
    body: "bar",
    userId: 1,
  };
  expect(res).toMatchObject(response);
});

test("Should delete method works", async () => {
  const fakeUrl = `${baseUrl}/posts/1`;
  const res = await Axios.delete(fakeUrl);
  const response = {};
  expect(res).toMatchObject(response);
});

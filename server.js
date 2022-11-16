/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const express = require("express");
const path = require("path");

const PORT = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, "./dist")));

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT} port`);
});

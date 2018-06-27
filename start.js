const mongoose = require("mongoose");

const app = require("./app");
const { LISTEN_PORT } = require("./config");

app.listen(LISTEN_PORT, () => {
  console.log("Server started successfully on port " + LISTEN_PORT);
});

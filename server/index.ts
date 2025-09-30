const envs = require("dotenv");
envs.config();
require("./config/db/db");
const express = require("express");
const cors = require("cors");
const routers = require("./src/routes/routers");

async function startServer() {
  const server = express();

  server.use(
    cors({
      origin:
        process.env.MODE === "production"
          ? process.env.SECUREDURL
          : process.env.DEVURL,
    })
  );
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(routers);

  server.listen(process.env.PORT, () => {
    console.log(`server is up and running on port: ${process.env.PORT}`);
  });
}

startServer();

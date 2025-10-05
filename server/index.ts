import url = require("url");

const envs = require("dotenv");
envs.config();
require("./config/db/db");
const express = require("express");
const path = require("path");
const cors = require("cors");
const routers = require("./src/routes/routers");

async function startServer() {
  const server = express();

  server.use("/storage", express.static(path.join(__dirname, "./storage")));

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

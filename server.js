import express from "express";
import config from "./db/dbconfig.js";
import chalk from "chalk";
import appRoutes from "./src/routes/appRoutes.js";
const app = express();
appRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello nice to meet you app !");
});

app.listen(config.port, () => {
  console.log(chalk.green(`Server app listening on port ${config.url}!`));
});
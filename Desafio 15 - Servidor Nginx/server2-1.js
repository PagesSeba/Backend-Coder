const express = require ("express");
const router = require ("./routes/router");
const { engine }= require ("express-handlebars");
const config= require  ("./config.js");
const os = require ("os");
const cluster = require ("cluster");

const app = express();
const cpus = os.cpus();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "./views/layouts/main.handlebars",
  })
);
app.set("view engine", "handlebars");
app.set("views", "../public/views");

if (config.ARG.mode == "cluster" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker) => {
    `Worker ${worker.process.pid} died!`;
    cluster.fork();
  });
} else {
  app.use("/api", router);

  app.listen(config.ARG.port, (err) => {
    err
      ? console.log(`Se produjo un error al iniciar el servidor ${err}`)
      : console.log(`El servidor esta escuchando el puerto ${config.ARG.port}`);
  });
}

const routes = require("./src/routes");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3333;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(`Acessando a rota: ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

require("dotenv").config();

const express = require("express");
const UserRouter = require("./Router/user");
const NotesRouter = require("./Router/notes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const port = process.env.PORT || 3001;
const cors = require("cors");

const app = express();

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [{ url: "http://localhost:3001" }],
  },
  apis: ["./Router/*.js"],
};

const specs = swaggerJsDoc(option);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());
app.use(UserRouter);
app.use(NotesRouter);

app.listen(port, () => console.log(`Listening at PORT ` + 3001));

module.exports = app;

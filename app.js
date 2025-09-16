import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { db, initDB } from "./util/database.js";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "./controllers/todos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", getTodos);

app.post("/add-todo", addTodo);

app.post("/delete-todo/:id", deleteTodo);

app.post("/update-todo/:id", updateTodo);

initDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.log("could not start server", err);
  });

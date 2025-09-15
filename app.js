import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { db, initDB } from "./util/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM todos");
  const todos = rows.map((row) => ({
    ...row,
    completed: !!row.completed,
  }));

  res.render("index", { todos: todos });
});

app.post("/add-todo", async (req, res) => {
  const newTodo = req.body.todo;
  if (newTodo) {
    await db.execute("INSERT INTO todos (todo) VALUES (?)", [newTodo]);
  }
  res.redirect("/");
});

app.post("/delete-todo/:id", async (req, res) => {
  const id = req.params.id;
  const response = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
  console.log(response);
  res.redirect("/");
});

initDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started successfully");
    });
  })
  .catch((err) => {
    console.log("could not start server", err);
  });

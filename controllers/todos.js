import { db } from "../util/database.js";

export const getTodos = async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM todos");
  const todos = rows.map((row) => ({
    ...row,
    completed: !!row.completed,
  }));

  res.render("index", { todos: todos });
};

export const addTodo = async (req, res) => {
  const newTodo = req.body.todo;
  if (newTodo) {
    await db.execute("INSERT INTO todos (todo) VALUES (?)", [newTodo]);
  }
  res.redirect("/");
};

export const deleteTodo = async (req, res) => {
  const id = req.params.id;
  const response = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
  console.log(response);
  res.redirect("/");
};

export const updateTodo = async (req, res) => {
  const id = req.params.id;
  const [[{ completed }]] = await db.execute(
    "SELECT completed FROM todos WHERE id = ?",
    [id]
  );

  if (completed) {
    await db.execute("UPDATE todos SET completed = ? WHERE id = ?", [
      false,
      id,
    ]);
  } else {
    await db.execute("UPDATE todos SET completed = ? WHERE id = ?", [true, id]);
  }

  res.redirect("/");
};

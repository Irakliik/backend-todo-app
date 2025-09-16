import { db } from "../util/database.js";

export const getTodos = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM todos");
    const todos = rows.map((row) => ({
      ...row,
      completed: !!row.completed,
    }));

    res.render("index", { todos: todos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching todos");
  }
};

export const addTodo = async (req, res) => {
  try {
    const newTodo = req.body.todo;

    if (newTodo.trim() === "") {
      throw new Error("Todos cannot be empty");
    }

    await db.execute("INSERT INTO todos (todo) VALUES (?)", [newTodo]);
  } catch (err) {
    console.error(err);
  } finally {
    res.redirect("/");
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
    console.log(response);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (req, res) => {
  try {
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
      await db.execute("UPDATE todos SET completed = ? WHERE id = ?", [
        true,
        id,
      ]);
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
};

/**
 * Simple Todo Application — Express.js + File-based storage
 * Open-source, lightweight, single-file.
 */
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, "todos.json");

// ── Helpers ───────────────────────────────────────────────

function loadTodos() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DB_PATH, JSON.stringify(todos, null, 2));
}

// ── Middleware ─────────────────────────────────────────────

app.use(express.urlencoded({ extended: true }));

// ── Render ────────────────────────────────────────────────

function renderPage(todos) {
  let listHtml = "";
  if (todos.length === 0) {
    listHtml = '<p class="empty-msg">✨ No tasks yet. Add one above!</p>';
  } else {
    listHtml = '<ul class="todo-list">';
    for (const t of todos) {
      const doneClass = t.done ? ' class="done"' : "";
      const checked = t.done ? "checked" : "";
      const toggleIcon = t.done ? "↩️" : "✅";
      listHtml +=
        "<li" + doneClass + ">" +
        '<input type="checkbox" onchange="location.href=\'/toggle/' + t.id + '\'" ' + checked + ">" +
        '<span class="todo-title">' + escapeHtml(t.title) + "</span>" +
        '<div class="actions">' +
        '<a class="toggle-btn" href="/toggle/' + t.id + '">' + toggleIcon + "</a>" +
        '<a class="delete-btn" href="/delete/' + t.id + '">🗑️</a>' +
        "</div>" +
        "</li>";
    }
    listHtml += "</ul>";
  }

  return HTML.replace("{{TODOS}}", listHtml);
}

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(text).replace(/[&<>"']/g, function (m) { return map[m]; });
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>📋 Todo App</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea, #764ba2);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    .card {
      background: #fff;
      border-radius: 20px;
      padding: 2rem 2.5rem;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }
    form.add-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    form.add-form input[type="text"] {
      flex: 1;
      padding: 0.7rem 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    }
    form.add-form input[type="text"]:focus {
      border-color: #667eea;
    }
    form.add-form button {
      padding: 0.7rem 1.4rem;
      background: #667eea;
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    form.add-form button:hover {
      background: #5a6fd6;
    }
    ul.todo-list {
      list-style: none;
    }
    ul.todo-list li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.7rem 0;
      border-bottom: 1px solid #f0f0f0;
    }
    ul.todo-list li:last-child {
      border-bottom: none;
    }
    ul.todo-list li .todo-title {
      flex: 1;
      margin: 0 0.75rem;
      font-size: 1rem;
      color: #444;
    }
    ul.todo-list li.done .todo-title {
      text-decoration: line-through;
      color: #aaa;
    }
    ul.todo-list li .actions {
      display: flex;
      gap: 0.4rem;
    }
    ul.todo-list li .actions a {
      text-decoration: none;
      padding: 0.25rem 0.6rem;
      border-radius: 8px;
      font-size: 0.85rem;
      transition: background 0.2s;
    }
    a.toggle-btn { background: #e8f5e9; color: #2e7d32; }
    a.toggle-btn:hover { background: #c8e6c9; }
    a.delete-btn { background: #ffebee; color: #c62828; }
    a.delete-btn:hover { background: #ffcdd2; }
    .empty-msg {
      text-align: center;
      color: #999;
      padding: 1.5rem 0;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>📋 Todo List</h1>
    <form class="add-form" method="POST" action="/add">
      <input type="text" name="title" placeholder="Add a new task..." required>
      <button type="submit">Add</button>
    </form>
    {{TODOS}}
  </div>
</body>
</html>`;

// ── Routes ────────────────────────────────────────────────

app.get("/", (req, res) => {
  const todos = loadTodos();
  res.send(renderPage(todos));
});

app.post("/add", (req, res) => {
  const title = (req.body.title || "").trim();
  if (title) {
    const todos = loadTodos();
    const id = todos.length > 0 ? Math.max(...todos.map(function (t) { return t.id; })) + 1 : 1;
    todos.push({ id: id, title: title, done: false });
    saveTodos(todos);
  }
  res.redirect("/");
});

app.get("/toggle/:id", (req, res) => {
  const todos = loadTodos();
  const todo = todos.find(function (t) { return t.id === parseInt(req.params.id); });
  if (todo) {
    todo.done = !todo.done;
    saveTodos(todos);
  }
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  let todos = loadTodos();
  const id = parseInt(req.params.id);
  todos = todos.filter(function (t) { return t.id !== id; });
  saveTodos(todos);
  res.redirect("/");
});

// ── Start ─────────────────────────────────────────────────

app.listen(PORT, "0.0.0.0", function () {
  console.log("Todo App running on http://0.0.0.0:" + PORT);
});

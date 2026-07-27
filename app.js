const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const tasks = [
  {
    id: 1,
    title: "Complete Express assignment",
    done: false,
  },
  {
    id: 2,
    title: "Read Express documentation",
    done: true,
  },
  {
    id: 3,
    title: "Practice REST APIs",
    done: false,
  },
];

app.get("/", (req, res) => {
  res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  for (const task of tasks) {
    if (task.id == id) {
      res.json(task);
      return;
    }
  }
  res.status(404).json({ error: `Task ${id} not found` });
});

app.post("/tasks", (req, res) => {
  if (!req.body.title || req.body.title.trim() === "") {
    res.status(400).json({ error: "Task title is required" });
    return;
  }
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  for (const task of tasks) {
    if (task.id == id) {
      if (req.body.title && req.body.title.trim() !== "") {
        task.title = req.body.title;
      }
      if (req.body.done !== undefined) {
        task.done = req.body.done;
      }
      res.json(tasks);
      return;
    }
  }
  res.status(404).json({ error: `Task ${id} not found` });
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  for (const task of tasks) {
    if (task.id == id) {
      tasks.splice(tasks.indexOf(task), 1);
      res.status(204).send();
      return;
    }
  }
  res.status(404).json({ error: `Task ${id} not found` });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

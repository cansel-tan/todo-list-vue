const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Task = mongoose.model('Task', {
  title: String,
  createdAt: { type: Date, default: Date.now }
});

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: 1 });
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const task = new Task({ title: req.body.title });
  await task.save();
  res.status(201).json(task);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

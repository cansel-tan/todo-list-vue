<template>
  <div id="app" class="container">
    <h1><i class="fas fa-tasks"></i> To-Do List</h1>

    <div class="input-area">
      <input v-model="newTask" placeholder="add a new task..." @keyup.enter="addTask" />
      <button @click="addTask">Add</button>
    </div>

    <div v-if="tasks.length === 0" class="empty">there's no task yet</div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task._id">
        <i class="fas fa-check-circle icon"></i>
        <span> {{ task.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newTask: "",
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      const res = await axios.get("http://localhost:3000/api/tasks");
      this.tasks = res.data;
    },
    async addTask() {
      if (!this.newTask.trim()) return;
      await axios.post("http://localhost:3000/api/tasks", { title: this.newTask });
      this.newTask = "";
      this.fetchTasks();
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  text-align: center;
  font-family: "Segoe UI", sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.input-area {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}

.task-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.task-list li {
  background: #f8f9fa;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.empty {
  color: #999;
  font-style: italic;
}
.icon {
  color: #2ecc71;
  margin-right: 8px;
}
</style>

<template>
  <div id="todosSection">
    <h2>Daftar Tugas</h2>
    <form @submit.prevent="addActivity" class="add-form">
      <label for="activityName">Nama Tugas:</label>
      <input id="activityName" type="text" v-model="newActivity.name" placeholder="Tambahkan Tugas baru...">
      
      <label for="datetime">Tanggal & Jam:</label>
      <input id="datetime" type="datetime-local" v-model="newActivity.dateTime">
      
      <button type="submit">Tambah</button>
    </form>
    
    <div class="filter-buttons">
      <button @click="showAll" :class="{ 'active': filter === '' }">Semua Tugas</button>
      <button @click="showCompleted" :class="{ 'active': filter === 'completed' }">Tugas Selesai</button>
      <button @click="showIncomplete" :class="{ 'active': filter === 'incomplete' }">Tugas Belum Selesai</button>
    </div>
    
    <table class="todo-table">
      <thead>
        <tr>
          <th>Tugas</th>
          <th>Tanggal & Jam</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in filteredActivities" :key="index">
  <td>
    <span v-if="!activity.editMode">{{ activity.name }}</span>
    <input type="text" v-model="activity.name" v-else>
  </td>
  <td>
    <span v-if="!activity.editMode">{{ formatDate(activity.dateTime) }}</span>
    <input id="datetime" type="datetime-local" v-model="activity.dateTime" v-else>
  </td>
  <td>
    <input type="checkbox" v-model="activity.completed">
    <span :class="{ 'completed': activity.completed }">{{ activity.completed ? 'Selesai' : 'Belum Selesai' }}</span>
  </td>
  <td>
    <button @click="toggleEditMode(activity)" :class="{ 'edit-mode': activity.editMode }">{{ activity.editMode ? 'Batal' : 'Edit' }}</button>
    <button v-if="activity.editMode" @click="updateActivity(activity)" class="edit-mode">Simpan</button>
    <button @click="removeActivity(index)" class="delete-button">Hapus</button>
  </td>
</tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: 'TodosSection',
  data() {
    return {
      newActivity: {
        name: '',
        dateTime: ''
      },
      activities: [],
      filter: ''
    };
  },
  computed: {
    filteredActivities() {
      if (this.filter === 'completed') {
        return this.activities.filter(activity => activity.completed);
      } else if (this.filter === 'incomplete') {
        return this.activities.filter(activity => !activity.completed);
      } else {
        return this.activities;
      }
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity.name.trim() !== '' && this.newActivity.dateTime.trim() !== '') {
        this.activities.unshift({
          name: this.newActivity.name,
          dateTime: this.newActivity.dateTime,
          completed: false,
          editMode: false,
        });
        this.newActivity.name = '';
        this.newActivity.dateTime = '';
      }
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    formatDate(dateTime) {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateTime).toLocaleDateString('en-US', options);
    },
    toggleEditMode(activity) {
      activity.editMode = !activity.editMode;
    },
    updateActivity(activity) {
      activity.editMode = false;
    },
    showAll() {
      this.filter = '';
    },
    showCompleted() {
      this.filter = 'completed';
    },
    showIncomplete() {
      this.filter = 'incomplete';
    }
  }
};
</script>


<style scoped>
#todosSection {
  max-width: 800px;
  margin: 20px auto;
  background-color: #ffe6f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
}

h2 {
  color: #ff8cbf;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.add-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.add-form label {
  margin-bottom: 8px;
  color: #ff8cbf;
  font-size: 16px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.add-form input[type="text"],
.add-form input[type="datetime-local"],
.add-form button {
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ff8cbf;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  background-color: #ffe6f0;
  color: #333333;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.add-form input[type="text"]:focus,
.add-form input[type="datetime-local"]:focus,
.add-form button:hover {
  background-color: #ffbfd9;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #ff8cbf;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #ffe6f0;
  color: #333333;
  transition: background-color 0.3s ease;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.filter-buttons button:hover,
.filter-buttons button.active {
  background-color: #ffbfd9;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.todo-table th,
.todo-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dddddd;
  font-size: 14px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.todo-table th {
  background-color: #ffbfd9;
  color: #333333;
}

.todo-table td {
  background-color: #fff;
}

.todo-table th:first-child,
.todo-table td:first-child {
  width: 40%;
}

.todo-table th:nth-child(2),
.todo-table td:nth-child(2) {
  width: 25%;
}

.todo-table th:nth-child(3),
.todo-table td:nth-child(3) {
  width: 15%;
}

.todo-table th:nth-child(4),
.todo-table td:nth-child(4) {
  width: 20%;
}

.completed {
  text-decoration: line-through;
  color: #888888;
}

.edit-mode {
  background-color: #ffbfd9;
  color: #333333;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.edit-mode:hover {
  background-color: #ff8cbf;
}

.delete-button {
  background-color: #ff8cbf;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.delete-button:hover {
  background-color: #ff6680;
}
</style>

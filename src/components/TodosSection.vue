<template>
    <div>
      <h2>Daftar Tugas</h2>
      <form @submit.prevent="addActivity">
        <input type="text" v-model="newActivity.name" placeholder="Tambahkan Tugas baru">
        <div class="datetime-container">
          <label for="datetime">Tanggal & Jam:</label>
          <input id="datetime" type="datetime-local" v-model="newActivity.dateTime">
        </div>
        <button type="submit">Tambah</button>
      </form>
      <div>
        <button @click="showAll">Semua Tugas</button>
        <button @click="showCompleted">Tugas Selesai</button>
        <button @click="showIncomplete">Tugas Belum Selesai</button>
      </div>
      <table>
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
              <button @click="toggleEditMode(activity)">{{ activity.editMode ? 'Batal' : 'Edit' }}</button>
              <button v-if="activity.editMode" @click="updateActivity(activity)">Simpan</button>
              <button @click="removeActivity(index)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      activities: Array,
      newActivity: Object,
      filter: String,
    },
    methods: {
      addActivity() {
        this.$emit('add-activity');
      },
      removeActivity(index) {
        this.$emit('remove-activity', index);
      },
      toggleEditMode(activity) {
        this.$emit('toggle-edit-mode', activity);
      },
      updateActivity(activity) {
        this.$emit('update-activity', activity);
      },
      formatDate(dateTime) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateTime).toLocaleDateString('en-US', options);
      },
      showAll() {
        this.$emit('show-all');
      },
      showCompleted() {
        this.$emit('show-completed');
      },
      showIncomplete() {
        this.$emit('show-incomplete');
      },
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
    }
  };
  </script>
  
  <style scoped>
  input[type="text"], input[type="datetime-local"], button {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
  }
  
  button {
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  .datetime-container {
    margin-top: 10px;
  }
  
  .datetime-container label {
    display: block;
    margin-bottom: 5px;
  }
  </style>
  
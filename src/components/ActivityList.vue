
<template>
  <div>
    <h1>To-Do List</h1>
    <input type="text" v-model="newActivity.name" placeholder="Tambahkan Tugas dan List baru:)">
    <div class="datetime-container">
      <label for="datetime">Tanggal & Jam:</label>
      <input id="datetime" type="datetime-local" v-model="newActivity.dateTime">
    </div>
    <button @click="addActivity">Tambah</button>
    <button @click="showAll">Semua Tugas</button>
    <button @click="showCompleted">Tugas Selesai</button>
    <button @click="showIncomplete">Tugas Belum Selesai</button>
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
            <input type="text" v-model="activity.newName" v-else>
          </td>
          <td>
            <span v-if="!activity.editMode">{{ formatDate(activity.dateTime) }}</span>
            <input id="datetime" type="datetime-local" v-model="activity.newDateTime" v-else>
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
          newName: '',
          newDateTime: ''
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
      if (activity.editMode) {
        activity.newName = activity.name;
        activity.newDateTime = activity.dateTime;
      }
    },
    updateActivity(activity) {
      activity.name = activity.newName;
      activity.dateTime = activity.newDateTime;
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

<template>
  <div id="app">
    <header>
      <button @click="showPostSection">Post</button>
      <button @click="showTodosSection">Todos</button>
    </header>
    <div>
      <h1>Dashboard</h1>
      <PostSection
        v-if="currentSection === 'post'"
        :users="users"
        :posts="posts"
        :selectedUserId="selectedUserId"
        @fetch-posts="fetchPosts"
      />
      <TodosSection
        v-else-if="currentSection === 'todos'"
        :activities="activities"
        :newActivity="newActivity"
        :filter="filter"
        @add-activity="addActivity"
        @remove-activity="removeActivity"
        @toggle-edit-mode="toggleEditMode"
        @update-activity="updateActivity"
        @show-all="showAll"
        @show-completed="showCompleted"
        @show-incomplete="showIncomplete"
      />
    </div>
    <footer>
      <p>&copy; Anggita Wahyudini Putri 223510804</p>
    </footer>
  </div>
</template>

<script>
import PostSection from './PostSection.vue';
import TodosSection from './TodosSection.vue';

export default {
  components: {
    PostSection,
    TodosSection
  },
  data() {
    return {
      currentSection: 'post',
      users: [],
      posts: [],
      selectedUserId: '',
      newActivity: {
        name: '',
        dateTime: ''
      },
      activities: [],
      filter: ''
    };
  },
  methods: {
    showPostSection() {
      this.currentSection = 'post';
      this.fetchUsers();
    },
    showTodosSection() {
      this.currentSection = 'todos';
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        })
        .catch(error => console.error('Error fetching users:', error));
    },
    fetchPosts(userId) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
          this.posts = posts;
        })
        .catch(error => console.error('Error fetching posts:', error));
    },
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
  },
};
</script>

<style scoped>
/* Style yang sudah ada tetap disini */
header {
  background-color: #ff69b4;
  padding: 10px 0;
  text-align: center;
}

header button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
}

header button:hover {
  background-color: #f5f5f5;
}

#app {
  max-width: 800px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
}

footer p {
  margin: 0;
}
</style>

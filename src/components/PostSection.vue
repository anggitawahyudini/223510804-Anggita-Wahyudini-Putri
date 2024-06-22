<template>
  <div id="postSection">
    <h2>Postingan</h2>
    <select v-model="selectedUserId" @change="fetchPosts">
      <option value="" selected disabled>Pilih User</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <ul id="postList">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'PostSection',
  data() {
    return {
      selectedUserId: '',
      users: [],
      posts: []
    };
  },
  methods: {
    fetchPosts() {
      if (this.selectedUserId) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
          .then(response => response.json())
          .then(posts => {
            this.posts = posts;
          })
          .catch(error => console.error('Error fetching posts:', error));
      }
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>


<style scoped>
#postSection {
  max-width: 800px;
  margin: 20px auto;
  background-color: #ffe6f0; /* Warna background pink pastel */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
}

h2 {
  color: #ff8cbf; /* Warna teks pink pastel */
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ff8cbf; /* Warna border pink pastel */
  border-radius: 10px;
  background-color: #ffe6f0; /* Warna background pink pastel */
  color: #333333;
  margin-bottom: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

select:focus {
  background-color: #ffbfd9; /* Warna background saat fokus */
}

ul {
  padding: 0;
  margin: 0;
}

.post-item {
  background-color: #fff; /* Warna background putih */
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.post-item:hover {
  background-color: #ffbfd9; /* Warna background saat hover */
}

h3 {
  color: #ff8cbf; /* Warna teks pink pastel */
  font-size: 20px;
  margin-bottom: 10px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

p {
  color: #666666;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 0;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}
</style>


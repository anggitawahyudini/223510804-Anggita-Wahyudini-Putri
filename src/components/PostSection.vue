<template>
    <div>
      <h2>Postingan</h2>
      <select v-model="selectedUserId" @change="fetchPosts">
        <option value="" selected disabled>Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array,
      posts: Array,
      selectedUserId: String,
    },
    methods: {
      fetchPosts(event) {
        this.$emit('fetch-posts', event.target.value);
      },
    },
  };
  </script>
  
  <style scoped>
  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  
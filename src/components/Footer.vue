<template>
    <q-footer class="bg-primary text-center">
      <div class="footer-content">
        <p>&copy; 2024 Anggita Wahyudini Putri</p>
      </div>
    </q-footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
  .q-footer {
    background-color: #ff8cbf; /* Warna pink pastel */
    color: white;
    padding: 20px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  
  .footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  p {
    margin: 0;
    font-size: 16px;
  }
  </style>
  
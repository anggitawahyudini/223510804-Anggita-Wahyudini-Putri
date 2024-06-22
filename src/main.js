import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar'; // Import Quasar
import '@quasar/extras/material-icons/material-icons.css'; // Import Quasar Material Icons CSS

const app = createApp(App);

// Create Pinia store
const pinia = createPinia();
app.use(pinia);

// Use Quasar with Vue app
app.use(Quasar);

// Use Vue Router
app.use(router);

app.mount('#app');

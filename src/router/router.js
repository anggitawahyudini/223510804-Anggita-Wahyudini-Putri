import { createRouter, createWebHistory } from 'vue-router';
import PostSection from '../components/PostSection.vue';
import TodosSection from '../components/TodosSection.vue';
import AlbumSection from '../views/AlbumSection.vue';
import AlbumPhotos from '../views/AlbumPhotos.vue';

const routes = [
  {
    path: '/',
    name: 'PostSection',
    component: PostSection
  },
  {
    path: '/todos',
    name: 'TodosSection',
    component: TodosSection
  },
  {
    path: '/albums',
    name: 'AlbumSection',
    component: AlbumSection
  },
  {
    path: '/albums/:id',
    name: 'AlbumPhotos',
    component: AlbumPhotos,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

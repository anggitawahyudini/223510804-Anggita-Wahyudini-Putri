<template>
  <div class="container">
    <h2>Photos From Album : {{ selectedAlbumTitle }}</h2>
    <div v-if="isLoadingPhotos" class="loading">Loading Photos...</div>
    <div v-else>
      <div class="photos-grid">
        <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
          <img :src="photo.thumbnailUrl" :alt="photo.title" @click="showFullSizePhoto(photo.url, photo.title)" />
          <p>{{ photo.title }}</p>
        </div>
      </div>
    </div>

    <div v-if="showFullSizeModal" class="full-size-photo-modal" @click="hideFullSizePhoto">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="hideFullSizePhoto">&times;</span>
        <img :src="selectedPhotoUrl" :alt="selectedPhotoTitle" />
        <p>{{ selectedPhotoTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAlbumStore } from '../store.js';
import { ref, computed, onMounted } from 'vue';

const store = useAlbumStore();
const router = useRouter();

const selectedAlbum = ref(null);
const showFullSizeModal = ref(false);
const selectedPhotoUrl = ref(null);
const selectedPhotoTitle = ref('');

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    selectedAlbum.value = parseInt(router.currentRoute.value.params.id);
    store.selectAlbum(selectedAlbum.value);
  }
});

const isLoadingPhotos = computed(() => store.isLoadingPhotos);
const selectedAlbumTitle = computed(() => store.selectedAlbumTitle);
const filteredPhotos = computed(() => store.photos.filter(photo => photo.albumId === selectedAlbum.value));

const showFullSizePhoto = (url, title) => {
  selectedPhotoUrl.value = url;
  selectedPhotoTitle.value = title;
  showFullSizeModal.value = true;
};

const hideFullSizePhoto = () => {
  showFullSizeModal.value = false;
  selectedPhotoUrl.value = null;
  selectedPhotoTitle.value = '';
};
</script>

<style scoped>
.container {
  margin-top: 150px;
  background-color: #ffe6f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  color: #ff8cbf;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  margin-bottom: 20px;
}

.loading {
  color: #ff8cbf;
  font-size: 18px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.photos-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.photo-item {
  margin: 10px;
  border: 2px solid #ff8cbf;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
  position: relative; /* Untuk membuat posisi relatif yang diperlukan untuk efek goyang */
}

.photo-item:hover {
  transform: scale(1.05) rotate(-2deg); /* Mengombinasikan scale dan rotate untuk efek goyang */
}

.photo-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
}

.photo-item p {
  background-color: #ff8cbf;
  color: white;
  padding: 5px;
  margin: 0;
  text-align: center;
  font-size: 12px;
}

.full-size-photo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: scaleUp 0.3s;
}

@keyframes scaleUp {
  from { transform: scale(0.8); }
  to { transform: scale(1); }
}

.modal-content img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: cover;
  border: 2px solid #ff8cbf;
  border-radius: 10px;
}

.modal-content p {
  color: #ff8cbf;
  margin-top: 10px;
  font-size: 14px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #ff8cbf;
}
</style>

<template>
  <div class="container" @mousemove="handleMouseMove">
    <h1>Albums</h1>
    <select v-model="selectedAlbum" @change="navigateToAlbumDetail" class="album-dropdown">
      <option value="">Choose Album..</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">
        {{ album.title }}
      </option>
    </select>

    <div v-if="isLoading" class="loading">Loading Albums...</div>
    <div v-else-if="selectedAlbum !== null && selectedAlbum !== ''">
      <h2>Photos from Album: {{ selectedAlbumTitle }}</h2>
      <div v-if="isLoadingPhotos" class="loading">Loading Photos...</div>
      <div v-else>
        <div v-if="filteredPhotos.length === 0" class="no-photos">
          No photos found for this album.
        </div>
        <div class="photos-grid" v-else>
          <div v-for="photo in filteredPhotos" :key="photo.id" class="photo-item">
            <img :src="photo.thumbnailUrl" :alt="photo.title" />
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-album-selected">
      Please select an album to view photos.
    </div>
  </div>
</template>

<script setup>
import { useAlbumStore } from '../store.js';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const store = useAlbumStore();
const router = useRouter();

const selectedAlbum = ref(null);

onMounted(() => {
  store.getAlbums();
});

const navigateToAlbumDetail = () => {
  if (selectedAlbum.value !== null && selectedAlbum.value !== '') {
    router.push({ name: 'AlbumPhotos', params: { id: selectedAlbum.value } });
  }
};

const isLoading = computed(() => store.isLoading);
const isLoadingPhotos = computed(() => store.isLoadingPhotos);
const albums = computed(() => store.albums);
const photos = computed(() => store.photos);
const selectedAlbumTitle = computed(() => store.selectedAlbumTitle);

const filteredPhotos = computed(() => {
  return photos.value.filter(photo => photo.albumId === selectedAlbum.value);
});

// Handle mouse move for 3D effect
const handleMouseMove = (event) => {
  const container = event.target.closest('.container');
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  const rotateY = (mouseX / containerRect.width - 0.5) * 20; // Adjust rotation angle
  const rotateX = -(mouseY / containerRect.height - 0.5) * 20;

  container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffe4e1; /* Warna pink pastel untuk latar belakang */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
  font-family: 'Comic Sans MS', cursive, sans-serif; /* Font imut */
  color: #ff69b4; /* Warna pink untuk teks */
  text-align: center; /* Pusatkan konten */
  transform-style: preserve-3d; /* Mempertahankan gaya transformasi 3D */
  perspective: 1000px; /* Menetapkan perspektif untuk efek 3D */
  transition: transform 0.5s ease; /* Transisi halus untuk transformasi */
}

h1, h2 {
  color: #ff1493; /* Warna pink lebih gelap untuk judul */
}

.album-dropdown {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 100%;
  background-color: #ffcccb; /* Warna pink pastel untuk dropdown */
  border: 1px solid #ff69b4; /* Warna pink untuk border */
  color: #ff1493; /* Warna pink lebih gelap untuk teks */
}

.loading {
  font-size: 18px;
  color: #ff69b4; /* Warna pink untuk teks */
}

.no-album-selected, .no-photos {
  margin-top: 20px;
  font-size: 18px;
  color: #ff1493; /* Warna pink lebih gelap untuk teks */
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 10px;
  justify-items: center; /* Pusatkan item-grid horizontal */
}

.photo-item {
  background-color: #ffebef; /* Warna pink sangat terang untuk item foto */
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #ff69b4; /* Warna pink untuk teks */
  position: relative;
  transition: transform 0.3s ease; /* Transisi untuk animasi bergoyang */
}

.photo-item img {
  max-width: 100%;
  border-radius: 5px;
}

.photo-item p {
  margin-top: 10px;
  font-size: 14px;
}

/* Animasi bergoyang saat hover */
.photo-item:hover {
  transform: rotate(-2deg) translateX(2px) translateY(-2px) scale(1.02);
}
</style>

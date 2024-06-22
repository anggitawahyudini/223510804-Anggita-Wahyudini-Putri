<template>
  <div>
    <!-- Header -->
    <q-header elevated class="bg-primary">
      <q-toolbar class="q-gutter-md q-pt-none q-pb-none">
        <!-- Spacer kiri agar tombol navigasi berada di tengah -->
        <div class="q-space-between">
          <!-- Tidak perlu ada elemen di sini -->
        </div>

        <!-- Tombol navigasi di tengah dengan jarak antara tombol -->
        <div class="justify-center q-mx-none">
          <q-btn
            v-for="item in menuItems"
            :key="item.name"
            v-bind="item.props"
            @click="changeSection(item.name)"
            class="text-uppercase q-mx-sm"
          >
            {{ item.label }}
          </q-btn>
          <h1>Anggita Wahyudini Putri</h1>
        </div>

        <!-- Spacer kanan agar tombol navigasi berada di tengah -->
        <div class="q-space-between">
          <!-- Tidak perlu ada elemen di sini -->
        </div>
      </q-toolbar>
    </q-header>

    <!-- Container untuk halaman yang akan ditampilkan -->
    <router-view />
  </div>
</template>


<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuItems: [
        { name: 'PostSection', label: 'Post', props: { flat: true, color: 'white' } },
        { name: 'TodosSection', label: 'Todos', props: { flat: true, color: 'white' } },
        { name: 'AlbumSection', label: 'Album', props: { flat: true, color: 'white' } }
      ]
    };
  },
  methods: {
    // Method untuk mengubah rute berdasarkan tombol yang diklik
    changeSection(section) {
      this.$router.push({ name: section });
    }
  }
};
</script>


<style scoped>
/* Styling khusus untuk komponen Navbar */

/* Gaya untuk QHeader */
.q-header {
  background-color: #ff8cbf; /* Warna pink pastel */
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;  
  height: 70px; /* Tinggi navbar */
  padding: 0 20px; /* Padding kiri kanan untuk konten di dalam navbar */
  display: flex;
  align-items: center; /* Memusatkan vertikal isi navbar */
  justify-content: space-between; /* Memastikan isi navbar berada di antara spacer */
}

/* Gaya untuk QToolbar */
.q-toolbar {
  border-radius: 0; /* Menghilangkan radius sudut pada toolbar */
  padding: 10px 20px; /* Menambahkan padding pada toolbar */
}

/* Gaya untuk tombol QBtn */
.q-btn {
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  background-color: #ffbfd9; /* Warna tombol pink pastel */
  color: white;
}

/* Efek hover untuk tombol QBtn */
.q-btn:hover {
  background-color: #ff99b9; /* Warna tombol hover pink pastel lebih gelap */
}

h1 {
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin-left: 700px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
}

/* Gaya untuk container halaman */
.q-page-container {
  background-color: #ffe6f0; /* Warna background halaman pink pastel */
  border-radius: 10px; /* Menambahkan radius sudut pada halaman */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Menambahkan bayangan pada halaman */
}

/* Mengatur spacer agar tombol navigasi di tengah */
.q-space-between {
  display: flex;
  align-items: center;
  flex: 1; /* Menyebarkan elemen-elemen secara merata */
}

/* Mengatur tombol navigasi di tengah */
.justify-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Memberikan margin horizontal kecil pada tombol */
.q-mx-sm {
  margin-left: 8px;
  margin-right: 8px;
}

/* Menghapus padding atas dan bawah pada toolbar */
.q-pt-none, .q-pb-none {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>



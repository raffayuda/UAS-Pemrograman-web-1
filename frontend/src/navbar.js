// Pilih semua tautan di navbar
const navLinks = document.querySelectorAll('nav a');

// Fungsi untuk menghapus kelas "active" dari semua tautan
function removeActiveClass() {
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.classList.remove('border-b-4');
    link.classList.remove('text-purple'); // Menghapus warna ungu dari tautan lainnya
    link.classList.remove('border-green-500'); // Menghapus border biru
    link.classList.add('text-gray'); // Menambahkan warna abu-abu pada tautan lainnya
  });
}

// Tambahkan event listener untuk setiap tautan
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Hapus kelas "active" dari semua tautan
    removeActiveClass();

    // Tambahkan kelas "active" ke tautan yang diklik
    this.classList.add('active');
    this.classList.add('border-b-4');
    this.classList.add('text-purple'); // Menambahkan warna ungu ke tautan aktif
    this.classList.add('border-green-500'); // Menambahkan border biru ke tautan aktif
    this.classList.remove('text-gray'); // Menghapus warna abu-abu dari tautan aktif
  });
});
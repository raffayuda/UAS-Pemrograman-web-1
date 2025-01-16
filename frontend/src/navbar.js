// Mengambil tombol menu burger dan menu navigasi untuk mobile
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.querySelector('.mobile-menu');

// Event listener untuk toggle menu mobile
menuButton.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
  
  // Untuk memastikan menu terbuka dengan animasi
  if (mobileMenu.classList.contains('active')) {
    mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px"; // Sesuaikan tinggi menu
  } else {
    mobileMenu.style.maxHeight = null; // Tutup menu
  }
});

// Mengambil semua tautan di navbar
const navLinks = document.querySelectorAll('nav a');

// Fungsi untuk menghapus kelas "active" dari semua tautan
function removeActiveClass() {
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.classList.remove('border-b-4');
    link.classList.remove('text-purple'); // Menghapus warna ungu dari tautan lainnya
    link.classList.remove('border-green-500'); // Menghapus border hijau
    link.classList.add('text-gray'); // Menambahkan warna abu-abu pada tautan lainnya
  });
}

// Menambahkan event listener ke setiap tautan
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Hapus kelas "active" dari semua tautan
    removeActiveClass();

    // Tambahkan kelas "active" ke tautan yang diklik
    this.classList.add('active');
    this.classList.add('border-b-4');
    this.classList.add('text-purple'); // Menambahkan warna ungu ke tautan aktif
    this.classList.add('border-green-500'); // Menambahkan border hijau ke tautan aktif
    this.classList.remove('text-gray'); // Menghapus warna abu-abu dari tautan aktif

    // Tutup menu mobile setelah tautan diklik (opsional untuk UX lebih baik)
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenu.style.maxHeight = null;
    }
  });
});

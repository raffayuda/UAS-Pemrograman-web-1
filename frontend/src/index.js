
const ELEMENTS = {
  buttons: {
    tombol1: document.getElementById('tombol1'),
    tombol2: document.getElementById('tombol2'),
    tombol3: document.getElementById('tombol3'),
    tombol4: document.getElementById('tombol4')
  },
  content: {
    title: document.getElementById('title-1'),
    paragraf: document.getElementById('paragraf'),
    cardTitles: {
      card1: document.getElementById('card-title-1'),
      card2: document.getElementById('card-title-2'),
      card3: document.getElementById('card-title-3')
    },
    // Add references to image elements
    images: {
      img1: document.getElementById('card-img-1'),
      img2: document.getElementById('card-img-2'),
      img3: document.getElementById('card-img-3')
    }
  }
};

// Content configuration for each tab including image URLs
const TAB_CONTENT = {
  tombol1: {
    title: 'Transformasi Senyum Anda dengan Bedah Mulut',
    description: 'Bedah mulut membantu mengatasi berbagai masalah gigi dan mulut untuk kesehatan optimal dan senyum percaya diri.',
    cards: ['Bedah Gigi Bungsu', 'Pemasangan Kawat Gigi', 'Penanganan Infeksi Gigi'],
    images: [
      'images/bedah-gigi-1.jpg',
      'images/bedah-gigi-2.jpg',
      'images/bedah-gigi-3.jpg'
    ]
  },
  tombol2: {
    title: 'Veneer Gigi',
    description: 'Kami menawarkan layanan veneer gigi untuk memperindah tampilan gigi Anda agar lebih putih, rapi, dan menarik.',
    cards: ['Konsultasi Awal', 'Pemasangan Veneer', 'Perawatan Veneer'],
    images: [
      'images/veneer-1.jpg',
      'images/veneer-2.jpg',
      'images/veneer-3.jpg'
    ]
  },
  tombol3: {
    title: 'Perawatan Saluran Akar',
    description: 'Perawatan saluran akar membantu menyelamatkan gigi yang mengalami kerusakan parah agar tetap berfungsi.',
    cards: ['Diagnosa Masalah Akar', 'Perawatan Saluran Akar', 'Restorasi Gigi'],
    images: [
      'images/akar-1.jpg',
      'images/akar-2.png',
      'images/akar-3.jpg'
    ]
  },
  tombol4: {
    title: 'Scaling dan Polishing',
    description: 'Scaling dan polishing untuk membersihkan plak dan noda pada gigi, memberikan senyum yang lebih cerah.',
    cards: ['Pembersihan Plak', 'Polishing Gigi', 'Pencegahan Karies'],
    images: [
      'images/scaling-1.jpg',
      'images/scaling-2.jpg',
      'images/scaling-3.jpg'
    ]
  }
};


// Function to update button styles
function updateButtonStyles(activeButton) {
  Object.values(ELEMENTS.buttons).forEach(button => {
    if (button === activeButton) {
      button.style.background = 'linear-gradient(to right, #5f2ff8, #f2f1ff)';
      button.style.color = '#ffffff';
      button.style.transition = 'all 0.3s ease';
    } else {
      button.style.background = 'white';
      button.style.color = 'black';
      button.style.transition = 'all 0.3s ease';
    }
  });
}

// Function to update content including images
function updateContent(contentKey) {
  const content = TAB_CONTENT[contentKey];
  
  // Update text content
  ELEMENTS.content.title.innerHTML = content.title;
  ELEMENTS.content.paragraf.innerHTML = content.description;
  
  // Update card titles
  const cardElements = Object.values(ELEMENTS.content.cardTitles);
  content.cards.forEach((cardTitle, index) => {
    if (cardElements[index]) {
      cardElements[index].innerHTML = cardTitle;
    }
  });
  
  // Update images
  const imageElements = Object.values(ELEMENTS.content.images);
  content.images.forEach((imageUrl, index) => {
    if (imageElements[index]) {
      imageElements[index].src = imageUrl;
      
      // Add fade transition effect
      imageElements[index].style.opacity = '0';
      imageElements[index].style.transition = 'opacity 0.3s ease';
      
      // Fade in the new image
      setTimeout(() => {
        imageElements[index].style.opacity = '1';
      }, 50);
    }
  });
}

// Add event listeners
Object.entries(ELEMENTS.buttons).forEach(([key, button]) => {
  button.addEventListener('click', () => {
    updateButtonStyles(button);
    updateContent(key);
  });
});



// Navbar


const menuButton = document.getElementById('menuButton');
const mobileMenu = document.querySelector('.mobile-menu');

menuButton.addEventListener('click', function() {
  mobileMenu.classList.toggle('active');
});


// Ubah teks
const teksElement = document.getElementById('change-teks');
    const teksArray = ['Untuk senyum Anda', 'Kunjungi kami sekarang!', 'Dengan teknologi terkini'];
    let index = 0;

    function ubahTeks() {
      teksElement.textContent = teksArray[index];
      index++;

      // Jika index melebihi batas array, reset ke 0
      if (index >= teksArray.length) {
        index = 0;
      }
    }

    // Jalankan fungsi setiap 2 detik (sesuaikan dengan kebutuhan)
    setInterval(ubahTeks, 2000);
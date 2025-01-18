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
    images: {
      img1: document.getElementById('card-img-1'),
      img2: document.getElementById('card-img-2'),
      img3: document.getElementById('card-img-3')
    },
    prices: {
      price1: document.getElementById('price-1'),
      price2: document.getElementById('price-2'),
      price3: document.getElementById('price-3'),
      note1: document.getElementById('note-1'),
      note2: document.getElementById('note-2'),
      note3: document.getElementById('note-3')
    }
  }
};

const TAB_CONTENT = {
  tombol1: {
    title: 'Transformasi Senyum Anda dengan Bedah Mulut',
    description: 'Bedah mulut membantu mengatasi berbagai masalah gigi dan mulut untuk kesehatan optimal dan senyum percaya diri.',
    cards: ['Bedah Gigi Bungsu', 'Pemasangan Kawat Gigi', 'Penanganan Infeksi Gigi'],
    images: [
      'images/bedah-gigi-1.jpg',
      'images/bedah-gigi-2.jpg',
      'images/bedah-gigi-3.jpg'
    ],
    prices: [
      {
        mainPrice: 'Mulai dari Rp 2.500.000',
        note: '*Harga dapat bervariasi tergantung tingkat kesulitan'
      },
      {
        mainPrice: 'Mulai dari Rp 15.000.000',
        note: '*Termasuk konsultasi dan perawatan selama 1 tahun'
      },
      {
        mainPrice: 'Mulai dari Rp 1.800.000',
        note: '*Harga tergantung tingkat keparahan infeksi'
      }
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
    ],
    prices: [
      {
        mainPrice: 'Mulai dari Rp 500.000',
        note: '*Termasuk konsultasi dan rencana perawatan'
      },
      {
        mainPrice: 'Mulai dari Rp 2.000.000/gigi',
        note: '*Harga tergantung jenis veneer yang dipilih'
      },
      {
        mainPrice: 'Mulai dari Rp 300.000',
        note: '*Per sesi perawatan'
      }
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
    ],
    prices: [
      {
        mainPrice: 'Mulai dari Rp 300.000',
        note: '*Termasuk rontgen dan konsultasi'
      },
      {
        mainPrice: 'Mulai dari Rp 2.500.000',
        note: '*Harga per saluran akar'
      },
      {
        mainPrice: 'Mulai dari Rp 1.000.000',
        note: '*Tergantung jenis restorasi yang diperlukan'
      }
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
    ],
    prices: [
      {
        mainPrice: 'Mulai dari Rp 350.000',
        note: '*Per sesi pembersihan'
      },
      {
        mainPrice: 'Mulai dari Rp 250.000',
        note: '*Per sesi polishing'
      },
      {
        mainPrice: 'Mulai dari Rp 200.000',
        note: '*Termasuk aplikasi fluoride'
      }
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
  
  // Update prices and notes
  content.prices.forEach((price, index) => {
    const priceElement = ELEMENTS.content.prices[`price${index + 1}`];
    const noteElement = ELEMENTS.content.prices[`note${index + 1}`];
    
    if (priceElement) {
      priceElement.innerHTML = price.mainPrice;
    }
    if (noteElement) {
      noteElement.innerHTML = price.note;
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
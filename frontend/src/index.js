
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
    description: 'Experience the life-changing power of a new smile.',
    cards: ['Walkthroughs', 'Coachmark', 'In-app Messages'],
    images: [
      'test1.png',
      'test.png',
      'test2.png'
    ]
  },
  tombol2: {
    title: 'Kawat Gigi',
    description: 'Increase user engagement and stickiness with customizable loyalty programs, interactive stories, and more.',
    cards: ['Loyalty Program', 'Streaks', 'Stories'],
    images: [
      'path/to/kawat-gigi-1.jpg',
      'path/to/kawat-gigi-2.jpg',
      'path/to/kawat-gigi-3.jpg'
    ]
  },
  tombol3: {
    title: 'Perawatan Gigi',
    description: 'Improve feature adoption and simplify the user onboarding process using walkthroughs, coachmark, and in-line widgets.',
    cards: ['Walkthroughs', 'Coachmark', 'In-line Widget & Cards'],
    images: [
      'path/to/perawatan-1.jpg',
      'path/to/perawatan-2.jpg',
      'path/to/perawatan-3.jpg'
    ]
  },
  tombol4: {
    title: 'Pembersihan Gigi',
    description: 'Unlock actionable insights into user preferences to understand why users churn and ship user-informed products using surveys and polls.',
    cards: ['Surveys', 'Quizzes', 'Polls'],
    images: [
      'path/to/pembersihan-1.jpg',
      'path/to/pembersihan-2.jpg',
      'path/to/pembersihan-3.jpg'
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

    // Constants for DOM elements
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
    }
  }
};

// Content configuration for each tab
const TAB_CONTENT = {
  tombol1: {
    title: 'Transformasi Senyum Anda dengan Bedah Mulut',
    description: 'Experience the life-changing power of a new smile.',
    cards: ['Challenges', 'Shoppable Stories', 'In-app Messages']
  },
  tombol2: {
    title: 'User Engagement',
    description: 'Increase user engagement and stickiness with customizable loyalty programs, interactive stories, and more.',
    cards: ['Loyalty Program', 'Streaks', 'Stories']
  },
  tombol3: {
    title: 'Activation and Feature Adoption',
    description: 'Improve feature adoption and simplify the user onboarding process using walkthroughs, coachmark, and in-line widgets.',
    cards: ['Walkthroughs', 'Coachmark', 'In-line Widget & Cards']
  },
  tombol4: {
    title: 'User Research and Insights',
    description: 'Unlock actionable insights into user preferences to understand why users churn and ship user-informed products using surveys and polls.',
    cards: ['Surveys', 'Quizzes', 'Polls']
  }
};

// Function to update button styles
function updateButtonStyles(activeButton) {
  Object.values(ELEMENTS.buttons).forEach(button => {
    if (button === activeButton) {
      // Tombol yang aktif
      button.style.background = 'linear-gradient(to right, #5f2ff8, #f2f1ff)'; // Gradient biru
      button.style.color = '#ffffff'; // Teks putih
      button.style.transition = 'all 0.3s ease'; // Animasi transisi
    } else {
      // Tombol tidak aktif
      button.style.background = 'white'; // Gradient hitam
      button.style.color = 'black'; // Teks abu-abu
      button.style.transition = 'all 0.3s ease'; // Animasi transisi
    }
  });
}

// Function to update content
function updateContent(contentKey) {
  const content = TAB_CONTENT[contentKey];
  ELEMENTS.content.title.innerHTML = content.title;
  ELEMENTS.content.paragraf.innerHTML = content.description;
  
  // Update card titles
  const cardElements = Object.values(ELEMENTS.content.cardTitles);
  content.cards.forEach((cardTitle, index) => {
    if (cardElements[index]) {
      cardElements[index].innerHTML = cardTitle;
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
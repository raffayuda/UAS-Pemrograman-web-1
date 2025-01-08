
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
    title: 'Conversion and Monetization',
    description: 'Drive higher conversions with personalized challenges and contextual in-app messages to drive higher revenues and lifetime value.',
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
    button.style.background = button === activeButton ? 'blue' : 'black';
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

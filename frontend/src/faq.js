document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.flex');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.fa-arrow-down');
    
    question.addEventListener('click', () => {
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer) {
                otherAnswer.style.maxHeight = null;
            }
        });

        // Reset all other icons
        document.querySelectorAll('.fa-arrow-down').forEach(otherIcon => {
            if (otherIcon !== icon) {
                otherIcon.classList.remove('rotate-icon');
            }
        });

        // Toggle current answer
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.classList.remove('rotate-icon');
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.classList.add('rotate-icon');
        }
    });
});
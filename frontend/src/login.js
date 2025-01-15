document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    
    const validEmail = 'admin@gmail.com';
    const validPassword = 'password123';
    
    if (email === validEmail && password === validPassword) {
     
        errorMessage.classList.add('hidden');
        alert('Login successful!');
        
        localStorage.setItem('isLoggedIn', 'true');
       
        window.location.href = '../../backend/dist/index.html';
    } else {
        
        errorMessage.textContent = 'Invalid email or password';
        errorMessage.classList.remove('hidden');
    }
});

document.getElementById('email').addEventListener('input', clearError);
document.getElementById('password').addEventListener('input', clearError);

function clearError() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}
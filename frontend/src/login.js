document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    
    const validUserame = 'admin123';
    const validPassword = 'password123';
    
    if (username === validUserame && password === validPassword) {
     
        errorMessage.classList.add('hidden');
        alert('Login successful!');
        
        localStorage.setItem('isLoggedIn', 'true');
       
        window.location.href = '../../backend/dist/index.html';
    } else {
        
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.classList.remove('hidden');
    }
});

document.getElementById('username').addEventListener('input', clearError);
document.getElementById('password').addEventListener('input', clearError);

function clearError() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}
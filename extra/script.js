document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for this demo
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you should implement the actual authentication logic, validate the credentials,
    // and redirect to the payment page on successful login.
    // For this demo, let's simply redirect to the payment page.
    window.location.href = 'payment.html';
  });
});

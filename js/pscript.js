document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Payment submitted. Thank you!');
    });
});

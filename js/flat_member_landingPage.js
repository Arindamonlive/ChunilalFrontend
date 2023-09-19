// JavaScript code to handle form submission and dynamic table data
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('flat-details-form');
    const paymentTableBody = document.querySelector('#payment-history tbody');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get input values
        // const ownerName = document.getElementById('name').value;
        // const flatNumber = document.getElementById('fnumber').value;
        // const blockNumber = document.getElementById('block').value;
        // const contactDetails = document.getElementById('contact').value;
        
        // Create a new row in the payment history table
        const newRow = paymentTableBody.insertRow();
        const dateCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const receiptCell = newRow.insertCell(2);

        dateCell.textContent = new Date().toLocaleDateString();
        amountCell.textContent = 'payment_Amount'; // Replace with actual payment amount
        receiptCell.innerHTML = '<a href="#">Receipt Link</a>'; // Replace with actual receipt link
    });

    const generateReceiptButton = document.getElementById('generate-receipt');
    generateReceiptButton.addEventListener('click', function () {
        // Generate PDF receipt logic here
        alert('PDF receipt generation is not implemented in this example.');
    });

});
function logout() {
    window.location.href = "index.html";
}
document.getElementById("logoutButton").addEventListener("click", logout);



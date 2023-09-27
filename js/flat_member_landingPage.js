const userData = {
    ownerName: "xyz pqrs",
    flatNumber: "D5",
    blockNumber: "1",
    contactDetails: "2222222222",
};

const paymentHistory = [
    { date: "2023-09-01", amount: "Rs 500.00", receipt: "receipt1.pdf" },
    { date: "2023-08-01", amount: "Rs 550.00", receipt: "receipt2.pdf" },
];

const paymentAmount = {
    udues: "Rs.100.00", 
    pdues: "Rs.200.00",
};

function populateUserData() {
    document.getElementById("ownerName").textContent = userData.ownerName;
    document.getElementById("flatNumber").textContent = userData.flatNumber;
    document.getElementById("blockNumber").textContent = userData.blockNumber;
    document.getElementById("contactDetails").textContent = userData.contactDetails;
}
function populatePaymentHistory() {
    const paymentTable = document.getElementById("paymentTable");
    const tbody = paymentTable.querySelector("tbody");

    paymentHistory.forEach((payment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${payment.date}</td>
            <td>${payment.amount}</td>
            <td><a href="${payment.receipt}" target="_blank">View Receipt</a></td>
        `;
        tbody.appendChild(row);
    });
}

function populatePaymentAmount() {
    document.getElementById("uDues").textContent = paymentAmount.udues;
    document.getElementById("pDues").textContent = paymentAmount.pdues;
}


document.getElementById("generateReceiptBtn").addEventListener("click", () => {
    alert("PDF generation functionality will be added here.");
});
document.getElementById("makeUPayment").addEventListener("click", () => {
    alert("You will be redirected to the payment page");
});
document.getElementById("makePPayment").addEventListener("click", () => {
    alert("You will be redirected to the payment page");
});

populateUserData();
populatePaymentHistory();
populatePaymentAmount();


function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "index.html";
}
// function clearSession() {
//     sessionStorage.clear(); 
// }
window.onpopstate = function(event) {
    if (event.state && event.state.clearSession) {
        clearSession();
    }
};
function clearSessionOnBackOrForward() {
    history.pushState({ clearSession: true }, null, null);
}
sessionStorage.setItem('key', 'value');
document.getElementById("logoutButton").addEventListener("click", logout);



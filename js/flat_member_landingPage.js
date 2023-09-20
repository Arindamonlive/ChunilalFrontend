const userData = {
    ownerName: "Chunilal Apartment Garia Staion Road",
    flatNumber: "101",
    blockNumber: "A",
    contactDetails: "2222222222",
};

const paymentHistory = [
    { date: "2023-09-01", amount: "$500", receipt: "receipt1.pdf" },
    { date: "2023-08-01", amount: "$550", receipt: "receipt2.pdf" },
];

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

document.getElementById("generateReceiptBtn").addEventListener("click", () => {
    alert("PDF generation functionality will be added here.");
});

populateUserData();
populatePaymentHistory();


function logout() {
    window.location.href = "index.html";
}
document.getElementById("logoutButton").addEventListener("click", logout);



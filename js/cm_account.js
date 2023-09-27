

const paymentHistory = [
    { date: "2023-09-01", bank: "Rs 500.00", online: "Rs 501.00", offline:"Rs 502.00", expense: "Rs 2.00", balance: "Rs 100.00", deficit: "Rs 1" },
];
function populatePaymentHistory() {
    const paymentTable = document.getElementById("paymentTable");
    const tbody = paymentTable.querySelector("tbody");

    paymentHistory.forEach((payment) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${payment.date}</td>
            <td>${payment.bank}</td>
            <td>${payment.online}</td>
            <td>${payment.offline}</td>
            <td>${payment.expense}</td>
            <td>${payment.balance}</td>
            <td>${payment.deficit}</td>
        `;
        tbody.appendChild(row);
    });
}

populatePaymentHistory();
populatePaymentAmount();




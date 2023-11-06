document.querySelector(".home").addEventListener("click", function () {
    window.location.href = "committeepage.html";
});

function showCollection() {
    const datePicker = document.getElementById("datePicker").value;
    const paymentTableBody = document.getElementById("paymentTableBody");
    paymentTableBody.innerHTML = ""; // Clear the table body

    // You need to fetch your data (e.g., from the "cm_account.js" script) and filter by date here.
    // For demonstration, I'll create a sample data array.

    const sampleData = [
        { date: "2023-11-07", bankSavings: 1000, onlineCollection: 500, offlineCollection: 300, expense: 200, balance: 400, deficit: 0 },
        { date: "2023-11-08", bankSavings: 1200, onlineCollection: 600, offlineCollection: 400, expense: 250, balance: 550, deficit: 0 },
        // Add more data as needed
    ];

    sampleData.forEach(item => {
        if (item.date === datePicker) {
            const row = paymentTableBody.insertRow();
            const dateCell = row.insertCell(0);
            const bankSavingsCell = row.insertCell(1);
            const onlineCollectionCell = row.insertCell(2);
            const offlineCollectionCell = row.insertCell(3);
            const expenseCell = row.insertCell(4);
            const balanceCell = row.insertCell(5);
            const deficitCell = row.insertCell(6);
            dateCell.textContent = item.date;
            bankSavingsCell.textContent = item.bankSavings;
            onlineCollectionCell.textContent = item.onlineCollection;
            offlineCollectionCell.textContent = item.offlineCollection;
            expenseCell.textContent = item.expense;
            balanceCell.textContent = item.balance;
            deficitCell.textContent = item.deficit;
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amt = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amt) && amt > 0) {
      const expense = {
        id: Date.now(),
        name: name,
        amount: amt,
      };
      expenses.push(expense);
      saveToLocal();
      renderExpenses();
      updateTotal();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const expenseElement = document.createElement("li");
      expenseElement.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Remove</button>
        `;

      expenseList.appendChild(expenseElement);
    });
  }

  function saveToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((totalSum, expense) => totalSum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);

      saveToLocal();
      renderExpenses();
      updateTotal();
    }
  });
});

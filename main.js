// Form variables name
const expenseForm = document.querySelector("#expenseForm");
const expenseName = document.querySelector("#expenseName");
const expenseAmount = document.querySelector("#expenseAmount");
const expenseCategory = document.querySelector("#expenseCategory");

// tables variables
const expenseList = document.querySelector("#expenseList");

// summary car variables
const totalSpentAmount = document.querySelector("#spent_amount");
const totalExpenseAmount = document.querySelector("#expense_amount");
const highestSpentAmount = document.querySelector("#highest_spent_amount");

// search and sorted variables
const sortExpenses = document.querySelector("#sortExpenses");

// category variables
const filterCategory = document.querySelector("#filterCategory");

const expenseTrackerArr = [];

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validation()) {
    const expense = {
      id: crypto.randomUUID(),
      expenseName: expenseName.value.trim(),
      expenseAmount: Number(expenseAmount.value),
      expenseCategory: expenseCategory.value,
      expenseDate: new Date(),
    };
    expenseTrackerArr.push(expense);
    renderExpenses(expenseTrackerArr);
    e.target.reset();
  }
});

const validation = () => {
  const expenseNameValue = expenseName.value.trim();
  const expenseAmountValue = expenseAmount.value.trim();
  const expenseCategoryValue = expenseCategory.value;
  // error variables
  const expenseNameError = document.querySelector("#expenseNameError");
  const expenseAmountError = document.querySelector("#expenseAmountError");
  const expenseCategoryError = document.querySelector("#expenseCategoryError");
  let isValid = true;

  if (expenseNameValue === "") {
    expenseNameError.style.display = "block";
    expenseNameError.textContent = "Enter your expense";
    isValid = false;
  } else {
    expenseNameError.style.display = "none";
    expenseNameError.textContent = "";
  }

  if (expenseAmountValue === "") {
    expenseAmountError.style.display = "block";
    expenseAmountError.textContent = "Enter your amount";
    isValid = false;
  } else if (expenseAmountValue <= 0) {
    expenseAmountError.style.display = "block";
    expenseAmountError.textContent = "Enter valid amount";
    isValid = false;
  } else {
    expenseAmountError.style.display = "none";
    expenseAmountError.textContent = "";
  }

  if (expenseCategoryValue === "default") {
    expenseCategoryError.style.display = "block";
    expenseCategoryError.textContent = "Select category";
    isValid = false;
  } else {
    expenseCategoryError.style.display = "none";
    expenseCategoryError.textContent = "";
  }

  return isValid;
};

// render expense value
const renderExpenses = (expenses) => {
  expenseList.innerHTML = expenses
    .map((expense) => {
      const date = new Date(expense.expenseDate);
      const formattedDate = date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `
      <tr>
        <td>${expense.expenseName}</td>
        <td>${expense.expenseAmount}</td>
        <td>${expense.expenseCategory}</td>
        <td>${formattedDate}</td>
        <td><button type="button" class="deleteBtn" data-id=${expense.id}><svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  class="bi bi-trash"
  viewBox="0 0 16 16"
>
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
</svg>
</button></td>
      </tr>
    `;
    })
    .join("");
  summaryCard();
};

const summaryCard = () => {
  let totalSpent = expenseTrackerArr.reduce((total, expense) => {
    return total + expense.expenseAmount;
  }, 0);
  totalSpentAmount.textContent = totalSpent;
  totalExpenseAmount.textContent = expenseTrackerArr.length;

  let highestExpense = null;
  for (const expense of expenseTrackerArr) {
    if (
      highestExpense === null ||
      expense.expenseAmount > highestExpense.expenseAmount
    ) {
      highestExpense = expense;
    }
  }
  highestSpentAmount.textContent = highestExpense
    ? `${highestExpense.expenseCategory} - ${highestExpense.expenseAmount}`
    : "₹0";
  // console.log(highestExpense);
};

expenseList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".deleteBtn");
  if (!deleteBtn) return;
  const expenseId = deleteBtn.dataset.id;
  const expenseIndex = expenseTrackerArr.findIndex((expense) => {
    return expense.id === expenseId;
  });
  if (expenseIndex === -1) return;
  expenseTrackerArr.splice(expenseIndex, 1);
  renderExpenses(expenseTrackerArr);
  summaryCard();
});

// sortExpenses js start here
const searchAndSort = () => {
  const sortedExpense = expenseTrackerArr.toSorted((a, b) => {
    if (sortExpenses.value === "latest") {
      return new Date(b.expenseDate) - new Date(a.expenseDate);
    }
    if (sortExpenses.value === "oldest") {
      return new Date(a.expenseDate) - new Date(b.expenseDate);
    }
    if (sortExpenses.value === "alphabetical") {
      return a.expenseName.localeCompare(b.expenseName);
    }
    if (sortExpenses.value === "highest") {
      return b.expenseAmount - a.expenseAmount;
    }
    if (sortExpenses.value === "lowest") {
      return a.expenseAmount - b.expenseAmount;
    }
    return 0;
  });
  renderExpenses(sortedExpense);
};

sortExpenses.addEventListener("change", searchAndSort);

// categories show
const categoryShow = () => {
  const categoryList = expenseTrackerArr.filter((category) => {
    console.log(category);

    return (
      filterCategory.value.toLowerCase() ===
      category.expenseCategory.toLowerCase()
    );
  });
  renderExpenses(categoryList);
};
filterCategory.addEventListener("change", categoryShow);

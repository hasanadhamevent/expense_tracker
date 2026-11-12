# Expense Tracker

A simple expense-tracking application built with **HTML, CSS, and
vanilla JavaScript**. It lets users add expenses, view them in a table,
remove entries, sort the list, and filter expenses by category.

## Features

-   **Add expenses** with a name, amount, and category.
-   **Validate form input** to prevent empty names, invalid amounts, and
    missing categories.
-   **View expenses** in a table with the expense name, amount,
    category, and date.
-   **Delete expenses** from the list.
-   **Filter by category** (for example, Food, Travel, and Shopping).
-   **Sort expenses** using the available options:
    -   Latest first
    -   Oldest first
    -   Alphabetical by expense name
    -   Highest amount first
    -   Lowest amount first
-   **View summary information**, including total amount spent, number
    of expenses, and the highest expense.

## Built With

-   HTML
-   CSS
-   JavaScript (Vanilla JS)

## Getting Started

1.  Download or clone this project.
2.  Open the project folder in your code editor.
3.  Open `index.html` in your browser.

No package installation or build process is required for the current
vanilla JavaScript version.

## How to Use

1.  Enter an expense name.
2.  Enter a positive expense amount.
3.  Choose an expense category.
4.  Submit the form to add the expense.
5.  Use the category dropdown to show expenses from a selected category.
6.  Use the sorting dropdown to change the order of the displayed
    expenses.
7.  Use the delete button in a row to remove an expense.

## Project Notes

-   Expense records are currently stored in a JavaScript array while the
    page is running.
-   Unless browser storage or a backend is added, refreshing the page
    will clear the expenses.
-   Category comparisons should use consistent values. For example, use
    `food` as the option value and `food` as the stored category, or
    normalize both values to lowercase before comparing.

## Future Improvements

-   Save expenses in `localStorage` so they remain after refreshing the
    page.
-   Add search by expense name.
-   Combine search, category filtering, and sorting.
-   Add expense editing.
-   Add monthly reports and charts.
-   Add data export (CSV).

## Learning Goals

This project is also a practice exercise for JavaScript fundamentals,
including:

-   Arrays and objects
-   Functions
-   Array methods such as `map()`, `filter()`, `reduce()`, and sorting
-   DOM selection and manipulation
-   Event listeners and event delegation
-   Form validation
-   Date formatting

------------------------------------------------------------------------

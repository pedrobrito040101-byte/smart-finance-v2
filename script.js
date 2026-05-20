const balanceDisplay = document.querySelector('#balance');
const moneyPlusDisplay = document.querySelector('#money-plus');
const moneyMinusDisplay = document.querySelector('#money-minus');
const list = document.querySelector('#transactions');
const form = document.querySelector('#form');
const textInput = document.querySelector('#text');
const amountInput = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const addTransactionDOM = (transaction) => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${Math.abs(transaction.amount).toFixed(2)}</span>
    `;
    list.append(li);
}

const updateBalanceValues = () => {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const income = amounts.filter(v => v > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    const expense = Math.abs(amounts.filter(v => v < 0).reduce((acc, item) => acc + item, 0)).toFixed(2);

    balanceDisplay.textContent = `R$ ${total}`;
    moneyPlusDisplay.textContent = `+ R$ ${income}`;
    moneyMinusDisplay.textContent = `- R$ ${expense}`;
}

const init = () => {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateBalanceValues();
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const transaction = { 
        id: Math.floor(Math.random() * 100000), 
        name: textInput.value, 
        amount: Number(amountInput.value) 
    };
    transactions.push(transaction);
    init();
    updateLocalStorage();
    textInput.value = '';
    amountInput.value = '';
});

init();
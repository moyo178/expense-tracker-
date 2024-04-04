import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    const balance = transactions.reduce((acc, item) => acc + item.amount, 0);
    setTotalBalance(balance);
  }, [transactions]);

  const handleAddTransaction = (event) => {
    event.preventDefault();
    if (inputText.trim() !== '' && inputAmount !== 0) {
      const newTransaction = {
        id: Math.floor(Math.random() * 1000000),
        text: inputText,
        amount: parseFloat(inputAmount)
      };
      setTransactions([...transactions, newTransaction]);
      setInputText('');
      setInputAmount('');
    }
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Expense Tracker</h1>
      </header>
      <div className="container">
        <div className="balance-container">
          <h2 className="balance">Total Balance</h2>
          <h3 className="balance-amount">${totalBalance.toFixed(2)}</h3>
        </div>
        <form onSubmit={handleAddTransaction} className="transaction-form">
          <input
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Enter transaction description"
            className="transaction-input"
          />
          <input
            type="number"
            value={inputAmount}
            onChange={(event) => setInputAmount(event.target.value)}
            placeholder="Enter amount"
            className="transaction-input"
          />
          <button type="submit" className="btn">Add Transaction</button>
        </form>
        <div className="transaction-list">
          <h2 className="transaction-list-title">Transaction History</h2>
          <ul className="transactions">
            {transactions.map(transaction => (
              <li key={transaction.id} className={transaction.amount < 0 ? 'transaction-item minus' : 'transaction-item plus'}>
                {transaction.text} <span>${Math.abs(transaction.amount.toFixed(2))}</span>
                <button onClick={() => handleDeleteTransaction(transaction.id)} className="delete-btn">x</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Expense Tracker</p>
      </footer>
    </div>
  );
}

export default App;




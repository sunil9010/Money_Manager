import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    AmountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, AmountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(AmountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      AmountInput: '',
    }))
  }

  InputChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  updateAmount = event => {
    this.setState({AmountInput: event.target.value})
  }

  deleteTheList = id => {
    const {transactionsList} = this.state
    const updatedList = transactionsList.filter(every => every.id !== id)
    this.setState({transactionsList: updatedList})
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeIs = 0
    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeIs += each.amount
      }
    })
    return incomeIs
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expense = 0
    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expense += each.amount
      }
    })
    return expense
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0
    transactionsList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expensesAmount += each.amount
      }
      balanceAmount = incomeAmount - expensesAmount
    })
    return balanceAmount
  }

  render() {
    const {titleInput, AmountInput, transactionsList} = this.state
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const balanceAmount = this.getBalance()
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="user-container">
            <h1 className="heading">Hi,Richard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label htmlFor="text" className="input-label">
                TITLE
              </label>
              <input
                id="text"
                type="text"
                placeholder="Title"
                className="input"
                onChange={this.InputChange}
                value={titleInput}
              />
              <label htmlFor="Amount" className="input-label">
                AMOUNT
              </label>
              <input
                id="Amount"
                type="text"
                placeholder="AMOUNT"
                className="input"
                onChange={this.updateAmount}
                value={AmountInput}
              />
              <label htmlFor="drop-down" className="input-label">
                TYPE
              </label>
              <select
                id="drop-down"
                className="input"
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(every => (
                  <option key={every.optionId} value={every.optionId}>
                    {every.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1>History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(each => (
                    <TransactionItem
                      key={each.id}
                      transactionDetails={each}
                      deleteTheList={this.deleteTheList}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager

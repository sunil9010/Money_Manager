// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTheList} = props
  const {id, title, amount, type} = transactionDetails

  const deleteTransaction = () => {
    deleteTheList(id)
  }
  return (
    <li className="table-header">
      <p className="table-header-cells">{title}</p>
      <p className="table-header-cells">{amount}</p>
      <p className="table-header-cells">{type}</p>
      <button
        type="button"
        className="button-delete"
        onClick={deleteTransaction}
        data-testid="delete"
      >
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete-icon"
        />
      </button>
    </li>
  )
}
export default TransactionItem

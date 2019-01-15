import React, { Component } from 'react';

interface Expense {
  titleOfTransaction: string;
  amount: number;
}

interface Props {
  expenses: Array<Expense>;
  conversionRate: number;
  remove: (index: number) => void;
}

class ExpensesTable extends Component<Props, {}> {
  generateKey = (mod: string | number = ''): string => {
    return `${new Date().getTime()}${mod}`;
  };

  convertAmountToEuro = (amount: number) => {
    return (amount * this.props.conversionRate).toFixed(2);
  };

  renderAllExpenses = (): React.ReactNodeArray => {
    return this.props.expenses.map((expense, i) => (
      <tr key={this.generateKey(i)}>
        <td>{expense.titleOfTransaction}</td>
        <td>{expense.amount}</td>
        <td>{this.convertAmountToEuro(expense.amount)}</td>
        <td>
          <button type="button" onClick={() => this.props.remove(i)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  render() {
    const renderedExpenses = this.renderAllExpenses();

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount (PLN)</th>
            <th>Amount (EUR)</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{renderedExpenses}</tbody>
      </table>
    );
  }
}

export default ExpensesTable;

import React, { Component } from 'react';
import styled from '@emotion/styled';

const Table = styled.table`
  width: 100%;
`;

const Delete = styled.button`
  background: none;
  border: 1px solid #ccc;
  outline: none;
  height: 3rem;
  border-radius: 5px;

  &:hover {
    background: #eee;
  }

  &:active {
    background: #ddd;
  }
`;

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
    return (amount / this.props.conversionRate).toFixed(2);
  };

  renderAllExpenses = (): React.ReactNodeArray => {
    return this.props.expenses.map((expense, i) => (
      <tr key={this.generateKey(i)}>
        <td>{expense.titleOfTransaction}</td>
        <td>{expense.amount}</td>
        <td>{this.convertAmountToEuro(expense.amount)}</td>
        <td>
          <Delete type="button" onClick={() => this.props.remove(i)}>
            Delete
          </Delete>
        </td>
      </tr>
    ));
  };

  render() {
    const renderedExpenses = this.renderAllExpenses();

    return (
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount (PLN)</th>
            <th>Amount (EUR)</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{renderedExpenses}</tbody>
      </Table>
    );
  }
}

export default ExpensesTable;

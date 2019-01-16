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
    background: #ffb8c9;
  }

  &:active {
    background: #ff706f;
  }
  
  &:hover,
  &:active {
    border: 1px solid #ff5765;
  }
`;

interface Expense {
  id: string;
  titleOfTransaction: string;
  amount: number;
}

interface Props {
  expenses: Array<Expense>;
  conversionRate: number;
  remove: (id: string) => void;
  searchedItem: string;
}

class ExpensesTable extends Component<Props, {}> {
  generateKey = (mod: string | number = ''): string => {
    return `${new Date().getTime()}${mod}`;
  };

  convertAmountToEuro = (amount: number) => {
    return (amount / this.props.conversionRate).toFixed(2);
  };

  renderAllExpenses = (): React.ReactNodeArray => {
    return this.props.expenses
      .filter(({ titleOfTransaction }) => {
        return titleOfTransaction.includes(this.props.searchedItem);
      })
      .map((expense, i) => (
        <tr key={this.generateKey(i)}>
          <td>{expense.titleOfTransaction}</td>
          <td>{expense.amount}</td>
          <td>{this.convertAmountToEuro(expense.amount)}</td>
          <td>
            <Delete type="button" onClick={() => this.props.remove(expense.id)}>
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

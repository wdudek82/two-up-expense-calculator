import React, { Component, FormEvent } from 'react';
import styled from '@emotion/styled';
import ExpensesForm from './ExpensesForm';
import ExpensesTable from './ExpensesTable';
import CurrencyRate from './CurrencyRate';
import ExpensesTotal from './ExpensesTotal';

const ExpensesWrapper = styled.div`
  box-shadow: 2px 2px 9px 0 #ccc;
  padding: 3rem;
`;

const Header = styled.h1`
  text-align: center;
  margin-top: 0;
`;

interface Props {}

interface State {
  titleOfTransaction: string;
  amount: string;
  expenses: Array<Object>;
  conversionRate: number;
}

class Expenses extends Component<Props, {}> {
  state = {
    titleOfTransaction: '',
    titleInputChanged: false,
    amount: '',
    expenses: [{ titleOfTransaction: 'Foo', amount: 20 }],
    total: 0,
    conversionRate: 4.29,
  };

  validateTitle = (value: string): boolean => {
    this.setState(() => ({ titleInputChanged: true }));

    return true;
  };

  validateAmount = (value: string): boolean => {
    const re = /^\d*(\.\d{1,2})?$/;
    const match = value.match(re);

    return match !== null;
  };

  validateInput = (name: string, value: string): boolean => {
    switch (name) {
      case 'titleOfTransaction':
        return this.validateTitle(value);
      case 'amount':
        return this.validateAmount(value);
      default:
        return true;
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;
    const { name, value } = target;

    if (this.validateInput(name, value)) {
      this.setState((prevState: Readonly<State>) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { titleOfTransaction, amount } = this.state;

    if (titleOfTransaction.length > 5 && amount) {
      this.setState((prevState: Readonly<State>) => ({
        titleOfTransaction: '',
        titleInputChanged: false,
        amount: '',
        expenses: [...prevState.expenses, { titleOfTransaction, amount }],
      }));
    }
  };

  removeExpense = (index: number): void => {
    const updExpenses = this.state.expenses.filter((expense, i) => index !== i);
    this.setState((prevState: Readonly<State>) => ({
      ...prevState,
      expenses: updExpenses,
    }));
  };

  render() {
    const { conversionRate } = this.state;

    return (
      <ExpensesWrapper>
        <Header>List of Expenses</Header>

        <CurrencyRate
          conversionRate={conversionRate}
          change={this.handleInputChange}
        />

        <ExpensesForm
          amount={this.state.amount}
          titleOfTransaction={this.state.titleOfTransaction}
          titleChanged={this.state.titleInputChanged}
          change={this.handleInputChange}
          add={this.handleSubmit}
        />

        <ExpensesTable
          expenses={this.state.expenses}
          remove={(index: number) => this.removeExpense(index)}
          conversionRate={this.state.conversionRate}
        />

        <ExpensesTotal
          expenses={this.state.expenses}
          conversionRate={conversionRate}
        />
      </ExpensesWrapper>
    );
  }
}

export default Expenses;

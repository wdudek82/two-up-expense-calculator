import React, { Component, FormEvent } from 'react';
import styled from '@emotion/styled';
import expensesRef from '../firestore-config';
import ExpensesForm from './ExpensesForm';
import ExpensesTable from './ExpensesTable';
import CurrencyRate from './CurrencyRate';
import ExpensesTotal from './ExpensesTotal';
import SearchExpense from './SearchExpense';

const ExpensesWrapper = styled.div`
  box-shadow: 2px 2px 9px 0 #ccc;
  padding: 3rem;
  min-width: 500px;
`;

const Header = styled.h1`
  text-align: center;
  margin-top: 0;
`;

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
`;

interface Expense {
  id: string;
  titleOfTransaction: string;
  amount: number;
}

interface Props {}

interface State {
  titleOfTransaction: string;
  amount: string;
  expenses: Array<Expense>;
  conversionRate: number;
}

class Expenses extends Component<Props, {}> {
  state = {
    titleOfTransaction: '',
    titleInputChanged: false,
    amount: '',
    expenses: [{ id: '', titleOfTransaction: '', amount: 0 }],
    total: 0,
    conversionRate: 4.29,
    searchedItem: '',
  };

  componentDidMount() {
    this.getExpenses();
  }

  getExpenses = () => {
    const expenses: Array<Object> = [];
    expensesRef
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const { titleOfTransaction, amount } = doc.data();
          expenses.push({
            id: doc.id,
            titleOfTransaction,
            amount,
          });
        });
      })
      .then(() => {
        this.setState(() => ({ expenses }));
      });
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
    const { name, value } = e.currentTarget;

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

    if (titleOfTransaction.length >= 5 && amount) {
      expensesRef
        .add({
          titleOfTransaction: this.state.titleOfTransaction,
          amount: this.state.amount,
        })
        .then(() => this.getExpenses());

      this.setState((prevState: Readonly<State>) => ({
        titleOfTransaction: '',
        titleInputChanged: false,
        amount: '',
      }));
    }
  };

  removeExpense = (id: string): void => {
    expensesRef
      .doc(id)
      .delete()
      .then(() => this.getExpenses());
  };

  render() {
    const { conversionRate } = this.state;

    return (
      <ExpensesWrapper>
        <Header>List of Expenses</Header>

        <Container>
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

          <SearchExpense
            searchedItem={this.state.searchedItem}
            change={this.handleInputChange}
          />

          <ExpensesTable
            expenses={this.state.expenses}
            remove={(id: string) => this.removeExpense(id)}
            conversionRate={this.state.conversionRate}
            searchedItem={this.state.searchedItem}
          />

          <ExpensesTotal
            expenses={this.state.expenses}
            conversionRate={conversionRate}
          />
        </Container>
      </ExpensesWrapper>
    );
  }
}

export default Expenses;

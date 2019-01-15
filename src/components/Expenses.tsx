import React, { Component, FormEvent } from 'react';
import ExpensesForm from './ExpensesForm';
import ExpensesTable from './ExpensesTable';

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

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const { name, value } = target;

    if (this.validateInput(name, value)) {
      this.setState((prevState: Readonly<State>) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { titleOfTransaction, amount } = this.state;

    if (titleOfTransaction && amount) {
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

  calculateTotal = () => {
    return this.state.expenses.reduce((acc, { amount }) => acc + +amount, 0);
  };

  render() {
    const { conversionRate } = this.state;
    const totalPLN = this.calculateTotal();
    const totalEUR = Number(totalPLN * conversionRate).toFixed(2);

    return (
      <div>
        <h1>List of Expenses</h1>

        <div>
          <label htmlFor="conversionRate">PLN to EUR conversion rate</label>
          <input
            id="conversionRate"
            type="number"
            name="conversionRate"
            value={conversionRate}
            style={{ width: '50px' }}
            onChange={this.handleInputChange}
          />
        </div>

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

        <div>Sum: {`${totalPLN} (${totalEUR} EUR)`};</div>
      </div>
    );
  }
}

export default Expenses;

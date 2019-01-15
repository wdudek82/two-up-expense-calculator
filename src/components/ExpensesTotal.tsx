import React from 'react';

interface Expense {
  titleOfTransaction: string;
  amount: number;
}

interface Props {
  conversionRate: number;
  expenses: Array<Expense>;
}

const ExpensesTotal = (props: Props) => {
  const totalPLN = props.expenses.reduce((acc, { amount }) => acc + +amount, 0);
  const totalEUR = Number(totalPLN * props.conversionRate).toFixed(2);

  return <div>Sum: {`${totalPLN} (${totalEUR} EUR)`};</div>;
};

export default ExpensesTotal;

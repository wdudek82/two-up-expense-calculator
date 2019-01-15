import React from 'react';
import styled from '@emotion/styled';

const ExpenseTotalWrapper = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
`;

const Sum = styled.span`
  font-weight: bold;
`;

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
  const totalEUR = Number(totalPLN / props.conversionRate).toFixed(2);

  return (
    <ExpenseTotalWrapper>
      <hr />
      <Sum>Sum:</Sum>{' '}
      {`${totalPLN} PLN (${totalEUR} EUR)`}
    </ExpenseTotalWrapper>
  );
};

export default ExpensesTotal;

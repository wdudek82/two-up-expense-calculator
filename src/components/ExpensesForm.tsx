import React from 'react';

interface Props {
  titleOfTransaction: string;
  titleChanged: boolean;
  amount: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  add: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ExpensesForm = (props: Props) => {
  const { titleOfTransaction, titleChanged, amount, change, add } = props;

  return (
    <form onSubmit={add}>
      <div>
        <label>
          Title of transaction
          <input
            type="text"
            name="titleOfTransaction"
            value={titleOfTransaction}
            onChange={change}
          />
          <p style={{ height: '10px', color: '#ff0000', fontSize: '0.7rem', marginTop: 0 }}>
            {titleChanged && titleOfTransaction.length < 5 &&
              'Title has to be at least 5 characters long'}
          </p>
        </label>
      </div>
      <div>
        <label>
          Amount (in PLN)
          <input type="number" name="amount" value={amount} onChange={change} />
        </label>
      </div>
      <div>
        <input type="submit" value="Add" />
      </div>
    </form>
  );
};

export default ExpensesForm;

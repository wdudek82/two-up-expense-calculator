import React from 'react';
import styled from '@emotion/styled';

const ValidationError = styled.p`
  height: 10px;
  color: #ff0000;
  font-size: 1.2rem;
  margin-top: 0;
`;

const AddContainer = styled.div`
  width: 100%;
`;

const Add = styled.input`
  display: flex;
  justify-content: center;
  background: none;
  background-color: #00ffa3;
  margin: 0 auto;
  border: none;
  outline: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-weight: bold;
  
  &:hover {
    box-shadow: 0 0 10px 0 #999;
  }
  &:active {
    box-shadow: 0 0 10px 0 #999 inset;
  }
`;

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
    <form onSubmit={add} className="form-container">
      <div className="form-item">
        <label>Title of transaction</label>
        <input
          type="text"
          name="titleOfTransaction"
          value={titleOfTransaction}
          onChange={change}
        />
      </div>
      <ValidationError>
        {titleChanged &&
          titleOfTransaction.length < 5 &&
          'Title has to be at least 5 characters long'}
      </ValidationError>
      <div className="form-item">
        <label>Amount (in PLN)</label>
        <input type="number" name="amount" value={amount} onChange={change} />
      </div>
      <ValidationError />
      <AddContainer>
        <Add type="submit" value="Add" />
      </AddContainer>
    </form>
  );
};

export default ExpensesForm;

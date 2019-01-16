import React from 'react';
import styled from '@emotion/styled';

const SearchExpenseWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
  
  label {
    margin-right: 1rem;
  }
`;

interface Props {
  searchedItem: string,
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchExpense = (props: Props) => {
  return (
    <SearchExpenseWrapper>
      <label htmlFor="searchedItem">Search</label>
      <input
        type="text"
        name="searchedItem"
        value={props.searchedItem}
        onChange={props.change}
      />
    </SearchExpenseWrapper>
  );
};

export default SearchExpense;

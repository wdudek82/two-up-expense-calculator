import * as React from 'react';
import styled from '@emotion/styled';
import Expenses from './components/Expenses';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;
`;

const App = () => {
  return (
    <AppWrapper>
      <Expenses />
    </AppWrapper>
  );
};

export default App;

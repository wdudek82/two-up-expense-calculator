import React from 'react';
import styled from '@emotion/styled';

const CurrencyRateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

interface Props {
  conversionRate: number;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyRate = (props: Props) => {
  const { conversionRate, change } = props;

  return (
    <CurrencyRateWrapper>
      <label htmlFor="conversionRate" className="expense-label">
        PLN to EUR conversion rate
      </label>
      <input
        id="conversionRate"
        type="number"
        name="conversionRate"
        value={conversionRate}
        style={{ width: '50px' }}
        onChange={change}
      />
    </CurrencyRateWrapper>
  );
};

export default CurrencyRate;

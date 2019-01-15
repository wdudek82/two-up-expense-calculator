import React from 'react';

interface Props {
  conversionRate: number;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyRate = (props: Props) => {
  const { conversionRate, change } = props;

  return (
    <div>
      <label htmlFor="conversionRate">PLN to EUR conversion rate</label>
      <input
        id="conversionRate"
        type="number"
        name="conversionRate"
        value={conversionRate}
        style={{ width: '50px' }}
        onChange={change}
      />
    </div>
  );
};

export default CurrencyRate;

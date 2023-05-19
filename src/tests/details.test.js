import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Details from '../components/Details';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Details component', () => {
  beforeEach(() => {
    useLocation.mockReturnValue({
      state: {
        currency: {
          id: 1,
          name: 'Bitcoin',
          symbol: 'BTC',
          market_cap_usd: '1000000000',
          volume24a: '500000',
          percent_change_1h: 1.5,
          percent_change_24h: -2.3,
          percent_change_7d: 0.8,
          tsupply: '2000000',
          price_btc: '0.01',
          price_usd: '50000',
        },
      },
    });
  });

  test('renders details correctly', () => {
    render(
      <Router>
        <Details />
      </Router>
    );

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    const marketCapElement = screen.queryByText(/market cap/i);
    expect(marketCapElement).toBeInTheDocument();

    const percentChange1h = screen.getByText(/1h %:/);
    expect(percentChange1h).toBeInTheDocument();
    expect(percentChange1h).toContainHTML('<svg class="svg-inline--fa fa-chevron-down');

    const percentChange24h = screen.getByText(/24h %:/);
    expect(percentChange24h).toBeInTheDocument();
    expect(percentChange24h).toContainHTML('<svg class="svg-inline--fa fa-chevron-up');
  });
});

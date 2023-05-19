import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getCurrencies } from '../redux/currencies/currencySlice';
import '../styles/currency.css';

const Currencies = () => {
  const { currencies, isLoading } = useSelector((store) => store.currencies);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Add state for search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);

  const handleDetails = (currency) => {
    navigate(`/details/${currency.name.toLowerCase()}`, { state: { currency } });
  };

  // Filter currencies based on search query
  const filteredCurrencies = currencies.filter((currency) => currency.symbol
    .toLowerCase()
    .includes(searchQuery.toLowerCase()));

  if (isLoading === true) {
    return <div>Loading current data...</div>;
  }

  return (
    <>
      <h1 className="title">CryptoCurrency Tracker</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search coin..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="currency-container">
        {filteredCurrencies.map((currency) => (
          <div
            className="currency-card"
            key={currency.id}
            onClick={() => { handleDetails(currency); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleDetails(currency);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <h2 className="symbol">{currency.symbol}</h2>
            <p className="change">
              {currency.percent_change_1h < 0 ? (
                <>
                  <FaChevronDown style={{ color: 'red' }} />
                  <span style={{ color: 'red' }}>
                    {currency.percent_change_1h}
                    %
                  </span>
                </>
              ) : (
                <>
                  <FaChevronUp style={{ color: 'green' }} />
                  <span style={{ color: 'green' }}>
                    {currency.percent_change_1h}
                    %
                  </span>
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Currencies;

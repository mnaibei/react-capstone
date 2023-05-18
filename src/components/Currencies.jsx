import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrencies } from "../redux/currencies/currencySlice";
import "../styles/currency.css";
import { useNavigate } from "react-router-dom";

const Currencies = () => {
  const { currencies } = useSelector((store) => store.currencies);
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
  const filteredCurrencies = currencies.filter((currency) =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Add search input field */}
      <input
        type="text"
        placeholder="Search coin..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredCurrencies.map((currency) => (
        <div
          className="currency-container"
          key={currency.id}
          onClick={() => {
            handleDetails(currency);
          }}
        >
          <h2 className="symbol">{currency.symbol}</h2>
        </div>
      ))}
    </>
  );
};

export default Currencies;

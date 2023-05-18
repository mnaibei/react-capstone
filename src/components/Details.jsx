import { useLocation } from "react-router-dom"

const Details = () => {
  const location = useLocation();
  const currency = location.state.currency;

  return (
    <>
      <div className="deets-container" key={currency.id}>
        <h2>{currency.name}</h2>
        <p className="market-cap">
          {Number(currency.market_cap_usd).toFixed(2)}
        </p>
        <p className="change">
          {currency.percent_change_24h}
        </p>
        <p className="price-btc">
          {currency.price_btc}
        </p>
        <p className="price-usd">
          {currency.price_usd}
        </p>
      </div>
    </>
  )
}

export default Details;
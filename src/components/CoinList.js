import React, { useEffect, useState } from 'react';
import './CoinList.css';

const CoinList = () => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
            .then(response => response.json())
            .then(data => setCoins(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Top Cryptocurrencies</h2>
            <ul>
                {coins.map(coin => (
                    <li key={coin.id}>
                        {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoinList;

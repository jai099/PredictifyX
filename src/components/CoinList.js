import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CoinList.module.css';

const CoinList = () => {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/coins')
            .then((res) => res.json())
            .then((data) => {
                const coinsArray = Array.isArray(data) ? data : data.coins;
                if (!Array.isArray(coinsArray)) {
                    throw new Error("Data is not an array");
                }
                setCoins(coinsArray);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });

    }, []);

    if (error) {
        return <div className={styles.coinList}>{error}</div>;
    }

    return (
        <div className={styles.coinList}>
            <h2 className={styles.heading}>🔍 Top Cryptocurrencies</h2>
            <ul className={styles.coinGrid}>
                {coins.map(coin => (
                    <li key={coin.id}>
                        <Link to={`/coin/${coin.id}`} style={{ textDecoration: 'none' }}>
                            <div className={styles.coinCard}>
                                <div className={styles.coinName}>{coin.name}</div>
                                <div className={styles.coinSymbol}>({coin.symbol.toUpperCase()})</div>
                                <div className={styles.coinPrice}>${coin.current_price}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoinList;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CoinDetails.module.css';

const CoinDetails = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [prediction, setPrediction] = useState('');

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(res => res.json())
            .then(data => {
                setCoin(data);
                generatePrediction(); // Dummy prediction for now
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    const generatePrediction = () => {
        const outcomes = [
            '📈 Strong uptrend expected',
            '📉 Possible dip ahead',
            '💹 Sideways movement likely',
            '🚀 Breakout coming soon',
            '🔻 Short-term correction expected'
        ];
        const randomPrediction = outcomes[Math.floor(Math.random() * outcomes.length)];
        setPrediction(randomPrediction);
    };

    if (!coin) return <div className={styles.coinDetails}>Loading...</div>;

    return (
        <div className={styles.coinDetails}>
            <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
            <img
                src={coin.image.large}
                alt={coin.name}
                className={styles.coinImage}
            />
            <p>Current Price: ${coin.market_data.current_price.usd}</p>
            <div className={styles.prediction}>
                AI Prediction: {prediction}
            </div>
            <Link to="/" className={styles.backButton}>⬅ Back to Coin List</Link>
        </div>
    );
};

export default CoinDetails;

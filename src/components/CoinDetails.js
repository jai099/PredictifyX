import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CoinDetails.module.css';

const CoinDetails = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [prediction, setPrediction] = useState('');

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:5000/api/coin/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCoin(data);
                fetchPrediction(data); // ✅ pass fetched coin directly
            })
            .catch((err) => {
                console.error("Error fetching coin:", err);
            });
    }, [id]);

    const fetchPrediction = async (coinData) => {
        try {
            if (!coinData || !coinData.name || !coinData.symbol) {
                throw new Error('Invalid coin data');
            }

            const predictionRes = await fetch('http://localhost:5000/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: coinData.name,
                    symbol: coinData.symbol
                })
            });

            const predictionData = await predictionRes.json();
            setPrediction(predictionData.prediction);
        } catch (error) {
            console.error('Prediction error:', error);
            setPrediction('Prediction unavailable at the moment.');
        }
    };

    if (!coin || !coin.symbol || !coin.image || !coin.market_data) {
        return <div className={styles.coinDetails}>Loading...</div>;
    }

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

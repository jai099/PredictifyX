import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CoinDetails.module.css';

const CoinDetails = () => {
    const { id } = useParams(); // ✅ This gives you the coin ID from URL
    const [coin, setCoin] = useState(null);
    const [prediction, setPrediction] = useState('');

    useEffect(() => {
        if (!id) return; // ✅ Use 'id' instead of 'coinId'

        fetch(`http://localhost:5000/api/coin/${id}`) // ✅ Same here
            .then((res) => res.json())
            .then((data) => {
                setCoin(data);
                fetchPrediction(); // 👈 optional: generate a prediction after fetching
            })
            .catch((err) => {
                console.error("Error:", err);
            });
    }, [id]); // ✅ 'id' as the dependency

    // Example call from frontend
    const fetchPrediction = async (promptText) => {
        const res = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: promptText }),
        });

        const data = await res.json();
        console.log('AI Prediction:', data.prediction);
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

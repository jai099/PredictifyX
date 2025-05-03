import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinList from './components/CoinList';
import CoinDetails from './components/CoinDetails';

function App() {
  return (
    <Router>
      <div>
        <h1>🚀 Welcome to PredictifyX</h1>
        <Routes>
          <Route path="/" element={<CoinList />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

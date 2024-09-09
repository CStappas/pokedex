import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import CardList from './components/CardList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Router>
      <div className='page'>
        <Nav />
        <Header />
        <Routes>
          <Route path="/" element={<CardList />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

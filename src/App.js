import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import CardList from './components/CardList';

function App() {
  return (
    <div className='page'>
    <Nav/>
    <Header/>
    <CardList />
    </div>
  );
}

export default App;

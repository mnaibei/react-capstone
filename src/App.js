import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Currencies from './components/Currencies';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Currencies />} />
        <Route path='/details/:name' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;

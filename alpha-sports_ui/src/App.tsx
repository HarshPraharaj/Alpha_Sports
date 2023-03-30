import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PlayerDropdown from './components/PlayerDropdown';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/analytics' element={<PlayerDropdown/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App

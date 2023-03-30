import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PlayerDropdown from './components/PlayerDropdown'
import Analytics from './components/Analytics'

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/analytics' element={<Analytics/>}/>
          <Route path='/recommendations' element={<PlayerDropdown/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App

import './App.css';
import Home from './Home'
import About from './About'
import MyNavbar from './Navbar'
import NotFound from './NotFound'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>    
    </div>
  );
}

export default App;


import './App.css';
import Login from "./page/Login";
import Home from "./page/Home/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

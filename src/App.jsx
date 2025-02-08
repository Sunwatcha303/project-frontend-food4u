import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Board from "./pages/Board";
import Recipe from "./pages/Recipe";
import Article from "./pages/Article";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:tags" element={<Article />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/board/:id" element={<Board />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

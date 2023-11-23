import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Quotes from "./components/Quotes";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Jokes from "./components/Jokes";

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/jokes" element={<Jokes />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

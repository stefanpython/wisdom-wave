import "./App.css";
import Quotes from "./components/Quotes";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <HashRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Quotes/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

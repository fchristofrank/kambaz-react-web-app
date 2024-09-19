import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Labs from './Labs';
import Kanbas from "./Kanbas";
import TOC from "./TOC";

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Vicky Daniel Amalan</h1>
        <h2>Section: 02</h2>
        <hr></hr>
        <TOC />
        <Routes>
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

import { HashRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import './App.css';
import Labs from './Labs';
import Kanbas from "./Kanbas";
import TOC from "./TOC";
import { useEffect, useState } from "react";

function App() {
  return (
    <HashRouter>
      <div>
        <MainContent />
      </div>
    </HashRouter>
  );
}

function MainContent() {
  const { pathname } = useLocation();
  return (
    <div >
      {pathname === "/" && (
        <div>
          <h1>Vicky Daniel Amalan</h1>
          <h2>Section: 02</h2>
          <TOC />
          <hr></hr>
        </div>
      )}
      <div>

        <Routes>
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

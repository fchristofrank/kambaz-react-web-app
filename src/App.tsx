import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import LandingHome from "./Kambaz/LandingPage";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
            <Route path="/Home" element={<LandingHome />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
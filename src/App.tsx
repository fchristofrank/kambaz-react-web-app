import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Portal from "./Portal";
import LandingHome from "./Portal/LandingPage";
import store from "./Portal/store";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="/Portal/*" element={<Portal />} />
            <Route path="/Home" element={<LandingHome />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;
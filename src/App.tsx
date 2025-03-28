import { HashRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import './App.css';
import Labs from './Labs';
import Kambaz from "./Kambaz";
import { Provider } from "react-redux";
import store from "./Kambaz/store";

function App() {

  const serverUrl = process.env.REACT_APP_REMOTE_SERVER;
  console.warn(serverUrl);
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Kanbas() {
  return (
    <div id="wd-kanbas" className="d-flex">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="/Labs" element={<Labs />} />
        </Routes>
      </div>
    </div>
  )
}

function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <ul>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><a id="wd-github" href="https://github.com/vicky16898/kanbas-react-web-app">Github Source Code</a></li>
        <li><a id="wd-my-github" href="https://github.com/vicky16898">My Github</a></li>
        <li><Link to="/">Landing Page</Link></li>
      </ul>
    </div>
  );
}
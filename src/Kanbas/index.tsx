import { Navigate, Route, Routes } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { Link } from "react-router-dom";
import Labs from "../Labs";

export default function Kanbas() {
  return (
    <div id="wd-kanbas" className="d-flex">
      <div className="d-none d-md-block">
        <KanbasNavigation />
      </div>
      <div className="wd-main-content-offset p-3 flex-grow-1 me-4">
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

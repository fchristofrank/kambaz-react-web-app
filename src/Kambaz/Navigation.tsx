import { AiOutlineDashboard } from "react-icons/ai";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Search", path: "/Kambaz/Search", icon: FaInbox }
  ];

  return (
    <div id="wd-kambaz-navigation" style={{ width: '100%', top: 0, left: 0 }}
      className="list-group rounded-0 position-fixed
       d-flex flex-row bg-black z-2 justify-content-center align-items-center">
      <a id="wd-neu-link" target="_blank"
      href="https://www.northeastern.edu/"
      className="list-group-item bg-black border-0 text-center">
      <img src="/images/NEU.png" height="40px" /></a>
      <Link to="/Kambaz/Account" className={`list-group-item text-center border-0 bg-black
      ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
      <FaRegCircleUser className={`fs-4 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
      <br />
      Account
      </Link>
      {links.map((link) => (
      <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
        ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
      {link.icon({ className: "fs-4 text-danger" })}
      <br />
      {link.label}
      </Link>
      ))}
    </div>
  );
}

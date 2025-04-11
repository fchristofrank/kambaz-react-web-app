import { FaClipboardUser, FaInbox } from "react-icons/fa6";
import { ImNewspaper } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: ImNewspaper },
    { label: "Search", path: "/Kambaz/Search", icon: FaInbox }
  ];

  return (
    <div
      id="wd-kambaz-navigation"
      style={{
      width: '100%',
      top: 0,
      left: 0,
      background: 'linear-gradient(to right, #001f3f,rgb(17, 0, 255),rgb(98, 122, 146))',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
      }}
      className="list-group rounded-0 position-fixed
       d-flex flex-row z-2 justify-content-center align-items-center"
    >
      <Link
      to="/Kambaz/Account"
      className={`list-group-item text-center border-0
      ${pathname.includes("Account") ? "bg-white text-danger" : "text-white"}`}
      style={{
        backgroundColor: pathname.includes("Account") ? "#ffffff" : "transparent",
      }}
      >
      <FaClipboardUser
        className={`fs-4 ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
      />
      <br />
      Account
      </Link>
      {links.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`list-group-item text-center border-0
      ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white"}`}
        style={{
        backgroundColor: pathname.includes(link.label) ? "#ffffff" : "transparent",
        }}
      >
        {link.icon({ className: "fs-4 text-danger" })}
        <br />
        {link.label}
      </Link>
      ))}
    </div>
  );
}

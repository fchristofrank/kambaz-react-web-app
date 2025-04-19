import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
 const active = (path: string) => (pathname.includes(path) ? "active" : "");
 const { pathname } = useLocation();
 return (
   <div id="wd-account-navigation" className="list-group">
     {links.map((link) => (
       <Link key={link} to={`/Kambaz/Account/${link}`} className={`list-group-item ${active(link)}`}> {link} </Link>
     ))}
     {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
   </div>
);}

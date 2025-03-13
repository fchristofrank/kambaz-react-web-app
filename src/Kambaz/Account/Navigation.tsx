import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {currentUser ? (
        <Link
          to={`/kambaz/Account/Profile`}
          className={`list-group-item ${pathname.includes("Profile") ? "active border" : "text-danger"
            } border-0`}
        >
          Profile
        </Link>
      ) : (
        <>
          <Link
            to={`/kambaz/Account/Signin`}
            className={`list-group-item ${pathname.includes("Signin") ? "active border" : "text-danger"
              } border-0`}
          >
            Signin
          </Link>
          <Link
            to={`/kambaz/Account/Signup`}
            className={`list-group-item ${pathname.includes("Signup") ? "active border" : "text-danger"
              } border-0`}
          >
            Signup
          </Link>
        </>
      )}
    </div>
  );
}

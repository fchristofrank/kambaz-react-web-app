import { Link, useLocation } from "react-router-dom";

export default function TOC() {
    const { pathname } = useLocation();
    return (
        <div>
            {!pathname.includes("/Kanbas") && (
                <div>
                    <ul>
                        <li><Link to="/Labs">Labs</Link></li>
                        <li><Link to="/Kanbas">Kanbas</Link></li>
                        <li><Link to="/">Landing Page</Link></li>
                        <li><a id="wd-github" href="https://github.com/vicky16898/kanbas-react-web-app">Github Source Code</a></li>
                    </ul>
                </div>
            )}
            {pathname.includes("/Kanbas") && (
                <div>
                    <ul>
                        <li><Link to="/">Landing Page</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

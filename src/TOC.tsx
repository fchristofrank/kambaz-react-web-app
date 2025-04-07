import { Link, useLocation } from "react-router-dom";

export default function TOC() {
    return (
        <div>
            <div>
                <ul>
                    <li><Link to="#/Labs">Labs</Link></li>
                    <li><Link to="#/Kanbas">Kanbas</Link></li>
                    <li><a id="wd-github" href="https://github.com/vicky16898/kanbas-react-web-app">Github Source Code</a></li>
                </ul>
            </div>

        </div>
    );
}

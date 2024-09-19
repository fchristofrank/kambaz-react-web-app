import { Link } from "react-router-dom";

export default function TOC() {
    return (
        <ul>
            <li><Link to="/Labs">Labs</Link></li>
            <li><Link to="/Kanbas">Kanbas</Link></li>
            <li><a href="https://github.com/vicky16898/kanbas-react-web-app">Github Source Code</a></li>
            <li><Link to="/">Landing Page</Link></li>
        </ul>
    );
}

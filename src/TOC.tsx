import { Link } from "react-router-dom";

export default function TOC() {
    return (
        <div>
            <div>
                <ul>
                    <li><Link to="#/Labs">Labs</Link></li>
                    <li><Link to="#/Kambaz">Kambaz</Link></li>
                </ul>
            </div>

        </div>
    );
}

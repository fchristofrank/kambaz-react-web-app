import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Account() {
    return (
        <div id="wd-account-screen">
            <table>
                <tbody>
                    <tr>
                        <td valign="top">
                            <h2>Account</h2>
                            <Routes>
                                <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
                                <Route path="/Signin" element={<Signin />} />
                                <Route path="/Profile" element={<Profile />} />
                                <Route path="/Signup" element={<Signup />} />
                            </Routes>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

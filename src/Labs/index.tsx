import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import store from "./store";
import TOC from "./TOC";
export default function Labs() {
    return (
        <Provider store={store}>
            <div>
                <div style={{ padding: "30px 30px 10px 30px" }}>
                    <h1>Labs</h1>
                </div>
                <TOC />
                <Routes>
                    <Route path="/" element={<Navigate to="Lab1" />} />
                    <Route path="Lab1" element={<Lab1 />} />
                    <Route path="Lab2" element={<Lab2 />} />
                    <Route path="Lab3/*" element={<Lab3 />} />
                    <Route path="Lab4/*" element={<Lab4 />} />

                </Routes>
            </div>
        </Provider>
    )
}
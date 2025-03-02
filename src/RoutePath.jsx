import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JoinList from "./pages/JoinList.jsx";
import ApplyPage from "./pages/ApplyPage.jsx"; // 신용 점수 화면

export default function RoutePath() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* 로그인 성공 후 이동할 화면 */}
                <Route path="/joinList" element={<JoinList />} />
                <Route path="/apply" element={<ApplyPage />} />
            </Routes>
        </BrowserRouter>
    );
}

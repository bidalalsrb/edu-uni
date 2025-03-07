import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/login/Register.jsx";
import JoinList from "./items/user/JoinList.jsx";
import ApplyPage from "./pages/admin/ApplyPage.jsx"; // 신용 점수 화면

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

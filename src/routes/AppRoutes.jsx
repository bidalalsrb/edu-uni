// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JoinList from "../pages/user/JoinList";
import ApplyPage from "../pages/admin/ApplyPage";

function AuthLayout() {
    // 인증 페이지 레이아웃 (예: 공통 헤더, 푸터 등 필요 시)
    return <Outlet />;
}

function AppLayout() {
    // 로그인 이후의 레이아웃 (네비게이션 바 등 공통 레이아웃)
    return <Outlet />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 인증 관련 라우트 */}
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                {/* 로그인 후 사용자/관리자 페이지 */}
                <Route element={<AppLayout />}>
                    <Route path="joinList" element={<JoinList />} />
                    <Route path="apply" element={<ApplyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

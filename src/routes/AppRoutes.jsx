// routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JoinList from "../pages/user/JoinList";
import ApplyPage from "../pages/admin/ApplyPage";
import BottomNavBar from "../components/BottomNavBar";
import ApplyList from "../pages/user/ApplyList.jsx";

// 모든 페이지에 공통으로 적용할 레이아웃 컴포넌트
function GlobalLayout({ children }) {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full max-w-4xl h-screen bg-white shadow-md rounded-md overflow-auto">
                {children}
            </div>
        </div>
    );
}

function AuthLayout() {
    return (
        <GlobalLayout>
            <Outlet />
        </GlobalLayout>
    );
}

function AppLayout() {
    return (
        <>
            <GlobalLayout>
                <Outlet />
            </GlobalLayout>
            <BottomNavBar />
        </>
    );
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
                    <Route path="mypage" element={<ApplyList />} />
                    <Route path="apply" element={<ApplyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

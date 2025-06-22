/*
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JoinList from "../pages/user/JoinList";
import ApplyPage from "../pages/admin/ApplyPage";
import ApplyList from "../pages/user/ApplyList.jsx";
import UserFooter from "../components/UserFooter";
import GlobalLayout from "../components/GlobalLayout";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import BatchCode from "../components/admin/Web/BatchCode.jsx";
import EventRegisterPage from "../pages/admin/EventRegisterPage.jsx";
import ExcelDown from "../components/admin/Web/ExcelDown.jsx";
import UserApplyPage from "../pages/user/UserApplyPage.jsx";

function AppLayout() {
    return (
        <>
            <GlobalLayout>
                <Outlet />
            </GlobalLayout>
            <UserFooter />
        </>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/!* 인증 관련 라우트 *!/}
                <Route>
                    <Route path="/" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="index/admin/login" element={<Login />} />
                    <Route path="index/admin/register" element={<Register />} />
                </Route>
                {/!* 로그인 후 페이지 *!/}
                <Route element={<AppLayout />}>
                    <Route path="joinList" element={<JoinList />} />
                    <Route path="mypage" element={<ApplyList />} />
                    <Route path="apply" element={<UserApplyPage />} />
                </Route>
                {/!* 관리자 라우트: AdminLayout을 부모로 설정하고, 배치코드는 자식 라우트로 중첩 *!/}
                <Route path="index/admin" element={<AdminLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="event-register" element={<EventRegisterPage />} /> {/!* 추가 *!/}
                    <Route path="batchcode" element={<BatchCode />} />
                    <Route path="exceldown" element={<ExcelDown />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
*/

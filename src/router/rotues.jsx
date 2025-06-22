import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JoinList from "../pages/user/JoinList";
import ApplyPage from "../pages/admin/ApplyPage";
import ApplyList from "../pages/user/ApplyList.jsx";
import BottomNavBar from "../components/BottomNavBar";
import GlobalLayout from "../components/GlobalLayout";
import AdminLayout from "../pages/admin/AdminLayout.jsx";
import BatchCode from "../components/admin/Web/BatchCode.jsx";
import EventRegisterPage from "../pages/admin/EventRegisterPage.jsx";
import ExcelDown from "../components/admin/Web/ExcelDown.jsx";
import UserApplyPage from "../pages/user/UserApplyPage.jsx";

// routes 배열 변환
const routes = [
    // Auth (로그인/회원가입)
    {
        path: "/",
        element: <Login />,
        layout: "blank",
    },
    {
        path: "/register",
        element: <Register />,
        layout: "blank",
    },
    {
        path: "/index/admin/login",
        element: <Login />,
        layout: "blank",
    },
    {
        path: "/index/admin/register",
        element: <Register />,
        layout: "blank",
    },

    // 로그인 후 페이지
    {
        path: "/joinList",
        element: <JoinList />,
        layout: "default",
    },
    {
        path: "/mypage",
        element: <ApplyList />,
        layout: "default",
    },
    {
        path: "/apply",
        element: <UserApplyPage />,
        layout: "default",
    },

    // 관리자 라우트
    {
        path: "/index/admin",
        element: <AdminLayout />,  // 레이아웃 페이지는 이 자체로 사용
        layout: "admin",
    },
    {
        path: "/index/admin/login",
        element: <Login />,
        layout: "blank", // 실제 "/index/admin/login"은 로그인 화면
    },
    {
        path: "/index/admin/event-register",
        element: <EventRegisterPage />,
        layout: "admin",
    },
    {
        path: "/index/admin/batchcode",
        element: <BatchCode />,
        layout: "admin",
    },
    {
        path: "/index/admin/exceldown",
        element: <ExcelDown />,
        layout: "admin",
    },
];

export { routes };

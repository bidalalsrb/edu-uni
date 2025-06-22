import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JoinList from "../pages/user/JoinList";
import ApplyList from "../pages/user/ApplyList.jsx";
import AdminLayout from "../components/Layouts/admin/AdminLayout.jsx";
import BatchCode from "../components/admin/Web/BatchCode.jsx";
import EventRegisterPage from "../pages/admin/EventRegisterPage.jsx";
import ExcelDown from "../components/admin/Web/ExcelDown.jsx";
import UserApplyPage from "../pages/user/UserApplyPage.jsx";

// 중첩 라우트 구조 (admin은 children 사용)
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

    // ----------------------
    // 관리자 라우트 (중첩 구조)
    {
        path: "/index/admin",
        element: <AdminLayout />,
        layout: "admin",
        children: [
            {
                path: "event-register",
                element: <EventRegisterPage />,
            },
            {
                path: "batchcode",
                element: <BatchCode />,
            },
            {
                path: "exceldown",
                element: <ExcelDown />,
            },
            // 필요하면 index(기본) route도 추가
            // { path: "", element: <div>관리자 홈</div> }
        ]
    },
];
export { routes };

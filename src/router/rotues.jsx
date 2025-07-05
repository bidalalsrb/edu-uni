import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JoinList from "../pages/user/JoinList";
import AdminLayout from "../components/Layouts/admin/AdminLayout.jsx";
import EventRegisterPage from "../pages/admin/EventRegister/EventRegisterPage.jsx";
import ExcelDown from "../pages/admin/ExcelDown/ExcelDown.jsx";
import UserApplyPage from "../pages/user/UserApplyPage.jsx";
import EventList from "../pages/admin/EventList/EventList.jsx";
import ExcelListDetail from "../pages/admin/EventList/EventListDetail.jsx";
import MyAccount from "../components/user/MyPage/MyAccount.jsx";
import MyAttendList from "../components/user/MyPage/MyAttendList.jsx";
import MyPageList from "../pages/user/MyPageList.jsx";
import MyCounselingCancel from "../components/user/MyPage/MyCounselingCancel.jsx";
import EventLayout from "../pages/admin/EventLayout/EventLayout.jsx";
import EventLayoutCreate from "../pages/admin/EventLayout/EventLayoutCreate.jsx";

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
        element: <MyPageList />,
        layout: "default",
    },   {
        path: "/myappendlist",
        element: <MyAttendList />,
        layout: "default",
    }, {
        path: "/myaccount",
        element: <MyAccount />,
        layout: "default",
    },{
        path: "/mycounselingcancel",
        element: <MyCounselingCancel />,
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
                path: "event-layout",
                element: <EventLayout />,
            },   {
                path: "event-layout/create",
                element: <EventLayoutCreate />,
            },
            {
                path: "exceldown",
                element: <ExcelDown />,
            },  {
                path: "event-list",
                element: <EventList />,
            }, {
                path: "event-list-detail",
                element: <ExcelListDetail />,
            },
            // 필요하면 index(기본) route도 추가
            // { path: "", element: <div>관리자 홈</div> }
        ]
    },
];
export { routes };

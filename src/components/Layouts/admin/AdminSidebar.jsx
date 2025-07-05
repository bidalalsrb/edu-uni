import React from "react";
import {useNavigate, useLocation} from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (<aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
            <h1
                className="
                        text-xl font-bold tracking-wide
                        bg-gradient-to-b from-[#375DDC] to-[#1f3EA6]
                        bg-clip-text text-transparent
                        text-center
                      "
            >
                관리자 페이지
            </h1>
        </div>
        <nav className="space-y-1">
            <a
                onClick={() => navigate("/index/admin/event-list")}
                className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium
        ${location.pathname.includes("event-list") ? "text-white bg-gradient-to-b from-[#375DDC] to-[#1F3EA6]" : "text-gray-700"}
    `}
            >
                행사 조회
            </a>
            <a
                onClick={() => navigate("/index/admin/event-register")}
                className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium
        ${location.pathname.includes("event-register") ? "text-white bg-gradient-to-b from-[#375DDC] to-[#1F3EA6]" : "text-gray-700"}
    `}>
                행사 등록
            </a>
            <a
                onClick={() => navigate("/index/admin/event-layout")}
                className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium
        ${location.pathname.includes("event-layout") ? "text-white bg-gradient-to-b from-[#375DDC] to-[#1F3EA6]" : "text-gray-700"}
    `}>
                배치 등록/조회
            </a>
            <a
                onClick={() => navigate("/index/admin/exceldown")}
                className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium
        ${location.pathname.includes("exceldown") ? "text-white bg-gradient-to-b from-[#375DDC] to-[#1F3EA6]" : "text-gray-700"}
    `}>
                엑셀다운로드
            </a>
        </nav>
    </aside>);
}

export default AdminSidebar;

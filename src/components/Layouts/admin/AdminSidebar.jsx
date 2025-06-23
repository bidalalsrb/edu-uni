import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold tracking-wide text-gray-800">
                    관리자 페이지
                </h1>
            </div>
            <nav className="space-y-1">
                <a
                    onClick={() => navigate("/index/admin/event-search")}
                    className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700 ${
                        location.pathname.includes("event-search") ? "bg-blue-500 text-white" : ""
                    }`}
                >
                    행사 조회
                </a> <a
                    onClick={() => navigate("/index/admin/event-register")}
                    className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700 ${
                        location.pathname.includes("event-register") ? "bg-blue-500 text-white" : ""
                    }`}
                >
                    행사 등록
                </a>
                <a
                    onClick={() => navigate("/index/admin/batchcode")}
                    className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700  ${
                        location.pathname.includes("batchcode") ? "bg-blue-500 text-white border-blue-500" : ""
                    }`}
                >
                    배치 등록/조회
                </a>
                <a
                    onClick={() => navigate("/index/admin/exceldown")}
                    className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700  ${
                        location.pathname.includes("exceldown") ? "bg-blue-500 text-white border-blue-500" : ""
                    }`}
                >
                    엑셀다운로드
                </a>
            </nav>
        </aside>
    );
}

export default AdminSidebar;

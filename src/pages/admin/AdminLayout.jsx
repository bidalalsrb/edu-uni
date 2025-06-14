import React from "react";
import {Outlet, useNavigate, useLocation} from "react-router-dom";

function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 경로에 "batchCode"가 포함되어 있으면 배치 관리 메뉴가 활성화되도록 처리
    const isBatchCodeActive = location.pathname.includes("batchCode");
    const isExcelDown = location.pathname.includes("exceldown");

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {/* 사이드바 영역 */}
            <aside className="w-64 bg-white border-r border-gray-200 p-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold tracking-wide text-gray-800">
                        관리자 페이지
                    </h1>
                </div>
                <nav className="space-y-1">
                    <a
                        onClick={() => navigate("event-register")}
                        className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700 ${
                            location.pathname.includes("event-register") ? "bg-blue-500 text-white" : ""
                        }`}
                    >
                        행사 등록
                    </a>
                    <a
                        onClick={() => navigate("batchCode")}
                        className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700  ${
                            isBatchCodeActive ? "bg-blue-500 text-white border-blue-500" : ""
                        }`}
                    >
                        배치 등록/조회
                    </a>
                    <a
                        onClick={() => navigate("exceldown")}
                        className={`cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700  ${
                            isExcelDown ? "bg-blue-500 text-white border-blue-500" : ""
                        }`}
                    >
                        엑셀다운로드
                    </a>
                </nav>
            </aside>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                <header
                    className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">과학기술대학교</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">남상민</span>
                        <button type="button"
                                className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg 
                                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">로그아웃
                        </button>
                    </div>

                </header>
                {/* Outlet을 통해 자식 라우트 내용이 렌더링됨 */}
                <div className="flex-1">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;

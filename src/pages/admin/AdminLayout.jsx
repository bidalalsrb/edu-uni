import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {/* 사이드바 영역 */}
            <aside className="w-64 bg-white border-r border-gray-200 p-4">
                <div className="mb-8">
                    <h1 className="text-xl font-bold tracking-wide text-gray-800">관리자 페이지</h1>
                </div>
                <nav className="space-y-1">
                    {/* 여기서 상대 경로로 이동하면 부모인 /admin 경로가 유지됨 */}
                    <a
                        onClick={() => navigate("batchCode")}
                        className="cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        배치코드 관리
                    </a>
                    <a
                        onClick={() => navigate("layoutManagement")}
                        className="cursor-pointer block py-2 px-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                        배치도 관리
                    </a>
                </nav>
            </aside>

            {/* 메인 컨텐츠 영역 */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-gray-800">학교명</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700">홍길동</span>
                    </div>
                </header>
                {/* Outlet을 통해 자식 라우트 내용이 렌더링됨 */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;

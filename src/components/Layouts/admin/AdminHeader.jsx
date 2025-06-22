import React from "react";

function AdminHeader() {
    // (추후 필요하면 props로 사용자명 등 받을 수 있음)
    return (
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
    );
}

export default AdminHeader;

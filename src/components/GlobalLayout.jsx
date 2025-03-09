// components/GlobalLayout.jsx
import React from "react";
import AppHeader from "./user/AppHeader.jsx";

const GlobalLayout = ({ children }) => {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            {/* container-with-scroll 클래스를 추가하여 스크롤 영역을 항상 확보 */}
            <div className="w-full max-w-4xl min-h-screen bg-white shadow-md rounded-md overflow-y-scroll relative container-with-scroll">
                <AppHeader />
                <div className="pt-20">{children}</div>
            </div>
        </div>
    );
};

export default GlobalLayout;

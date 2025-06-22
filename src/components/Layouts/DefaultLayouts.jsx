import React from "react";
import AppHeader from "../user/AppHeader.jsx";
import BottomNavBar from "../BottomNavBar.jsx";

const DefaultLayout = ({ children }) => {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="w-full max-w-4xl min-h-screen bg-white shadow-md rounded-md overflow-y-scroll relative container-with-scroll">
                <AppHeader />
                <div className="pt-20">{children}</div>
                <BottomNavBar />
            </div>
        </div>
    );
};

export default DefaultLayout;

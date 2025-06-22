import React from "react";
import UserHeader from "./user/UserHeader.jsx";
import UserFooter from "./user/UserFooter.jsx";

const DefaultLayout = ({ children }) => {
    return (
        <div className="bg-gray-100 min-h-screen flex justify-center">
            <div className="w-1/2 min-h-screen bg-white shadow-md rounded-md overflow-y-scroll relative container-with-scroll">
                <UserHeader />
                <div className="pt-20">{children}</div>
                <UserFooter />
            </div>
        </div>
    );
};

export default DefaultLayout;

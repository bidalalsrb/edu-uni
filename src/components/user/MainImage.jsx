// components/user/MainImage.jsx
import React from "react";
import logo from "/public/bultiger.png";

function MainImage() {
    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">상담 리스트</h2>
            <img
                src={logo}
                alt="Main"
                className="w-full object-cover rounded-md"
            />
        </div>
    );
}

export default MainImage;

// components/user/MainImage.jsx
import React from "react";
import logo from "/public/per.png";

function MainImage() {
    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">메인 포스터 자리</h2>
            <img
                src={logo}
                alt="Main"
                className="w-full max-h-[500px] object-contain rounded-md"
            />
            <div className="ob"/>
        </div>
    );
}

export default MainImage;

import React from "react";
import defaultLogo from "/public/per.png";

function MainImage({ mainImagePreview }) {
    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">메인 포스터 자리</h2>
            <img
                src={mainImagePreview ? mainImagePreview : defaultLogo}
                alt="Main"
                className="w-full max-h-[500px] object-contain rounded-md"
            />
        </div>
    );
}

export default MainImage;

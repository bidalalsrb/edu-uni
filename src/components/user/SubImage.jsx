// components/user/SubImage.jsx
import React, {useState} from "react";

function SubImage() {
    const supportingImages = [
        "/public/tem.jpg",
        "/public/batch.jpg"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? supportingImages.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === supportingImages.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-center text-2xl font-bold mb-4">캐러셀 이미지 자리</h2>
            <div className="relative">
                <img
                    src={supportingImages[currentIndex]}
                    alt={`Supporting ${currentIndex + 1}`}
                    className="w-full object-cover rounded-md"
                />
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white px-2 py-1 rounded"
                >
                    {"<"}
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white px-2 py-1 rounded"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default SubImage;

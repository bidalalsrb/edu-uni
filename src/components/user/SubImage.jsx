import React, { useState, useEffect } from "react";

function SubImage({ subImagePreviews }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const defaultImages = ["/public/tem.jpg", "/public/batch.jpg"];
    const images = subImagePreviews && subImagePreviews.length > 0 ? subImagePreviews : defaultImages;

    // 1초마다 자동 변경
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 1000); // 1000ms = 1초

        // 컴포넌트 언마운트 시 정리
        return () => clearInterval(interval);
    }, [images.length]);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-center text-2xl font-bold mb-4">캐러셀 이미지 자리</h2>
            <div className="relative">
                <img
                    src={images[currentIndex]}
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

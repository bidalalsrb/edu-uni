import React from "react";

const EventRegisterStep = () => {
return(
    <div className="space-y-6">
        {/* 행사 메인 이미지 */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                행사 메인 이미지
            </label>
            <div className="relative">
                {eventData.mainImagePreview ? (
                    <img
                        src={eventData.mainImagePreview}
                        alt="메인 이미지 미리보기"
                        className="w-full h-48 object-cover rounded-xl border"
                    />
                ) : (
                    <label
                        htmlFor="mainImageInput"
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer bg-white hover:bg-gray-50"
                    >
                        <svg
                            className="w-8 h-8 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            ></path>
                        </svg>
                        <span className="text-gray-600 text-sm">이미지 추가</span>
                    </label>
                )}
                <input
                    id="mainImageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setEventData(prev => ({
                            ...prev,
                            mainImage: file,
                            mainImagePreview: file ? URL.createObjectURL(file) : null,
                        }));
                    }}
                    className="hidden"
                />
            </div>
        </div>
        {/* 행사 서브 이미지 */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                행사 서브 이미지 (여러 장 선택 가능)
            </label>
            <div className="grid grid-cols-3 gap-2">
                {eventData.subImagePreviews.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`서브 이미지 ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                    />
                ))}
                <div
                    className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <label
                        htmlFor="subImageInput"
                        className="flex flex-col items-center justify-center p-2"
                    >
                        <svg
                            className="w-6 h-6 text-gray-400 mb-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            ></path>
                        </svg>
                        <span className="text-gray-600 text-xs">추가</span>
                    </label>
                </div>
            </div>
            <input
                id="subImageInput"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    const newPreviews = newFiles.map(file =>
                        URL.createObjectURL(file)
                    );
                    setEventData(prev => ({
                        ...prev,
                        subImages: [...(prev.subImages || []), ...newFiles],
                        subImagePreviews: [
                            ...(prev.subImagePreviews || []),
                            ...newPreviews
                        ]
                    }));
                }}
                className="hidden"
            />
        </div>
        <div className="flex justify-between gap-2">
            <button
                onClick={() => setStep(1)}
                className="w-1/2 py-3 border rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition"
            >
                이전
            </button>
            <button
                onClick={handleSubmit}
                className="w-1/2 py-3 bg-green-500 text-white font-semibold text-sm rounded-xl hover:bg-green-600 transition"
            >
                등록
            </button>
        </div>
    </div>

)
}
export default EventRegisterStep;
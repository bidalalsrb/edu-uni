import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventRegisterPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [eventData, setEventData] = useState({
        name: "",
        location: "",
        person: "",
        startDate: "",
        endDate: "",
        batchCode: "",
        mainImage: null,
        mainImagePreview: null,
        subImages: [],
        subImagePreviews: []
    });

    const generateBatchCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setEventData(prev => ({ ...prev, batchCode: "#" + code }));
    };

    const handleNext = () => {
        if (
            !eventData.name ||
            !eventData.location ||
            !eventData.person ||
            !eventData.startDate ||
            !eventData.endDate ||
            !eventData.batchCode
        ) {
            alert("모든 기본 정보를 입력하고 배치코드를 발급해주세요.");
            return;
        }
        setStep(2);
    };

    const handleSubmit = () => {
        if (!eventData.mainImage) {
            alert("행사 메인 이미지를 등록해주세요.");
            return;
        }
        if (!eventData.subImages || eventData.subImages.length === 0) {
            alert("행사 서브 이미지를 최소 1장 이상 등록해주세요.");
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        const finalEventData = { ...eventData, registrationDate: today };
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = [...existingEvents, finalEventData];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        navigate("/index/admin/batchCode");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl mt-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">행사 등록</h1>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-8">
                <div
                    className={`h-2 transition-all duration-300 ${
                        step === 1 ? "w-1/2 bg-blue-400" : "w-full bg-blue-500"
                    }`}
                ></div>
            </div>
            {step === 1 && (
                <div className="space-y-5">
                    {/* 기본 정보 입력 */}
                    <div>
                        <label className="text-sm text-gray-700 font-medium">행사명</label>
                        <input
                            type="text"
                            value={eventData.name}
                            onChange={(e) =>
                                setEventData({ ...eventData, name: e.target.value })
                            }
                            placeholder="예: 캠퍼스 잡페어"
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 font-medium">행사장소</label>
                        <input
                            type="text"
                            value={eventData.location}
                            onChange={(e) =>
                                setEventData({ ...eventData, location: e.target.value })
                            }
                            placeholder="예: 산학관"
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 font-medium">행사 담당자</label>
                        <input
                            type="text"
                            value={eventData.person}
                            onChange={(e) =>
                                setEventData({ ...eventData, person: e.target.value })
                            }
                            placeholder="예: 홍길동"
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 font-medium">행사 시작 날짜</label>
                        <input
                            type="date"
                            value={eventData.startDate}
                            onChange={(e) =>
                                setEventData({ ...eventData, startDate: e.target.value })
                            }
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 font-medium">행사 종료 날짜</label>
                        <input
                            type="date"
                            value={eventData.endDate}
                            onChange={(e) =>
                                setEventData({ ...eventData, endDate: e.target.value })
                            }
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={generateBatchCode}
                            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600"
                        >
                            배치코드 발급
                        </button>
                        {eventData.batchCode && (
                            <span className="ml-4 text-lg font-bold text-gray-800">
                {eventData.batchCode}
              </span>
                        )}
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-full py-3 bg-blue-500 text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition"
                    >
                        다음
                    </button>
                </div>
            )}
            {step === 2 && (
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
                            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
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
            )}
        </div>
    );
}

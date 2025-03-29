import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventRegisterPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [eventData, setEventData] = useState({
        name: "",         // 행사명
        location: "",     // 행사장소
        person: "",       // 행사 담당자
        startDate: "",    // 행사 시작 날짜
        endDate: "",      // 행사 종료 날짜
        batchCode: "",    // 배치코드 (버튼 클릭 시 발급)
        // 등록일은 제출 시 오늘 날짜로 설정
        mainImage: null,
        mainImagePreview: null,
        subImages: [],
        subImagePreviews: []
    });

    // 배치코드 생성 함수 (예: "#2222")
    const generateBatchCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setEventData(prev => ({ ...prev, batchCode: "#" + code }));
    };

    const handleNext = () => {
        // 기본 정보 모두 입력되어야 함
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

        // 제출 시 등록일은 오늘 날짜 (YYYY-MM-DD)
        const today = new Date().toISOString().split("T")[0];

        const finalEventData = {
            ...eventData,
            registrationDate: today
        };

        // 기존 저장된 행사 목록 불러오기
        const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
        // 새 행사 추가
        const updatedEvents = [...existingEvents, finalEventData];
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        // 등록 성공 시 관리자 페이지(배치코드)로 이동
        navigate("/index/admin/batchCode");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-2xl mt-6">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">행사 등록</h1>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-8">
                <div
                    className={`h-2 transition-all duration-300 ${
                        step === 1 ? "w-1/2 bg-blue-400" : "w-full bg-blue-500"
                    }`}
                ></div>
            </div>
            {step === 1 && (
                <div className="space-y-5">
                    {/* 행사명 */}
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
                    {/* 행사장소 */}
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
                    {/* 행사 담당자 */}
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
                    {/* 행사 시작 날짜 */}
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
                    {/* 행사 종료 날짜 */}
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
                    {/* 배치코드 발급 */}
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
                        <input
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
                            className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {eventData.mainImagePreview && (
                            <img
                                src={eventData.mainImagePreview}
                                alt="메인 이미지 미리보기"
                                className="mt-3 w-full h-48 object-cover rounded-xl border"
                            />
                        )}
                    </div>
                    {/* 행사 서브 이미지 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            행사 서브 이미지 (여러 장 선택 가능)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const newFiles = Array.from(e.target.files);
                                const newPreviews = newFiles.map((file) =>
                                    URL.createObjectURL(file)
                                );
                                setEventData(prev => ({
                                    ...prev,
                                    subImages: [...(prev.subImages || []), ...newFiles],
                                    subImagePreviews: [...(prev.subImagePreviews || []), ...newPreviews],
                                }));
                            }}
                            className="w-full px-3 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {eventData.subImagePreviews && eventData.subImagePreviews.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {eventData.subImagePreviews.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`서브 이미지 ${idx + 1}`}
                                        className="w-full h-24 object-cover rounded-md border"
                                    />
                                ))}
                            </div>
                        )}
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

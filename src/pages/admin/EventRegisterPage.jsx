import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function EventRegisterPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        image: null,
        imagePreview: null,
        subImages: [],
        subImagePreviews: [],
    });
    const handleNext = () => {
        if (step === 1 && (!eventData.title || !eventData.date)) {
            alert("행사명과 날짜를 입력해주세요.");
            return;
        }
        setStep(2);
    };

    const handleSubmit = () => {
        if (!eventData.image) {
            alert("메인 이미지를 등록해주세요.");
            return;
        }
        if (!eventData.subImages || eventData.subImages.length === 0) {
            alert("서브 이미지를 최소 1장 이상 등록해주세요.");
            return;
        }

        // 기존 저장된 행사 목록 불러오기
        const existingEvents = JSON.parse(localStorage.getItem('events')) || [];

        // 새 행사 추가
        const updatedEvents = [...existingEvents, eventData];

        // 로컬 스토리지에 저장
        localStorage.setItem('events', JSON.stringify(updatedEvents));

        // 등록 성공 시 관리자 페이지로 이동
        navigate('/index/admin/batchCode');
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

            {/* Step 1: 기본 정보 */}
            {step === 1 && (
                <div className="space-y-5">
                    <div>
                        <label className="text-sm text-gray-700 font-medium">행사명</label>
                        <input
                            type="text"
                            value={eventData.title}
                            onChange={(e) =>
                                setEventData({ ...eventData, title: e.target.value })
                            }
                            placeholder="예: 캠퍼스 잡페어"
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 font-medium">설명</label>
                        <textarea
                            value={eventData.description}
                            onChange={(e) =>
                                setEventData({ ...eventData, description: e.target.value })
                            }
                            rows={3}
                            placeholder="행사에 대한 간단한 설명을 입력하세요"
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-700 font-medium">날짜</label>
                        <input
                            type="date"
                            value={eventData.date}
                            onChange={(e) =>
                                setEventData({ ...eventData, date: e.target.value })
                            }
                            className="w-full mt-1 px-4 py-2 border rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-full py-3 bg-blue-500 text-white font-semibold text-sm rounded-xl hover:bg-blue-600 transition"
                    >
                        다음
                    </button>
                </div>
            )}

            {/* Step 2: 이미지 업로드 */}
            {step === 2 && (
                <div className="space-y-6">
                    {/* 메인 이미지 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">메인 이미지</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setEventData((prev) => ({
                                    ...prev,
                                    image: file,
                                    imagePreview: file ? URL.createObjectURL(file) : null,
                                }));
                            }}
                            className="w-full px-3 py-2 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {eventData.imagePreview && (
                            <img
                                src={eventData.imagePreview}
                                alt="메인 이미지 미리보기"
                                className="mt-3 w-full h-48 object-cover rounded-xl border"
                            />
                        )}
                    </div>

                    {/* 서브 이미지 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            서브 이미지 (1장 이상 선택 가능)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                const previews = files.map((file) => ({
                                    file,
                                    url: URL.createObjectURL(file),
                                }));
                                setEventData((prev) => ({
                                    ...prev,
                                    subImages: files,
                                    subImagePreviews: previews,
                                }));
                            }}
                            className="w-full px-3 py-2 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {eventData.subImagePreviews && eventData.subImagePreviews.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                {eventData.subImagePreviews.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img.url}
                                        alt={`서브 이미지 ${idx + 1}`}
                                        className="w-full h-24 object-cover rounded-md border"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 버튼 */}
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

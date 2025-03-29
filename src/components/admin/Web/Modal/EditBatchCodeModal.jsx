import React, { useState } from "react";

function EditBatchCodeModal({ record, onClose, onUpdate }) {
    const [name, setName] = useState(record.name);
    const [location, setLocation] = useState(record.location);
    const [person, setPerson] = useState(record.person);
    const [startDate, setStartDate] = useState(record.startDate);
    const [endDate, setEndDate] = useState(record.endDate);
    // 등록일은 읽기 전용으로 표시
    const registrationDate = record.registrationDate || "";
    const [mainImage, setMainImage] = useState(record.mainImage || null);
    const [mainImagePreview, setMainImagePreview] = useState(record.mainImagePreview || null);
    const [subImages, setSubImages] = useState(record.subImages || []);
    const [subImagePreviews, setSubImagePreviews] = useState(record.subImagePreviews || []);

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setSubImages(files);
        setSubImagePreviews(previews);
    };

    const handleUpdate = () => {
        if (!name || !location || !person || !startDate || !endDate) {
            alert("행사명, 행사장소, 담당자, 시작/종료 날짜를 모두 입력해주세요.");
            return;
        }
        const updatedRecord = {
            ...record,
            name,
            location,
            person,
            startDate,
            endDate,
            // 등록일은 기존 값 유지
            registrationDate,
            image: mainImage,
            imagePreview: mainImagePreview,
            subImages,
            subImagePreviews,
        };
        onUpdate(updatedRecord);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full overflow-y-auto max-h-screen">
                <h2 className="text-xl font-bold mb-4">배치코드 상세보기</h2>
                {/* 배치코드 (수정불가) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">배치코드</label>
                    <div className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-sm">
                        {record.batchCode}
                    </div>
                </div>
                {/* 행사명 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">행사명</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="행사명 입력"
                    />
                </div>
                {/* 행사장소 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">행사장소</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="행사장소 입력"
                    />
                </div>
                {/* 담당자 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">담당자</label>
                    <input
                        type="text"
                        value={person}
                        onChange={(e) => setPerson(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="담당자 입력"
                    />
                </div>
                {/* 시작 날짜 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">시작 날짜</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                {/* 종료 날짜 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">종료 날짜</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                {/* 등록일 (읽기 전용) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">등록일</label>
                    <div className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-sm">
                        {registrationDate}
                    </div>
                </div>
                {/* 메인 이미지 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">메인 이미지</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    {mainImagePreview ? (
                        <img
                            src={mainImagePreview}
                            alt="메인 이미지 미리보기"
                            className="mt-3 w-full h-48 object-cover rounded-md border"
                        />
                    ) : (
                        <div className="mt-3 w-full h-48 flex items-center justify-center border rounded-md text-gray-500">
                            기본 이미지
                        </div>
                    )}
                </div>
                {/* 서브 이미지 */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">서브 이미지</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleSubImagesChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    {subImagePreviews && subImagePreviews.length > 0 ? (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {subImagePreviews.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`서브 이미지 ${idx + 1}`}
                                    className="w-full h-24 object-cover rounded-md border"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-3 w-full h-24 flex items-center justify-center border rounded-md text-gray-500">
                            기본 서브 이미지
                        </div>
                    )}
                </div>
                {/* 하단 버튼 */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditBatchCodeModal;

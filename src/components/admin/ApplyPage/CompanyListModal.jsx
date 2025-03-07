import React, { useState, useEffect } from "react";
import ApplyFormModal from "./ApplyFormModal.jsx";

function CompanyListModal({ isOpen, onClose, companyBox, onSubmitApplication }) {
    const [isApplyFormModalOpen, setIsApplyFormModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 박스가 바뀔 때마다 현재 페이지를 1로 초기화
    useEffect(() => {
        setCurrentPage(1);
    }, [companyBox]);

    if (!isOpen || !companyBox) return null;

    const formatTime = (date) => {
        if (!(date instanceof Date)) return "";
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const handleOpenApplyForm = () => {
        setIsApplyFormModalOpen(true);
    };

    const handleSubmitApplication = (newApp) => {
        onSubmitApplication(companyBox.id, {
            id: Date.now(),
            startTime: newApp.startTime, // Date 객체
            endTime: newApp.endTime,     // Date 객체
            name: newApp.name,
        });
        setIsApplyFormModalOpen(false);
    };

    const totalApplications = companyBox.applications ? companyBox.applications.length : 0;
    const totalPages = Math.ceil(totalApplications / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedApplications = companyBox.applications.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-96 max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">
                    {companyBox.companyName}의 등록 리스트
                </h3>

                {/* 신청 내역을 카드 형태로 출력 (5개씩) */}
                {totalApplications > 0 ? (
                    displayedApplications.map((app) => (
                        <div
                            key={app.id}
                            className="border rounded p-4 mb-4 shadow-sm"
                        >
                            {/* 상단 영역 */}
                            <div className="flex justify-between items-center">
                                <h4 className="text-lg font-semibold">
                                    {companyBox.companyName}
                                </h4>
                                <span className="text-sm text-gray-700">
                  신청여부: 신청 가능
                </span>
                            </div>

                            {/* 하단 영역 */}
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-700">
                                    시간: {formatTime(app.startTime)} ~ {formatTime(app.endTime)}{" "}
                                    | 강사: {app.name}
                                </p>
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                                    onClick={() => alert("신청하기 버튼 클릭")}
                                >
                                    신청하기
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mb-4 text-sm text-gray-500">신청된 내역이 없습니다.</p>
                )}

                {/* 페이징 컨트롤 */}
                {totalApplications > itemsPerPage && (
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                        >
                            이전
                        </button>
                        <span className="text-sm text-gray-700">
              {currentPage} / {totalPages}
            </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                        >
                            다음
                        </button>
                    </div>
                )}

                {/* 하단 버튼들 */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                        닫기
                    </button>
                    <button
                        onClick={handleOpenApplyForm}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        신청하기
                    </button>
                </div>

                {/* 신청 폼 모달 */}
                {isApplyFormModalOpen && (
                    <ApplyFormModal
                        isOpen={isApplyFormModalOpen}
                        onClose={() => setIsApplyFormModalOpen(false)}
                        onSubmit={handleSubmitApplication}
                    />
                )}
            </div>
        </div>
    );
}

export default CompanyListModal;

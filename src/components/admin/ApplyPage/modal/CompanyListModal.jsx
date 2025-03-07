import React, { useState } from "react";
import ApplyFormModal from "./ApplyFormModal.jsx";

function CompanyListModal({ isOpen, onClose, companyBox, onSubmitApplication }) {
    const [isApplyFormModalOpen, setIsApplyFormModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    if (!isOpen || !companyBox) return null;

    const openApplyForm = () => setIsApplyFormModalOpen(true);
    const closeApplyForm = () => setIsApplyFormModalOpen(false);

    const handleSubmitApplication = (newApp) => {
        onSubmitApplication(companyBox.id, {
            id: Date.now(),
            startTime: newApp.startTime,
            endTime: newApp.endTime,
            name: newApp.name,
        });
        setIsApplyFormModalOpen(false);
    };

    // 시간을 포맷하는 함수
    const formatTime = (time) => {
        const d = time instanceof Date ? time : new Date(time);
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    // 신청 내역 배열에서 현재 페이지에 해당하는 항목만 추출
    const apps = companyBox.applications || [];
    const totalPages = Math.ceil(apps.length / itemsPerPage);
    const displayedApps = apps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="w-[90%] max-w-md bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col">
                {/* 상단 헤더 */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">{companyBox.companyName} 등록 리스트</h2>
                    <div className="w-6 h-6" />
                </div>

                {/* 본문 영역 */}
                <div className="flex-1 overflow-y-auto px-4 py-5">
                    {apps.length > 0 ? (
                        <>
                            <div className="space-y-3">
                                {displayedApps.map((app) => (
                                    <div
                                        key={app.id}
                                        className="border rounded-md p-3 bg-white shadow-sm flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="text-sm text-gray-500">
                                                {formatTime(app.startTime)} ~ {formatTime(app.endTime)}
                                            </div>
                                            <div className="text-base font-medium text-gray-700">{app.name}</div>
                                        </div>
                                        <button
                                            className="cursor-pointer px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            onClick={() => alert("신청하기 버튼 클릭")}
                                        >
                                            신청하기
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center mt-4 space-x-2">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                                    >
                                        이전
                                    </button>
                                    <span className="text-gray-700">
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
                        </>
                    ) : (
                        <p className="text-gray-500 text-sm">신청된 내역이 없습니다.</p>
                    )}
                </div>

                {/* 하단 버튼 영역 */}
                <div className="border-t px-4 py-3 flex justify-between items-center bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        닫기
                    </button>
                    <button
                        onClick={openApplyForm}
                        className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        신청하기
                    </button>
                </div>
            </div>

            {/* 신청 폼 모달 */}
            {isApplyFormModalOpen && (
                <ApplyFormModal
                    isOpen={isApplyFormModalOpen}
                    onClose={closeApplyForm}
                    onSubmit={handleSubmitApplication}
                />
            )}
        </div>
    );
}

export default CompanyListModal;

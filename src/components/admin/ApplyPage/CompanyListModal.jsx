import React, { useState } from "react";
import ApplyFormModal from "./ApplyFormModal.jsx";

function CompanyListModal({ isOpen, onClose, companyBox, onSubmitApplication }) {
    const [isApplyFormModalOpen, setIsApplyFormModalOpen] = useState(false);

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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h3 className="text-lg font-bold mb-2">
                    {companyBox.companyName}의 등록 리스트
                </h3>
                {companyBox.applications && companyBox.applications.length > 0 ? (
                    <table className="w-full mb-4">
                        <thead>
                        <tr className="text-sm font-semibold text-gray-700">
                            <th className="text-left">시간</th>
                            <th className="text-left">이름</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {companyBox.applications.map((app) => (
                            <tr key={app.id} className="text-sm text-gray-600">
                                <td>{`${formatTime(app.startTime)} ~ ${formatTime(app.endTime)}`}</td>
                                <td>{app.name}</td>
                                <td>
                                    <button
                                        className="px-2 py-1 bg-blue-500 text-white rounded"
                                        onClick={() => alert("신청하기 버튼 클릭")}
                                    >
                                        신청하기
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mb-4 text-sm text-gray-500">
                        신청된 내역이 없습니다.
                    </p>
                )}
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

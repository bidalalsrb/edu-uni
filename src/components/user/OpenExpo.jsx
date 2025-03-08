// src/components/user/OpenExpo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sampleLayout from "../../data/sampleData";

function OpenExpo() {
    const navigate = useNavigate();
    const [boxes, setBoxes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 저장된 데이터와 샘플 데이터를 병합하여 반환하는 함수
    const loadLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        let storedBoxes = [];
        let storedRowCount, storedColCount;
        if (storedUser) {
            const savedLayout = localStorage.getItem("layout_" + storedUser.id);
            if (savedLayout) {
                const layout = JSON.parse(savedLayout);
                storedBoxes = layout.boxes || [];
                storedRowCount = layout.rowCount;
                storedColCount = layout.colCount;
            }
        } else {
            // 로그인하지 않은 경우 "layout_sample" 키 사용
            const savedLayout = localStorage.getItem("layout_sample");
            if (savedLayout) {
                const layout = JSON.parse(savedLayout);
                storedBoxes = layout.boxes || [];
                storedRowCount = layout.rowCount;
                storedColCount = layout.colCount;
            }
        }
        // 항상 샘플 데이터를 기본으로 포함하고, 저장된 데이터는 그 뒤에 추가
        const sampleBoxes = sampleLayout.boxes;
        const combinedBoxes = [...sampleBoxes, ...storedBoxes];
        return {
            boxes: combinedBoxes,
            rowCount: storedRowCount !== undefined ? storedRowCount : sampleLayout.rowCount,
            colCount: storedColCount !== undefined ? storedColCount : sampleLayout.colCount,
        };
    };

    useEffect(() => {
        const layout = loadLayout();
        setBoxes(layout.boxes);
        // rowCount, colCount도 필요 시 상태로 설정
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    // 모든 박스의 신청 내역을 하나의 배열로 구성
    // 중복 키 문제 해결을 위해 각 항목에 전역 인덱스를 추가하여 고유 키를 생성함
    const aggregatedApps = boxes.flatMap((box) =>
        (box.applications || []).map((app) => ({
            id: app.id,
            boxId: box.id,
            company: box.companyName || box.school || "제목없음",
            startTime: app.startTime ? new Date(app.startTime) : null,
            endTime: app.endTime ? new Date(app.endTime) : null,
            teacher: box.teacher || app.name || "강사 없음",
        }))
    );

    // startTime 기준 오름차순 정렬 (startTime이 없는 경우는 뒤로 배치)
    aggregatedApps.sort((a, b) => {
        if (a.startTime && b.startTime) {
            return a.startTime - b.startTime;
        } else if (a.startTime) {
            return -1;
        } else if (b.startTime) {
            return 1;
        } else {
            return 0;
        }
    });

    const totalPages = Math.ceil(aggregatedApps.length / itemsPerPage);
    const displayedApps = aggregatedApps.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatTime = (dateObj) => {
        if (!dateObj) return "";
        return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="bg-gray-100 p-4">
            <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
                상담 리스트
            </h2>
            {aggregatedApps.length > 0 ? (
                <div>
                    <ul className="divide-y divide-gray-200">
                        {displayedApps.map((app, index) => {
                            const timeRange =
                                app.startTime && app.endTime
                                    ? `${formatTime(app.startTime)} ~ ${formatTime(app.endTime)}`
                                    : "시간 없음";
                            return (
                                <li
                                    key={`aggregated-${app.boxId}-${app.id}-${index}`}
                                    className="flex items-center justify-between py-4"
                                >
                                    <div className="flex-1">
                                        <div className="text-lg font-bold text-gray-900">
                                            {app.company}
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            {timeRange} | {app.teacher}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            navigate("/apply", { state: { expoId: app.id } })
                                        }
                                        className="ml-4 px-4 py-1 bg-blue-500 rounded-full text-white text-xs font-medium shadow-sm hover:bg-blue-600 focus:outline-none"
                                    >
                                        신청하기
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {aggregatedApps.length >= itemsPerPage && (
                        <div className="flex items-center justify-center mt-6 space-x-4">
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
                </div>
            ) : (
                <p className="text-center text-base text-gray-500">
                    저장된 박스 배치도가 없습니다.
                </p>
            )}
        </div>
    );
}

export default OpenExpo;

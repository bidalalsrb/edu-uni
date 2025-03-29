// BatchCode.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewBatchCodeModal from "./Modal/NewBatchCodeModal";
import EditBatchCodeModal from "./Modal/EditBatchCodeModal";
import ApplyPage from "../../../pages/admin/ApplyPage"; // 배치도 컴포넌트

function BatchCode() {
    const [records, setRecords] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("전체");
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [showLayout, setShowLayout] = useState(false);
    const [selectedRecordForLayout, setSelectedRecordForLayout] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        const eventRecords = storedEvents.map(event => ({
            batchCode: event.batchCode,  // 배치코드 (행사 등록 시 발급)
            name: event.name,            // 행사명
            location: event.location,    // 행사장소
            person: event.person,        // 담당자
            startDate: event.startDate,  // 시작 날짜
            endDate: event.endDate,      // 종료 날짜
            registrationDate: event.registrationDate,  // 등록일 (행사 등록 시 오늘 날짜)
            mainImage: event.mainImage,
            mainImagePreview: event.mainImagePreview,
            subImages: event.subImages,
            subImagePreviews: event.subImagePreviews,
        }));
        setRecords(eventRecords);
    }, []);

    const addRecord = (record) => {
        const updatedRecords = [...records, record];
        setRecords(updatedRecords);
        if (searchTerm) {
            handleSearch();
        }
    };

    const updateRecord = (updatedRecord) => {
        const updatedRecords = records.map((rec) =>
            rec.batchCode === updatedRecord.batchCode ? updatedRecord : rec
        );
        setRecords(updatedRecords);
        if (searchTerm) {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredRecords(null);
            return;
        }
        const filtered = records.filter((record) => {
            if (searchOption === "전체") {
                return (
                    record.batchCode.includes(searchTerm) ||
                    record.name.includes(searchTerm) ||
                    record.location.includes(searchTerm) ||
                    record.person.includes(searchTerm)
                );
            } else if (searchOption === "행사명") {
                return record.name.includes(searchTerm);
            } else if (searchOption === "행사장소") {
                return record.location.includes(searchTerm);
            } else {
                return true;
            }
        });
        setFilteredRecords(filtered);
    };

    const displayRecords = filteredRecords !== null ? filteredRecords : records;

    return (
        <main className="p-6 flex flex-col gap-6">
            {!showLayout ? (
                <>
                    {/* 검색/필터 섹션 */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">배치코드</h2>
                        <div className="flex items-center space-x-2">
                            <select
                                value={searchOption}
                                onChange={(e) => setSearchOption(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>전체</option>
                                <option>행사명</option>
                                <option>행사장소</option>
                            </select>
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                검색
                            </button>
                        </div>
                    </section>

                    {/* 테이블 섹션 */}
                    <section className="bg-white rounded-xl shadow-sm">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">배치코드 목록</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                                >
                                    + 신규 등록
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">번호</th>
                                    <th className="px-4 py-3 font-semibold">배치코드</th>
                                    <th className="px-4 py-3 font-semibold">행사명</th>
                                    <th className="px-4 py-3 font-semibold">행사장소</th>
                                    <th className="px-4 py-3 font-semibold">담당자</th>
                                    <th className="px-4 py-3 font-semibold">시작/종료</th>
                                    <th className="px-4 py-3 font-semibold">등록일</th>
                                    <th className="px-4 py-3 font-semibold">관리</th>
                                    <th className="px-4 py-3 font-semibold">배치도</th>
                                </tr>
                                </thead>
                                <tbody>
                                {displayRecords.length === 0 ? (
                                    <tr className="border-b border-gray-100">
                                        <td className="px-4 py-3" colSpan="9">
                                            검색 결과가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    displayRecords.map((record, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-100 hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3">{index + 1}</td>
                                            <td className="px-4 py-3">{record.batchCode}</td>
                                            <td className="px-4 py-3">{record.name}</td>
                                            <td className="px-4 py-3">{record.location}</td>
                                            <td className="px-4 py-3">{record.person}</td>
                                            <td className="px-4 py-3">
                                                {record.startDate} ~ {record.endDate}
                                            </td>
                                            <td className="px-4 py-3">{record.registrationDate}</td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => setEditingRecord(record)}
                                                    className="text-sm text-blue-500 hover:underline"
                                                >
                                                    상세보기
                                                </button>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedRecordForLayout(record);
                                                        setShowLayout(true);
                                                    }}
                                                    className="text-sm text-green-500 hover:underline ml-2"
                                                >
                                                    관리
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                            <div className="text-sm text-gray-500">총 {displayRecords.length}건</div>
                            <div className="space-x-1">
                                {/* 페이지네이션 버튼들 (필요시 추가) */}
                            </div>
                        </div>
                    </section>
                </>
            ) : (
                <div>
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={() => {
                                setShowLayout(false);
                                setSelectedRecordForLayout(null);
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            목록 보기
                        </button>
                    </div>
                    {/* ApplyPage에 선택된 레코드를 prop으로 전달 */}
                    <ApplyPage record={selectedRecordForLayout} />
                </div>
            )}
            {modalOpen && (
                <NewBatchCodeModal
                    onClose={() => setModalOpen(false)}
                    onSave={addRecord}
                />
            )}
            {editingRecord && (
                <EditBatchCodeModal
                    record={editingRecord}
                    onClose={() => setEditingRecord(null)}
                    onUpdate={updateRecord}
                />
            )}
        </main>
    );
}

export default BatchCode;

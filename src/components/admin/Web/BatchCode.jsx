import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NewBatchCodeModal from "./Modal/NewBatchCodeModal"; // 신규 등록 모달
import EditBatchCodeModal from "./Modal/EditBatchCodeModal";
import ApplyPage from "../../../pages/admin/ApplyPage"; // 배치도를 렌더링할 컴포넌트

function BatchCode() {
    // 임시 데이터
    const initialData = [
        {
            batchCode: "#4155",
            location: "산학관",
            registeredDate: "2025-03-22",
            person: "홍길동",
        },
        // 기타 초기 데이터...
    ];
    const [records, setRecords] = useState(initialData);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("전체");
    const [filteredRecords, setFilteredRecords] = useState(null);
    const [showLayout, setShowLayout] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        const eventRecords = storedEvents.map(event => ({
            batchCode: event.title, // 행사명을 배치코드로 사용
            location: event.location || "미정", // 장소 정보가 없으면 '미정'으로 설정
            registeredDate: event.date,
            person: event.person || "관리자", // 담당자 정보가 없으면 '관리자'로 설정
        }));
        setRecords(prevRecords => [...prevRecords, ...eventRecords]);
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
                    record.location.includes(searchTerm) ||
                    record.person.includes(searchTerm)
                );
            } else if (searchOption === "장소") {
                return record.location.includes(searchTerm);
            } else if (searchOption === "배치코드") {
                return record.batchCode.includes(searchTerm);
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
                                <option>배치코드</option>
                                <option>장소</option>
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
                                    <th className="px-4 py-3 font-semibold">장소</th>
                                    <th className="px-4 py-3 font-semibold">담당자</th>
                                    <th className="px-4 py-3 font-semibold">등록일</th>
                                    <th className="px-4 py-3 font-semibold">관리</th>
                                    <th className="px-4 py-3 font-semibold">배치도</th>
                                </tr>
                                </thead>
                                <tbody>
                                {displayRecords.length === 0 ? (
                                    <tr className="border-b border-gray-100">
                                        <td className="px-4 py-3" colSpan="6">
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
                                            <td className="px-4 py-3">{record.location}</td>
                                            <td className="px-4 py-3">{record.person}</td>
                                            <td className="px-4 py-3">{record.registeredDate}</td>
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
                                                    onClick={() => setShowLayout(true)}
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
                // showLayout가 true이면 배치코드 목록 대신 배치도(ApplyPage)만 렌더링
                <div>
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={() => setShowLayout(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            목록 보기
                        </button>
                    </div>
                    {/*todo 배치도 정보 전달 */}
                    <ApplyPage/>
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

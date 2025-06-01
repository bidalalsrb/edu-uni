import React, {useState} from "react";

export const sampleEvents = [
    {
        name: "2025 상반기 취업박람회",
        location: "코엑스 A홀",
        person: "홍길동",
        endDate: "2025-06-10",
    },
    {
        name: "AI IT 채용박람회",
        location: "서울시청 1층",
        person: "김지원",
        endDate: "2025-07-01",
    },
    {
        name: "청년드림 잡페어",
        location: "부산 벡스코",
        person: "이수현",
        endDate: "2025-06-25",
    },
    {
        name: "산학연계 취업박람회",
        location: "대구 엑스코",
        person: "최민재",
        endDate: "2025-08-12",
    },
];

function ExcelDown() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("행사명"); // 기본값 "행사명"
    const [filteredRecords, setFilteredRecords] = useState(sampleEvents);

    // 검색 버튼 클릭시
    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setFilteredRecords(sampleEvents);
            return;
        }
        const filtered = sampleEvents.filter((record) => {
            if (searchOption === "행사명") {
                return record.name.includes(searchTerm);
            } else if (searchOption === "담당자") {
                return record.person.includes(searchTerm);
            } else {
                return true;
            }
        });
        setFilteredRecords(filtered);
    };

    // 엔터 키로도 검색 가능
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <main className="p-6 flex flex-col gap-6">
            {/* 검색/필터 섹션 */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">엑셀 다운로드</h2>
                <div className="flex items-center space-x-2">
                    <select
                        value={searchOption}
                        onChange={(e) => setSearchOption(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="행사명">행사명</option>
                        <option value="담당자">담당자</option>
                    </select>
                    <input
                        type="text"
                        placeholder={`${searchOption}으로 검색`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
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
                    <h3 className="text-lg font-semibold text-gray-800">행사 목록</h3>
                    <button type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
                             focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">엑셀 다운로드
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold">번호</th>
                            <th className="px-4 py-3 font-semibold">행사명</th>
                            <th className="px-4 py-3 font-semibold">담당자</th>
                            <th className="px-4 py-3 font-semibold">날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRecords.length === 0 ? (
                            <tr className="border-b border-gray-100">
                                <td className="px-4 py-3" colSpan="4">
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredRecords.map((record, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{record.name}</td>
                                    <td className="px-4 py-3">{record.person}</td>
                                    <td className="px-4 py-3">{record.endDate}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-500">총 {filteredRecords.length}건</div>
                </div>
            </section>
        </main>
    );
}

export default ExcelDown;

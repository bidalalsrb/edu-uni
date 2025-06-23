import React, {useState} from "react";
import {Pagination} from "@mui/material";

export const sampleRecordsInit = [
    {
        name: "홍길동",
        major: "컴퓨터공학과",
        studentNumber: "202012345",
        gender: "M",
        phoneNumber: "01012345678",
        appliedAt: "2025-06-10 14:20",
        status: "참석",
    },
    {
        name: "김영희",
        major: "경영학과",
        studentNumber: "202012346",
        gender: "F",
        phoneNumber: "01023456789",
        appliedAt: "2025-06-10 14:35",
        status: "미참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "이철수",
        major: "전자공학과",
        studentNumber: "202012347",
        gender: "M",
        phoneNumber: "01034567890",
        appliedAt: "2025-06-10 15:10",
        status: "참석",
    },
    {
        name: "박지현",
        major: "심리학과",
        studentNumber: "202012348",
        gender: "F",
        phoneNumber: "01045678901",
        appliedAt: "2025-06-10 15:32",
        status: "미참석",
    },
];

function ExcelSearchDetail() {
    // sampleRecordsInit을 상태로 관리 (값 변경용)
    const [records, setRecords] = useState(sampleRecordsInit);

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const totalRecords = records.length;
    const pageCount = Math.ceil(totalRecords / rowsPerPage);

    // 모달 관련
    const [modalOpen, setModalOpen] = useState(false);
    const [modalIdx, setModalIdx] = useState(null);
    const [modalStatus, setModalStatus] = useState(""); // "참석" or "미참석"

    // 현재 페이지 데이터 추출
    const pagedRecords = records.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    // "수정" 버튼 클릭
    const handleEditClick = (indexInPage) => {
        const globalIdx = (page - 1) * rowsPerPage + indexInPage;
        setModalIdx(globalIdx);
        setModalStatus(records[globalIdx].status);
        setModalOpen(true);
    };

    // 모달에서 상태 변경 후 저장
    const handleSaveStatus = () => {
        setRecords((prev) =>
            prev.map((rec, i) =>
                i === modalIdx ? {...rec, status: modalStatus} : rec
            )
        );
        setModalOpen(false);
    };

    return (
        <main className="p-6 flex flex-col gap-6">
            {/* 검색/필터 섹션 */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">AI 박람회 [행사명]</h2>
                {/* 검색 UI 생략 */}
            </section>

            {/* 테이블 섹션 */}
            <section className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">참여자 목록</h3>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >
                        엑셀 다운로드
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold">번호</th>
                            <th className="px-4 py-3 font-semibold">이름</th>
                            <th className="px-4 py-3 font-semibold">학과</th>
                            <th className="px-4 py-3 font-semibold">학번</th>
                            <th className="px-4 py-3 font-semibold">성별</th>
                            <th className="px-4 py-3 font-semibold">핸드폰번호</th>
                            <th className="px-4 py-3 font-semibold">신청시간</th>
                            <th className="px-4 py-3 font-semibold">상태</th>
                            <th className="px-4 py-3 font-semibold">비고</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pagedRecords.length === 0 ? (
                            <tr className="border-b border-gray-100">
                                <td className="px-4 py-3" colSpan="9">
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            pagedRecords.map((record, index) => (
                                <tr key={index} className="border-b border-gray-100">
                                    <td className="px-4 py-3">{(page - 1) * rowsPerPage + index + 1}</td>
                                    <td className="px-4 py-3">{record.name}</td>
                                    <td className="px-4 py-3">{record.major}</td>
                                    <td className="px-4 py-3">{record.studentNumber}</td>
                                    <td className="px-4 py-3">{record.gender}</td>
                                    <td className="px-4 py-3">{record.phoneNumber}</td>
                                    <td className="px-4 py-3">{record.appliedAt}</td>
                                    <td
                                        className={
                                            "px-4 py-3 font-semibold " +
                                            (record.status === "참석"
                                                ? "text-blue-600"
                                                : record.status === "미참석"
                                                    ? "text-red-600"
                                                    : "")
                                        }
                                    >
                                        {record.status}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleEditClick(index)}
                                            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                                        >
                                            수정
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-500">총 {totalRecords}건</div>
                    <div className="flex-1 flex justify-center">
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </div>
            </section>

            {/* 상태 변경 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4">
                        <h4 className="text-lg font-semibold mb-2">참석 상태 변경</h4>
                        <div className="flex gap-4 mb-2">
                            <div className="flex-1 flex justify-center gap-6">
                                <button
                                    className={`px-4 py-2 rounded ${modalStatus === "참석" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                                    onClick={() => setModalStatus("참석")}
                                >
                                    참석
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${modalStatus === "미참석" ? "bg-red-500 text-white" : "bg-gray-100"}`}
                                    onClick={() => setModalStatus("미참석")}
                                >
                                    미참석
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => setModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                                onClick={handleSaveStatus}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ExcelSearchDetail;

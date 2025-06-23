import React, { useState } from "react";

const initialList = [
    {
        id: 1,
        expoName: "AI 박람회",
        counselor: "남상민",
        time: "09:00",
        status: "신청완료",
    },
    {
        id: 2,
        expoName: "빅데이터 박람회",
        counselor: "이영희",
        time: "10:30",
        status: "신청완료",
    },
];

function MyCounselingCancel() {
    const [list, setList] = useState(initialList);

    const handleCancel = (id) => {
        if (window.confirm("정말로 상담을 취소하시겠습니까?")) {
            // 상담을 리스트에서 삭제 (또는 status만 "취소됨"으로 변경해도 됨)
            setList((prev) => prev.filter((item) => item.id !== id));
            // 상태 변경 원하면 아래 코드로 대체
            // setList((prev) => prev.map(item => item.id === id ? {...item, status: "취소됨"} : item));
        }
    };

    return (
        <section className="w-full bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">상담 취소하기</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 border">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 border-b font-semibold">No</th>
                        <th className="px-4 py-2 border-b font-semibold">행사명</th>
                        <th className="px-4 py-2 border-b font-semibold">상담자</th>
                        <th className="px-4 py-2 border-b font-semibold">상담시간</th>
                        <th className="px-4 py-2 border-b font-semibold">현황</th>
                        <th className="px-4 py-2 border-b font-semibold">비고</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.length === 0 ? (
                        <tr>
                            <td className="px-4 py-4 text-center" colSpan={6}>
                                신청한 상담이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        list.map((item, idx) => (
                            <tr key={item.id} className="border-b">
                                <td className="px-4 py-3">{idx + 1}</td>
                                <td className="px-4 py-3">{item.expoName}</td>
                                <td className="px-4 py-3">{item.counselor}</td>
                                <td className="px-4 py-3">{item.time}</td>
                                <td className="px-4 py-3">
                    <span className={item.status === "신청완료"
                        ? "text-blue-600 font-semibold"
                        : "text-red-600 font-semibold"}>
                      {item.status}
                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {item.status === "신청완료" && (
                                        <button
                                            className="px-3 py-1 rounded bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 transition"
                                            onClick={() => handleCancel(item.id)}
                                        >
                                            취소하기
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default MyCounselingCancel;

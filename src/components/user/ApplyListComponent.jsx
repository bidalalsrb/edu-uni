import React from "react";
import JoinItem from "./JoinItem.jsx";

function ApplyListCom() {
    // 예시 데이터
    const joinItems = [
        {
            id: 1,
            title: "코엑스웨딩박람회",
            accordion: true,
            details: {
                expoName: "코엑스웨딩박람회",
                teacher: "남상민",
                time: "2025-02-14",
                attendance: "참석",
            },
        },
        {
            id: 2,
            title: "인터컨, 웨딩",
            accordion: true,
            details: {
                expoName: "인터컨, 웨딩",
                teacher: "김하나",
                time: "2025-03-20",
                attendance: "불참석",
            },
        },
        {
            id: 3,
            title: "맞춤 신청3",
            accordion: true,
            details: {
                expoName: "웨딩박람회3",
                teacher: "이둘",
                time: "2025-04-01",
                attendance: "대기중",
            },
        },
        {
            id: 4,
            title: "맞춤 신청4",
            accordion: true,
            details: {
                expoName: "웨딩박람회4",
                teacher: "박셋",
                time: "2025-04-10",
                attendance: "참석",
            },
        },
    ];

    // 데이터로 참석/미참석/대기중 카운트
    const attendCount = joinItems.filter(item => item.details.attendance === "참석").length;
    const absentCount = joinItems.filter(item => item.details.attendance === "불참석").length;
    const pendingCount = joinItems.filter(item => item.details.attendance === "대기중").length;

    // 참석율 계산 (참석 + 불참석만 대상으로)
    const totalCount = attendCount + absentCount;
    const attendanceRate = totalCount > 0 ? Math.round((attendCount / totalCount) * 100) : 0;
    const gaugeLength = 314; // 원 둘레
    const offset = gaugeLength - (gaugeLength * attendanceRate / 100);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto min-h-screen bg-white shadow-md rounded-md">
                <main className="p-4 space-y-6">
                    <div className="p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-center text-2xl font-bold mb-4">박람회 참석 내역</h2>
                        {/* 게이지 & 점수 영역 */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative">
                                <svg className="w-40 h-40" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="10"
                                        strokeDasharray={gaugeLength}
                                        strokeDashoffset={offset}
                                        strokeLinecap="round"
                                        style={{ transition: "stroke-dashoffset 0.5s" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-900">{attendanceRate}%</span>
                                    <span className="text-xs text-gray-400 mt-1">참석율</span>
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-2">
                                <div className="text-sm text-blue-500">
                                    참석 <span className="font-semibold">{attendCount}건</span>
                                </div>
                                <div className="text-sm text-red-500">
                                    불참석 <span className="font-semibold">{absentCount}건</span>
                                </div>
                                <div className="text-sm text-green-600">
                                    대기중 <span className="font-semibold">{pendingCount}건</span>
                                </div>
                            </div>
                        </div>
                        {/* 아코디언 목록 */}
                        <div className="mt-6 space-y-2">
                            {joinItems.map((item) => (
                                <JoinItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ApplyListCom;

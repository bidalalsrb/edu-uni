// pages/user/ApplyListComponent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import JoinItem from "./JoinItem.jsx"; // 파일 경로에 맞게 조정
import logo from "/public/bultiger.png";

function ApplyListCom() {
    // 예시 데이터 (참석 내역 리스트)
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
                attendance: "참석",
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
                attendance: "불참석",
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

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* 내부 컨테이너: JoinList와 동일한 디자인 */}
            <div className="max-w-4xl mx-auto min-h-screen bg-white shadow-md rounded-md">
                {/* 헤더 */}
                <header className="relative border-b p-4 flex items-center justify-center">
                    <img src={logo} alt="logo" className="w-60 object-contain" />
                    <button
                        onClick={handleLogout}
                        className="absolute right-4 top-4 px-4 py-2 bg-red-500 text-white font-semibold rounded"
                    >
                        로그아웃
                    </button>
                </header>
                {/* 메인 컨텐츠: 참석 내역 리스트 */}
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
                                        strokeDasharray="314"
                                        strokeDashoffset="50"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-900">90%</span>
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-2">
                                <div className="text-sm text-gray-500">
                                    참석 <span className="font-semibold">4건</span>
                                </div>
                                <div className="text-sm text-red-500">
                                    미참석 <span className="font-semibold">1건</span>
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

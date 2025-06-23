import React, { useState } from "react";
import {
    BellIcon,
    CalendarDaysIcon,
    QuestionMarkCircleIcon,
    GiftIcon,
    UserGroupIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

function MyPageList() {
    // 예시 데이터(실제 유저 정보 fetch/props로 대체 가능)
    const user = {
        name: "홍길동",
        email: "rendisdream123@naver.com",
    };

    // 메뉴 배열로 관리 (icon, label, path)
    const menuList = [
        // {
        //     icon: <CalendarDaysIcon className="w-7 h-7 text-blue-500"/>,
        //     label: "행사 일정",
        //     path: "/notice",
        // },
        {
            icon: <GiftIcon className="w-7 h-7 text-blue-500"/>,
            label: "참석 현황",
            path: "/myappendlist",
        },
        {
            icon: <QuestionMarkCircleIcon className="w-7 h-7 text-blue-500"/>,
            label: "학교코드",
            path: "/friend",
        },
        {
            icon: <UserGroupIcon className="w-7 h-7 text-blue-500"/>,
            label: "계정 정보",
            path: "/myaccount",
        },
    ];

    // 상담 현황(테이블) 데이터
    const [consultList, setConsultList] = useState([
        {
            id: 1,
            expoName: "AI박람회",
            counselor: "남상민",
            date: "250333",
            time: "09:00",
            status: "신청완료",
        },   {
            id: 13,
            expoName: "AI박람회",
            counselor: "남상민",
            date: "250333",
            time: "09:00",
            status: "신청완료",
        },   {
            id: 121,
            expoName: "AI박람회",
            counselor: "남상민",
            date: "250333",
            time: "09:00",
            status: "신청완료",
        },   {
            id: 132,
            expoName: "AI박람회",
            counselor: "남상민",
            date: "250333",
            time: "09:00",
            status: "신청완료",
        },   {
            id: 3,
            expoName: "AI박람회",
            counselor: "남상민",
            date: "250333",
            time: "09:00",
            status: "신청완료",
        },

    ]);

    // 상담 취소하기
    const handleCancel = (id) => {
        if (window.confirm("정말 상담을 취소하시겠습니까?")) {
            setConsultList(prev =>
                    prev.filter(item => item.id !== id)
                // 또는 status만 바꾸려면:
                // prev.map(item => item.id === id ? {...item, status: "취소됨"} : item)
            );
        }
    };

    // 네비게이션 (SPA라면 useNavigate 사용 권장)
    const navigate = (path) => {
        window.location.href = path;
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-12">
            {/* 상단 프로필 */}
            <section className="bg-white rounded-b-3xl shadow px-6 py-6 relative">
                <div className="flex flex-col items-center mt-2">
                    <UserCircleIcon className="w-16 h-16 text-gray-300"/>
                    <div className="mt-2 text-lg font-bold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                </div>
            </section>

            {/* 메뉴 그리드 */}
            <section className="bg-white mt-4 mx-2 rounded-2xl shadow p-4">
                <div className="grid grid-cols-3 gap-2">
                    {menuList.map((m, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(m.path)}
                            className="flex flex-col items-center py-4 hover:bg-gray-50 rounded-lg transition"
                        >
                            {m.icon}
                            <span className="mt-2 text-xs text-gray-700">{m.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* 신청 현황 + 상담 취소하기 */}
            <section className="mt-6 mx-2">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-gray-800">신청 현황</span>
                </div>
                <div className="overflow-x-auto bg-white rounded-2xl shadow">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 font-semibold">No</th>
                            <th className="px-3 py-2 font-semibold">행사명</th>
                            <th className="px-3 py-2 font-semibold">상담자</th>
                            <th className="px-3 py-2 font-semibold">상담날짜</th>
                            <th className="px-3 py-2 font-semibold">상담시간</th>
                            <th className="px-3 py-2 font-semibold">현황</th>
                            <th className="px-3 py-2 font-semibold">비고</th>
                        </tr>
                        </thead>
                        <tbody className="items-center">
                        {consultList.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="py-8 text-gray-400 text-center">신청한 상담이 없습니다.</td>
                            </tr>
                        ) : (
                            consultList.map((item, idx) => (
                                <tr key={item.id} className="border-b text-center">
                                    <td className="px-3 py-3">{idx + 1}</td>
                                    <td className="px-3 py-3">{item.expoName}</td>
                                    <td className="px-3 py-3">{item.counselor}</td>
                                    <td className="px-3 py-3">{item.date}</td>
                                    <td className="px-3 py-3">{item.time}</td>
                                    <td className="px-3 py-3">
                                            <span className={item.status === "신청완료"
                                                ? "text-blue-600 font-semibold"
                                                : "text-red-600 font-semibold"}>
                                                {item.status}
                                            </span>
                                    </td>
                                    <td className="px-3 py-3">
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
        </main>
    );
}

export default MyPageList;

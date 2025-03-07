import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OpenExpo() {
    const navigate = useNavigate();
    const [boxes, setBoxes] = useState([]);

    // 로컬 스토리지에서 박스배치도 데이터를 불러오는 함수
    const loadLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            const savedLayout = localStorage.getItem("layout_" + storedUser.id);
            if (savedLayout) {
                const layout = JSON.parse(savedLayout);
                return layout.boxes || [];
            }
        }
        return [];
    };

    useEffect(() => {
        setBoxes(loadLayout());
    }, []);

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-center text-2xl font-bold mb-4">오픈 박람회</h2>
            {boxes.length > 0 ? (
                boxes.map((box) => {
                    // 학교 박스라면 box.school 값이 존재할 것입니다.
                    const title = box.school || box.companyName || "제목없음";
                    let subInfo = "";
                    if (box.school) {
                        // 학교 박스의 경우 등록 리스트에 저장된 시간과 강사 정보를 사용
                        subInfo = `${box.time || "시간 없음"} ${box.teacher || "강사 없음"}`;
                    } else {
                        // 기업 박스인 경우 기본 정보(예: 신청 건수) 출력
                        subInfo =
                            box.applications && box.applications.length > 0
                                ? `신청 건수: ${box.applications.length}`
                                : "정보 없음";
                    }
                    return (
                        <div
                            key={box.id}
                            className="border rounded-md p-4 hover:bg-gray-50 transition mb-2"
                        >
                            {/* 첫 줄: 학교명 (또는 기업명) */}
                            <h3 className="text-lg font-semibold text-gray-800">
                                {title}
                            </h3>
                            {/* 두 번째 줄: 등록 리스트에 있는 시간, 강사 정보 */}
                            <p className="text-sm text-gray-600">{subInfo}</p>
                            <button
                                onClick={() =>
                                    navigate("/apply", { state: { expoId: box.id } })
                                }
                                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                신청하기
                            </button>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-sm text-gray-500">
                    저장된 박스 배치도가 없습니다.
                </p>
            )}
        </div>
    );
}

export default OpenExpo;

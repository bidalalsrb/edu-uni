import React, {useState} from "react";
import {PlusIcon, MinusIcon} from "@heroicons/react/24/solid";

function JoinItem({item, onCancel}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => setIsOpen(!isOpen);

    // 상태별 스타일
    let badgeStyle = "";
    let badgeLabel = item.details.attendance;
    if (badgeLabel === "참석") badgeStyle = "bg-blue-100 text-blue-500";
    else if (badgeLabel === "불참석") badgeStyle = "bg-red-100 text-red-500";
    else if (badgeLabel === "대기중") badgeStyle = "bg-green-100 text-green-600";

    return (
        <div className="border-b py-4">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={toggleAccordion}
            >
                <h2 className="text-base font-semibold text-gray-800">{item.title}</h2>
                {isOpen ? (
                    <MinusIcon className="w-5 h-5 text-gray-600"/>
                ) : (
                    <PlusIcon className="w-5 h-5 text-gray-600"/>
                )}
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-40 mt-2" : "max-h-0"
                }`}
            >
                <div className="text-sm text-gray-600">
                    {item.accordion ? (
                        <>
                            <div className="mb-1">
                                <span className="font-semibold">박람회 이름:</span> {item.details.expoName}
                            </div>
                            <div className="mb-1">
                                <span className="font-semibold">담당 강사:</span> {item.details.teacher}
                                <span className="ml-4 font-semibold">시간:</span> {item.details.time}
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold">참석/불참석:</span>
                                <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${badgeStyle}`}>
                  {badgeLabel}
                </span>
                                {badgeLabel === "대기중" && (
                                    <button
                                        onClick={onCancel ? () => onCancel(item.id) : undefined}
                                        className="ml-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-xs text-gray-700 font-semibold transition"
                                        onClick={() => alert("상담이 취소되었습니다.")}
                                    >
                                        취소하기
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>단순 텍스트 또는 다른 내용</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JoinItem;

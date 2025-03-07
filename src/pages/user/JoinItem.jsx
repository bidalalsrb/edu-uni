import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

function JoinItem({ item }) {
    const [isOpen, setIsOpen] = useState(false);

    // 아코디언 열림/닫힘
    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="border-b py-4">
            {/* 질문 영역 (왼쪽 정렬) */}
            <div
                className="flex items-center justify-between cursor-pointer text-left"
                onClick={toggleAccordion}
            >
                <h2 className="text-base font-semibold text-gray-800">
                    {item.title}
                </h2>
                {isOpen ? (
                    <MinusIcon className="w-5 h-5 text-gray-600" />
                ) : (
                    <PlusIcon className="w-5 h-5 text-gray-600" />
                )}
            </div>

            {/* 답변 영역 (왼쪽 정렬) */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-40 mt-2" : "max-h-0"
                }`}
            >
                <div className="text-sm text-gray-600 text-left">
                    {item.accordion ? (
                        <>
                            <div className="mb-1">
                                <span className="font-semibold">박람회 이름:</span>{" "}
                                {item.details.expoName}
                            </div>
                            <div className="mb-1">
                                <span className="font-semibold">담당 강사:</span>{" "}
                                {item.details.teacher}
                                <span className="ml-4 font-semibold">시간:</span>{" "}
                                {item.details.time}
                            </div>
                            <div>
                                <span className="font-semibold">참석/불참석:</span>{" "}
                                {item.details.attendance}
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

import React from "react";
import { useDrop } from "react-dnd";
import DraggableBox from "./DraggableBox.jsx";
import { ItemTypes } from "./constants.js";
import { XMarkIcon } from "@heroicons/react/24/solid";

function GridCell({ row, col, box, onDropToGrid, onOpenSettings, onDelete }) {
    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({ row, col }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    // 셀 배경 색상 적용
    const bgColor = isOver ? "bg-blue-100" : "bg-white";

    // 셀을 더블클릭 시 박스가 있을 경우 모달 열기
    const handleDoubleClick = () => {
        if (box) {
            onOpenSettings(box);
        }
    };

    return (
        <div
            ref={dropRef}
            onClick={handleDoubleClick}
            className={`border-dotted border border-gray-300 h-20 w-full flex items-center justify-center relative ${bgColor}`}
        >
            {box && (
                <>
                    <DraggableBox box={box} onDropToGrid={onDropToGrid} />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(box.id);
                        }}
                        className="absolute top-1 right-1"
                    >
                        <XMarkIcon className="w-5 h-5 text-gray-500" />
                    </button>
                </>
            )}
        </div>
    );
}

export default GridCell;

// GridCell.jsx
import React from "react";
import { useDrop } from "react-dnd";
import DraggableBox from "./DraggableBox";
import { ItemTypes } from "./constants";
import { CogIcon } from "@heroicons/react/24/solid";

function GridCell({ row, col, box, onDropToGrid, onOpenSettings }) {
    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({ row, col }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    // 점선 테두리와 연한 색상의 배경 적용
    const bgColor = isOver ? "bg-blue-100" : "bg-white";

    return (
        <div
            ref={dropRef}
            className={`border-dotted border border-gray-300 h-20 w-full flex items-center justify-center relative ${bgColor}`}
        >
            {box && (
                <>
                    <DraggableBox box={box} onDropToGrid={onDropToGrid} />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenSettings(box);
                        }}
                        className="absolute bottom-1 right-1"
                    >
                        <CogIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </>
            )}
        </div>
    );
}

export default GridCell;

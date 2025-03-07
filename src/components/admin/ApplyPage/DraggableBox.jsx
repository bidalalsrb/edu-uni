import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants.js";

function DraggableBox({ box, onDropToGrid }) {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.BOX,
        item: { ...box },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onDropToGrid(item.id, dropResult.row, dropResult.col);
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div
            ref={dragRef}
            className="border rounded-lg p-2 shadow-md cursor-move w-full h-full flex flex-col items-center justify-center bg-white"
            style={{
                opacity,
                backgroundColor: box.color || "#ffffff",
            }}
        >
            <div className="text-sm font-semibold text-gray-800">
                {box.companyName || box.school}
            </div>
            {/* 필요 시 추가 정보 영역 */}
        </div>
    );
}

export default DraggableBox;

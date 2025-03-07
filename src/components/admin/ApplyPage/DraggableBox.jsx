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
            className="border rounded p-2 shadow cursor-move w-full h-full flex flex-col items-center justify-center"
            style={{
                opacity,
                "--box-color": box.color || "#ffffff",
                backgroundColor: "var(--box-color)",
            }}
        >
            <div className="font-semibold text-sm">
                {box.companyName || box.school}
            </div>
            {/* 추가 정보가 필요하면 여기에 표시 */}
        </div>
    );
}

export default DraggableBox;

// DraggableBox.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./constants";

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
            <div className="font-semibold text-sm">{box.school}</div>
            <div className="text-xs text-gray-700">
                날짜: {box.time} / 강사: {box.teacher}
            </div>
        </div>
    );
}

export default DraggableBox;

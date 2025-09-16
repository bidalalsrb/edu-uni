import React, {useEffect} from "react";
import {useDrag} from "react-dnd";
import {ItemTypes} from "./constants.js";

function DraggableBox({box, onDropToGrid}) {
    const [{isDragging}, dragRef] = useDrag({
        type: ItemTypes.BOX,
        item: {...box},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onDropToGrid(item.id, dropResult.rowNum, dropResult.colNum);
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.5 : 1;
    useEffect(() => {
        console.log("1111111", box)
    })
    return (
        <div
            ref={dragRef}
            className="border rounded-lg p-2 shadow-md cursor-move w-full h-full flex flex-col items-center justify-center bg-white"
            style={{
                opacity,
                backgroundColor: box.blockColor || "#ffffff",
            }}
        >
            <div className="text-sm font-semibold text-gray-800">
                {box.eventName || '이름없음'}
            </div>
            {/* 필요 시 추가 정보 영역 */}
        </div>
    );
}

export default DraggableBox;

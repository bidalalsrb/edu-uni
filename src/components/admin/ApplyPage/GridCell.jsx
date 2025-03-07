import React from "react";
import { useDrop } from "react-dnd";
import DraggableBox from "./DraggableBox.jsx";
import { ItemTypes } from "./constants.js";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

function GridCell({ row, col, box, onDropToGrid, onOpenEdit, onOpenList, onDelete }) {
    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.BOX,
        drop: () => ({ row, col }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const bgColor = isOver ? "bg-blue-100" : "bg-white";

    return (
        <div
            ref={dropRef}
            onClick={() => {
                if (box) onOpenList(box);
            }}
            className={`border rounded-lg border-dashed border-gray-300 h-20 w-full flex items-center justify-center relative ${bgColor} transition-all duration-200`}
        >
            {box && (
                <>
                    <DraggableBox box={box} onDropToGrid={onDropToGrid} />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(box.id);
                        }}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenEdit(box);
                        }}
                        className="absolute bottom-1 right-1 text-gray-500 hover:text-gray-700"
                    >
                        <Cog6ToothIcon className="w-5 h-5" />
                    </button>
                </>
            )}
        </div>
    );
}

export default GridCell;

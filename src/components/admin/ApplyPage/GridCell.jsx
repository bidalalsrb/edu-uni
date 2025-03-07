import React from "react";
import { useDrop } from "react-dnd";
import DraggableBox from "./DraggableBox.jsx";
import { ItemTypes } from "./constants.js";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

function GridCell({ row, col, box, onDropToGrid, onOpenEdit, onDelete }) {
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
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenEdit(box);
                        }}
                        className="absolute bottom-1 right-1"
                    >
                        <Cog6ToothIcon className="w-5 h-5 text-gray-500" />
                    </button>
                </>
            )}
        </div>
    );
}

export default GridCell;

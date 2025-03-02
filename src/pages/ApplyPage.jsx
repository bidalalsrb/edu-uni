import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CogIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ItemTypes = {
    BOX: "box",
};

// 예시 색상 팔레트 (원하는 만큼 추가)
const COLOR_PALETTE = [
    "#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6",
    "#ff0000", "#ff7f00", "#ffff00", "#00ff00",
    "#0000ff", "#8b00ff", "#ff1493", "#ff69b4",
    "#808080", "#000000", "#ffb6c1", "#ffc0cb",
    "#ffa500", "#ffd700", "#90ee90", "#add8e6",
    "#ffa07a", "#b0e0e6", "#d3d3d3", "#d8bfd8",
    "#fa8072", "#f08080", "#ba55d3", "#9370db",
    // ... 더 추가 가능
];

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
            <div className="font-semibold text-sm">{box.title}</div>
            <div className="text-xs text-gray-600">{box.content}</div>
        </div>
    );
}

function GridCell({ row, col, box, onDropToGrid, onOpenSettings }) {
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
            className={`border h-20 w-full flex items-center justify-center relative ${bgColor}`}
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

export default function ApplyPage() {
    const ROW_COUNT = 5;
    const COL_COUNT = 8;
    const [boxes, setBoxes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 추가하기 모달용
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalColor, setModalColor] = useState("#ffffff");

    // 설정 모달용
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [editingBox, setEditingBox] = useState(null);

    const navigate = useNavigate();

    // 추가하기 모달 열기/닫기
    const openModal = () => {
        setModalTitle("");
        setModalContent("");
        setModalColor("#ffffff");
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    // 박스 설정 모달 열기/닫기
    const openSettingsModal = (box) => {
        setEditingBox(box);
        setIsSettingsModalOpen(true);
    };
    const closeSettingsModal = () => {
        setEditingBox(null);
        setIsSettingsModalOpen(false);
    };

    // 추가하기 모달 → 박스 생성
    const handleModalSubmit = () => {
        if (!modalTitle.trim()) {
            alert("제목을 입력하세요.");
            return;
        }
        const newBox = {
            id: Date.now(),
            title: modalTitle,
            content: modalContent,
            placed: false,
            row: null,
            col: null,
            color: modalColor,
        };
        setBoxes((prev) => [...prev, newBox]);
        closeModal();
    };

    // 설정 모달 → 박스 수정
    const handleSettingsSubmit = () => {
        if (!editingBox.title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }
        setBoxes((prev) =>
            prev.map((b) => (b.id === editingBox.id ? editingBox : b))
        );
        closeSettingsModal();
    };

    // 그리드 드롭 로직 (자리 교환 포함)
    const onDropToGrid = (boxId, row, col) => {
        setBoxes((prev) => {
            const droppedBox = prev.find((b) => b.id === boxId);
            const targetBox = prev.find(
                (b) => b.placed && b.row === row && b.col === col
            );
            if (targetBox && droppedBox.placed) {
                // 자리 교환
                return prev.map((b) => {
                    if (b.id === boxId) {
                        return { ...b, row, col };
                    } else if (b.id === targetBox.id) {
                        return { ...b, row: droppedBox.row, col: droppedBox.col };
                    }
                    return b;
                });
            } else if (!targetBox) {
                // 빈 칸이면 배치
                return prev.map((b) =>
                    b.id === boxId ? { ...b, placed: true, row, col } : b
                );
            } else {
                alert("해당 칸은 이미 박스가 있습니다.");
                return prev;
            }
        });
    };

    // joinList 이동
    const handleJoinListNavigate = () => {
        navigate("/joinList");
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-100 min-h-screen p-6">
                <h2 className="text-xl font-bold text-center mb-4">/apply 페이지</h2>

                {/* 격자 레이아웃 */}
                <div className="grid grid-rows-5 grid-cols-8 gap-1 border">
                    {Array.from({ length: ROW_COUNT }).map((_, row) =>
                        Array.from({ length: COL_COUNT }).map((__, col) => {
                            const placedBox = boxes.find(
                                (b) => b.placed && b.row === row && b.col === col
                            );
                            return (
                                <GridCell
                                    key={`${row}-${col}`}
                                    row={row}
                                    col={col}
                                    box={placedBox}
                                    onDropToGrid={onDropToGrid}
                                    onOpenSettings={openSettingsModal}
                                />
                            );
                        })
                    )}
                </div>

                {/* 하단 영역 */}
                <div className="flex justify-between items-start mt-4">
                    {/* 인벤토리 */}
                    <div>
                        <h3 className="font-semibold mb-2">인벤토리</h3>
                        <div className="bg-white p-2 border rounded min-h-[100px] w-[150px]">
                            {boxes.filter((b) => !b.placed).length > 0 ? (
                                boxes
                                    .filter((b) => !b.placed)
                                    .map((box) => (
                                        <div key={box.id} className="mb-2">
                                            <DraggableBox box={box} onDropToGrid={onDropToGrid} />
                                        </div>
                                    ))
                            ) : (
                                <p className="text-sm text-gray-500">비어있음</p>
                            )}
                        </div>
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={openModal}
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow"
                        >
                            추가하기
                        </button>
                        <button
                            onClick={handleJoinListNavigate}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow"
                        >
                            joinList 이동하기
                        </button>
                    </div>
                </div>

                {/* 추가하기 모달 */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-md w-80">
                            <h3 className="text-lg font-bold mb-2">박스 생성</h3>
                            <label className="block text-sm font-semibold mb-1">제목</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mb-3"
                                value={modalTitle}
                                onChange={(e) => setModalTitle(e.target.value)}
                            />
                            <label className="block text-sm font-semibold mb-1">내용</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mb-3"
                                value={modalContent}
                                onChange={(e) => setModalContent(e.target.value)}
                            />

                            {/* 색상 팔레트 */}
                            <label className="block text-sm font-semibold mb-1">박스 색상</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {COLOR_PALETTE.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() => setModalColor(c)}
                                        className={`w-6 h-6 rounded-full border ${
                                            modalColor === c ? "border-black" : "border-transparent"
                                        }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleModalSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    완료하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 박스 설정 모달 */}
                {isSettingsModalOpen && editingBox && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-md w-80">
                            <h3 className="text-lg font-bold mb-2">박스 설정</h3>
                            <label className="block text-sm font-semibold mb-1">제목</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mb-3"
                                value={editingBox.title}
                                onChange={(e) =>
                                    setEditingBox({ ...editingBox, title: e.target.value })
                                }
                            />
                            <label className="block text-sm font-semibold mb-1">내용</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mb-3"
                                value={editingBox.content}
                                onChange={(e) =>
                                    setEditingBox({ ...editingBox, content: e.target.value })
                                }
                            />

                            {/* 색상 팔레트 */}
                            <label className="block text-sm font-semibold mb-1">박스 색상</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {COLOR_PALETTE.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        onClick={() =>
                                            setEditingBox({ ...editingBox, color: c })
                                        }
                                        className={`w-6 h-6 rounded-full border ${
                                            editingBox.color === c ? "border-black" : "border-transparent"
                                        }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={closeSettingsModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSettingsSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    완료하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DndProvider>
    );
}

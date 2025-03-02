import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { COLOR_PALETTE } from "../components/ApplyPage/constants";
import GridCell from "../components/ApplyPage/GridCell";
import DraggableBox from "../components/ApplyPage/DraggableBox";
import CreateBoxModal from "../components/ApplyPage/CreateBoxModal";
import EditBoxModal from "../components/ApplyPage/EditBoxModal";

export default function ApplyPage() {
    const ROW_COUNT = 5;
    const COL_COUNT = 8;
    const [boxes, setBoxes] = useState([]);

    // 생성 모달 상태
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    // 수정 모달 상태
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingBox, setEditingBox] = useState(null);

    const navigate = useNavigate();

    // 생성 모달 열기/닫기
    const openCreateModal = () => setIsCreateOpen(true);
    const closeCreateModal = () => setIsCreateOpen(false);

    // 수정 모달 열기/닫기
    const openEditModal = (box) => {
        setEditingBox(box);
        setIsEditOpen(true);
    };
    const closeEditModal = () => {
        setEditingBox(null);
        setIsEditOpen(false);
    };

    // 새 박스 생성
    const handleCreateBox = ({ school, time, teacher, color }) => {
        const newBox = {
            id: Date.now(),
            placed: false,
            row: null,
            col: null,
            school,
            time,
            teacher,
            color,
        };
        setBoxes((prev) => [...prev, newBox]);
        closeCreateModal();
    };

    // 박스 수정
    const handleUpdateBox = (updated) => {
        setBoxes((prev) =>
            prev.map((b) => (b.id === updated.id ? updated : b))
        );
        closeEditModal();
    };

    // 박스 삭제
    const handleDeleteBox = (boxId) => {
        setBoxes((prev) => prev.filter((b) => b.id !== boxId));
    };

    // 그리드 드롭 (자리 교환 포함)
    const onDropToGrid = (boxId, row, col) => {
        setBoxes((prev) => {
            const droppedBox = prev.find((b) => b.id === boxId);
            const targetBox = prev.find(
                (b) => b.placed && b.row === row && b.col === col
            );
            if (targetBox && droppedBox.placed) {
                // 두 박스 자리 교환
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
                <h2 className="text-xl font-bold text-center mb-4">박스 배치도 관리자전용</h2>

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
                                    onOpenSettings={openEditModal}
                                    onDelete={handleDeleteBox}
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
                            onClick={openCreateModal}
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

                {/* 박스 생성 모달 */}
                <CreateBoxModal
                    isOpen={isCreateOpen}
                    onClose={closeCreateModal}
                    onSubmit={handleCreateBox}
                    colorPalette={COLOR_PALETTE}
                />

                {/* 박스 설정 모달 */}
                <EditBoxModal
                    isOpen={isEditOpen}
                    onClose={closeEditModal}
                    box={editingBox}
                    onSubmit={handleUpdateBox}
                    colorPalette={COLOR_PALETTE}
                />
            </div>
        </DndProvider>
    );
}

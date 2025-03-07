import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { COLOR_PALETTE } from "../../components/admin/ApplyPage/constants.js";
import GridCell from "../../components/admin/ApplyPage/GridCell.jsx";
import DraggableBox from "../../components/admin/ApplyPage/DraggableBox.jsx";
import CreateCompanyBoxModal from "../../components/admin/ApplyPage/CreateCompanyBoxModal.jsx";
import CompanyListModal from "../../components/admin/ApplyPage/CompanyListModal.jsx";

export default function ApplyPage() {
    const ROW_COUNT = 5;
    const COL_COUNT = 8;
    const [boxes, setBoxes] = useState([]);
    // 선택된 박스의 id만 저장
    const [selectedBoxId, setSelectedBoxId] = useState(null);
    const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
    const [isCompanyListModalOpen, setIsCompanyListModalOpen] = useState(false);

    const navigate = useNavigate();

    // 기업 박스 생성 모달 열기/닫기
    const openCreateCompanyModal = () => setIsCreateCompanyOpen(true);
    const closeCreateCompanyModal = () => setIsCreateCompanyOpen(false);

    // 새 기업 박스 생성 시 각 박스에 개별 신청 내역 배열을 초기값으로 추가
    const handleCreateCompanyBox = ({ companyName, color }) => {
        const newBox = {
            id: Date.now(),
            placed: false,
            row: null,
            col: null,
            companyName,
            color,
            applications: [] // 각 박스별 신청 내역
        };
        setBoxes((prev) => [...prev, newBox]);
        closeCreateCompanyModal();
    };

    // 그리드 드롭 (자리 배치 및 교환)
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

    // 기업 리스트 모달 열기 (더블클릭 시, 해당 박스의 id 저장)
    const openCompanyListModal = (box) => {
        setSelectedBoxId(box.id);
        setIsCompanyListModalOpen(true);
    };
    const closeCompanyListModal = () => {
        setSelectedBoxId(null);
        setIsCompanyListModalOpen(false);
    };

    // 특정 박스의 신청 내역 업데이트 (박스의 id를 기준으로 업데이트)
    const handleSubmitApplication = (boxId, newApplication) => {
        setBoxes((prev) =>
            prev.map((box) =>
                box.id === boxId
                    ? { ...box, applications: [...(box.applications || []), newApplication] }
                    : box
            )
        );
    };

    // joinList 이동
    const handleJoinListNavigate = () => {
        navigate("/joinList");
    };

    // 선택된 박스 데이터를 항상 최신 상태로 가져오기
    const selectedCompanyBox = boxes.find((box) => box.id === selectedBoxId);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-100 min-h-screen p-6">
                <h2 className="text-xl font-bold text-center mb-4">
                    박스 배치도 관리자 전용
                </h2>

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
                                    onOpenSettings={openCompanyListModal} // 더블클릭 시 해당 박스의 id를 저장
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
                            onClick={openCreateCompanyModal}
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

                {/* 기업 박스 생성 모달 */}
                <CreateCompanyBoxModal
                    isOpen={isCreateCompanyOpen}
                    onClose={closeCreateCompanyModal}
                    onSubmit={handleCreateCompanyBox}
                    colorPalette={COLOR_PALETTE}
                />

                {/* 기업 리스트 모달 (선택된 박스의 신청 내역 표시) */}
                {selectedCompanyBox && (
                    <CompanyListModal
                        isOpen={isCompanyListModalOpen}
                        onClose={closeCompanyListModal}
                        companyBox={selectedCompanyBox}
                        onSubmitApplication={handleSubmitApplication}
                    />
                )}
            </div>
        </DndProvider>
    );
}

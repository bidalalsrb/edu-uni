import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GridCell from "../../components/admin/ApplyPage/GridCell.jsx";
import DraggableBox from "../../components/admin/ApplyPage/DraggableBox.jsx";
import CellAdjustModal from "../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";
import CompanyListModal from "../../components/admin/ApplyPage/modal/CompanyListModal.jsx";
import CreateCompanyBoxModal from "../../components/admin/ApplyPage/modal/CreateCompanyBoxModal.jsx";
import { COLOR_PALETTE } from "../../components/admin/ApplyPage/constants.js";

export default function ApplyPage({ record }) {
    // 상태
    const [rowCount, setRowCount] = useState(5);
    const [colCount, setColCount] = useState(5);
    const [boxes, setBoxes] = useState([]); // 기업 박스 목록 (배치정보 포함)
    const [isCellAdjustModalOpen, setIsCellAdjustModalOpen] = useState(false);
    const [isCreateBoxModalOpen, setIsCreateBoxModalOpen] = useState(false);
    const [selectedCompanyBox, setSelectedCompanyBox] = useState(null);
    const [isCompanyListModalOpen, setIsCompanyListModalOpen] = useState(false);

    // 기업 박스 생성
    const handleCreateBox = ({ companyName, color }) => {
        const newBox = {
            id: Date.now(),
            companyName,
            color,
            applications: [],
            placed: false, // 미배치 상태
            row: null,
            col: null,
        };
        setBoxes([...boxes, newBox]);
        setIsCreateBoxModalOpen(false);
    };

    // 박스를 그리드에 드롭
    const handleDropToGrid = (id, row, col) => {
        setBoxes(prevBoxes => {
            // 좌표에 이미 박스 있으면 교환
            const targetBox = prevBoxes.find(b => b.placed && b.row === row && b.col === col);
            return prevBoxes.map(box => {
                if (box.id === id) {
                    return { ...box, placed: true, row, col };
                }
                // 이미 그 위치에 있던 박스는 인벤토리로
                if (targetBox && box.id === targetBox.id) {
                    return { ...box, placed: false, row: null, col: null };
                }
                return box;
            });
        });
    };

    // 셀에서 박스 제거
    const handleDeleteBoxFromGrid = (boxId) => {
        setBoxes(prevBoxes =>
            prevBoxes.map(box =>
                box.id === boxId
                    ? { ...box, placed: false, row: null, col: null }
                    : box
            )
        );
    };

    // 박스 관리 모달
    const handleOpenCompanyListModal = (box) => {
        setSelectedCompanyBox(box);
        setIsCompanyListModalOpen(true);
    };
    const handleCloseCompanyListModal = () => {
        setSelectedCompanyBox(null);
        setIsCompanyListModalOpen(false);
    };

    // 박스별 신청 내역 추가
    const handleSubmitApplication = (boxId, newApplication) => {
        setBoxes(prevBoxes =>
            prevBoxes.map(box =>
                box.id === boxId
                    ? { ...box, applications: [...(box.applications || []), newApplication] }
                    : box
            )
        );
    };

    // 행/열 조정
    const handleApplyCellAdjust = (newRows, newCols) => {
        setRowCount(newRows);
        setColCount(newCols);
        setIsCellAdjustModalOpen(false);
        // 넘치는 위치 박스는 인벤토리로 내림
        setBoxes(prev =>
            prev.map(b =>
                b.placed && (b.row >= newRows || b.col >= newCols)
                    ? { ...b, placed: false, row: null, col: null }
                    : b
            )
        );
    };

    // 인벤토리(미배치 박스)
    const inventoryBoxes = boxes.filter(b => !b.placed);

    // 그리드 셀 생성
    const gridCells = [];
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            const box = boxes.find(b => b.placed && b.row === row && b.col === col);
            gridCells.push(
                <GridCell
                    key={`${row}-${col}`}
                    row={row}
                    col={col}
                    box={box}
                    onDropToGrid={handleDropToGrid}
                    onDelete={handleDeleteBoxFromGrid}
                    onOpenList={handleOpenCompanyListModal}
                />
            );
        }
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-4">
                {/* 상단 버튼바 */}
                <div className="mb-4 flex gap-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => setIsCellAdjustModalOpen(true)}
                    >
                        셀 추가/삭제
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => setIsCreateBoxModalOpen(true)}
                    >
                        기업 박스 생성
                    </button>
                </div>

                {/* 그리드 */}
                <div
                    className="grid gap-1 border p-2 bg-white rounded-md shadow"
                    style={{
                        gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
                        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`
                    }}
                >
                    {gridCells}
                </div>
                {/* 인벤토리: 하단 */}
                <div className="bg-white p-4 border rounded-md shadow-md mt-6 w-1/12 flex flex-wrap gap-2 justify-center">
                    <h3 className="font-semibold mb-2 w-full text-center">인벤토리</h3>
                    {inventoryBoxes.length > 0 ? (
                        inventoryBoxes.map(box => (
                            <div key={box.id} className="mb-2">
                                <DraggableBox box={box} onDropToGrid={handleDropToGrid} />
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 w-full text-center">비어있음</p>
                    )}
                </div>
                {/* 모달 */}
                {isCellAdjustModalOpen && (
                    <CellAdjustModal
                        initialRowCount={rowCount}
                        initialColCount={colCount}
                        onApply={handleApplyCellAdjust}
                        onCancel={() => setIsCellAdjustModalOpen(false)}
                    />
                )}
                {isCreateBoxModalOpen && (
                    <CreateCompanyBoxModal
                        isOpen={isCreateBoxModalOpen}
                        onClose={() => setIsCreateBoxModalOpen(false)}
                        onSubmit={handleCreateBox}
                        colorPalette={COLOR_PALETTE}
                    />
                )}
                {isCompanyListModalOpen && selectedCompanyBox && (
                    <CompanyListModal
                        isOpen={isCompanyListModalOpen}
                        onClose={handleCloseCompanyListModal}
                        companyBox={selectedCompanyBox}
                        onSubmitApplication={handleSubmitApplication}
                    />
                )}
            </div>
        </DndProvider>
    );
}

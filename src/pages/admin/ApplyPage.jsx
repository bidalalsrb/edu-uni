import React, {useState} from "react";
import GridCell from "../../components/admin/ApplyPage/GridCell.jsx";
import CellAdjustModal from "../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";
import CompanyListModal from "../../components/admin/ApplyPage/modal/CompanyListModal.jsx";
import CreateCompanyBoxModal from "../../components/admin/ApplyPage/modal/CreateCompanyBoxModal.jsx";
import {COLOR_PALETTE} from "../../components/admin/ApplyPage/constants.js";

function ApplyPage({ record }) {
    // 그리드 셀, 기업 박스, 모달 상태 모두 useState로 관리
    const [rowCount, setRowCount] = useState(5);
    const [colCount, setColCount] = useState(5);
    const [boxes, setBoxes] = useState([]); // 기업(학교 등) 박스 목록
    const [layout, setLayout] = useState([]); // 그리드에 위치한 박스 id 매핑
    const [isCellAdjustModalOpen, setIsCellAdjustModalOpen] = useState(false);
    const [isCreateBoxModalOpen, setIsCreateBoxModalOpen] = useState(false);
    const [selectedCompanyBox, setSelectedCompanyBox] = useState(null);
    const [isCompanyListModalOpen, setIsCompanyListModalOpen] = useState(false);

    // 셀 추가/삭제
    const handleOpenCellAdjustModal = () => setIsCellAdjustModalOpen(true);
    const handleApplyCellAdjust = (newRows, newCols) => {
        setRowCount(newRows);
        setColCount(newCols);
        setIsCellAdjustModalOpen(false);
    };

    // 기업 박스 생성
    const handleOpenCreateBoxModal = () => setIsCreateBoxModalOpen(true);
    const handleCreateBox = ({ companyName, color }) => {
        const newBox = {
            id: Date.now(),
            companyName,
            color,
            applications: [],
        };
        setBoxes([...boxes, newBox]);
        setIsCreateBoxModalOpen(false);
    };

    // 박스를 그리드에 드롭
    const handleDropToGrid = (id, row, col) => {
        setLayout((prev) => {
            // 기존에 동일 좌표면 덮어쓰기
            const filtered = prev.filter(cell => cell.row !== row || cell.col !== col);
            return [...filtered, { id, row, col }];
        });
    };

    // 셀에서 박스 삭제
    const handleDeleteBoxFromGrid = (boxId) => {
        setLayout((prev) => prev.filter(cell => cell.id !== boxId));
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

    // 그리드 셀 배열 생성
    const gridCells = [];
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            const cell = layout.find(cell => cell.row === row && cell.col === col);
            const box = cell ? boxes.find(b => b.id === cell.id) : null;
            gridCells.push(
                <GridCell
                    key={`${row}-${col}`}
                    row={row}
                    col={col}
                    box={box}
                    onDropToGrid={handleDropToGrid}
                    onDelete={handleDeleteBoxFromGrid}
                    onOpenList={handleOpenCompanyListModal}
                    onOpenEdit={() => {}} // (원한다면 편집 모달도 구현)
                />
            );
        }
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex gap-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleOpenCellAdjustModal}
                >
                    셀 추가/삭제
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleOpenCreateBoxModal}
                >
                    기업 박스 생성
                </button>
            </div>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}>
                {gridCells}
            </div>
            {/* 모달들 */}
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
    );
}

export default ApplyPage;

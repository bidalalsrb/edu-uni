import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useNavigate} from "react-router-dom";
import {COLOR_PALETTE} from "../../components/admin/ApplyPage/constants.js";
import GridCell from "../../components/admin/ApplyPage/GridCell.jsx";
import DraggableBox from "../../components/admin/ApplyPage/DraggableBox.jsx";
import CreateCompanyBoxModal from "../../components/admin/ApplyPage/CreateCompanyBoxModal.jsx";
import EditBoxModal from "../../components/admin/ApplyPage/modal/EditBoxModal.jsx";
import CompanyListModal from "../../components/admin/ApplyPage/modal/CompanyListModal.jsx";
import CellAdjustModal from "../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";

// 저장된 레이아웃(박스와 행/열 수)를 불러오면서 Date 필드를 복원하는 함수
const loadLayout = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        const savedLayout = localStorage.getItem("layout_" + storedUser.id);
        if (savedLayout) {
            const layout = JSON.parse(savedLayout);
            const boxes = layout.boxes || [];
            const rowCount = layout.rowCount || 5;
            const colCount = layout.colCount || 8;
            boxes.forEach((box) => {
                if (box.applications && Array.isArray(box.applications)) {
                    box.applications = box.applications.map((app) => ({
                        ...app,
                        startTime: app.startTime ? new Date(app.startTime) : null,
                        endTime: app.endTime ? new Date(app.endTime) : null,
                    }));
                }
            });
            return { boxes, rowCount, colCount };
        }
    }
    return { boxes: [], rowCount: 5, colCount: 8 };
};



export default function ApplyPage() {
    const navigate = useNavigate();
    const initialLayout = loadLayout();
    const [boxes, setBoxes] = useState(initialLayout.boxes);
    const [rowCount, setRowCount] = useState(initialLayout.rowCount);
    const [colCount, setColCount] = useState(initialLayout.colCount);

    const [isCreateCompanyOpen, setIsCreateCompanyOpen] = useState(false);
    const [isEditBoxModalOpen, setIsEditBoxModalOpen] = useState(false);
    const [selectedBoxForEdit, setSelectedBoxForEdit] = useState(null);

    // 리스트 모달은 선택된 박스의 id만 저장
    const [selectedListBoxId, setSelectedListBoxId] = useState(null);
    const [isListModalOpen, setIsListModalOpen] = useState(false);

    // 셀 추가/삭제 모달 상태
    const [isCellAdjustModalOpen, setIsCellAdjustModalOpen] = useState(false);

    const openCreateCompanyModal = () => setIsCreateCompanyOpen(true);
    const closeCreateCompanyModal = () => setIsCreateCompanyOpen(false);

    const handleCreateCompanyBox = ({ companyName, color }) => {
        const newBox = {
            id: Date.now(),
            placed: false,
            row: null,
            col: null,
            companyName,
            color,
            applications: []
        };
        setBoxes((prev) => [...prev, newBox]);
        closeCreateCompanyModal();
    };

    const onDropToGrid = (boxId, row, col) => {
        setBoxes((prev) => {
            const droppedBox = prev.find((b) => b.id === boxId);
            const targetBox = prev.find(
                (b) => b.placed && b.row === row && b.col === col
            );
            if (targetBox && droppedBox.placed) {
                return prev.map((b) => {
                    if (b.id === boxId) {
                        return { ...b, row, col };
                    } else if (b.id === targetBox.id) {
                        return { ...b, row: droppedBox.row, col: droppedBox.col };
                    }
                    return b;
                });
            } else if (!targetBox) {
                return prev.map((b) =>
                    b.id === boxId ? { ...b, placed: true, row, col } : b
                );
            } else {
                alert("해당 칸은 이미 박스가 있습니다.");
                return prev;
            }
        });
    };

    const openEditBoxModal = (box) => {
        setSelectedBoxForEdit(box);
        setIsEditBoxModalOpen(true);
    };

    const closeEditBoxModal = () => {
        setSelectedBoxForEdit(null);
        setIsEditBoxModalOpen(false);
    };

    const handleEditBoxSubmit = (updatedBox) => {
        setBoxes((prev) =>
            prev.map((box) => (box.id === updatedBox.id ? updatedBox : box))
        );
        closeEditBoxModal();
    };

    const handleDeleteBox = (boxId) => {
        setBoxes((prev) => prev.filter((box) => box.id !== boxId));
    };

    const handleJoinListNavigate = () => {
        navigate("/joinList");
    };

    // "저장" 버튼: 현재 배치 상태와 그리드 행/열 수를 해당 계정에 저장
    const handleSaveLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            const layoutData = { boxes, rowCount, colCount };
            localStorage.setItem("layout_" + storedUser.id, JSON.stringify(layoutData));
            alert("배치도가 저장되었습니다.");
        } else {
            alert("로그인 정보가 없습니다.");
        }
    };

    // 박스 클릭 시 리스트 모달을 열기 위해 박스의 id 저장
    const openListModal = (box) => {
        setSelectedListBoxId(box.id);
        setIsListModalOpen(true);
    };

    const closeListModal = () => {
        setSelectedListBoxId(null);
        setIsListModalOpen(false);
    };

    // 선택된 박스의 최신 데이터를 boxes 배열에서 가져옴
    const selectedBoxForList = boxes.find((box) => box.id === selectedListBoxId);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="bg-gray-100 min-h-screen p-6">
                <h2 className="text-xl font-bold text-center mb-4">
                    박스 배치도 관리자 전용
                </h2>

                {/* 그리드 레이아웃: 행/열 수는 rowCount, colCount 상태로 결정 */}
                <div
                    className="gap-1 border"
                    style={{
                        display: "grid",
                        gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
                        gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                    }}
                >
                    {Array.from({ length: rowCount }).map((_, row) =>
                        Array.from({ length: colCount }).map((__, col) => {
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
                                    onOpenEdit={openEditBoxModal}
                                    onOpenList={openListModal}
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
                        <div className="flex space-x-2">
                            <button
                                onClick={openCreateCompanyModal}
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow"
                            >
                                추가하기
                            </button>
                            <button
                                onClick={handleSaveLayout}
                                className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded shadow"
                            >
                                저장
                            </button>
                            <button
                                onClick={() => setIsCellAdjustModalOpen(true)}
                                className="px-4 py-2 bg-purple-500 text-white font-semibold rounded shadow"
                            >
                                셀 추가/삭제
                            </button>
                        </div>
                        <button
                            onClick={handleJoinListNavigate}
                            className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow"
                        >
                            joinList 이동하기
                        </button>
                    </div>
                </div>

                {/* 셀 추가/삭제 모달 */}
                {isCellAdjustModalOpen && (
                    <CellAdjustModal
                        initialRowCount={rowCount}
                        initialColCount={colCount}
                        onApply={(newRow, newCol) => {
                            setRowCount(newRow);
                            setColCount(newCol);
                            setIsCellAdjustModalOpen(false);
                        }}
                        onCancel={() => setIsCellAdjustModalOpen(false)}
                    />
                )}

                {/* 기업 박스 생성 모달 */}
                <CreateCompanyBoxModal
                    isOpen={isCreateCompanyOpen}
                    onClose={closeCreateCompanyModal}
                    onSubmit={handleCreateCompanyBox}
                    colorPalette={COLOR_PALETTE}
                />

                {/* 박스 설정(편집) 모달 */}
                {isEditBoxModalOpen && selectedBoxForEdit && (
                    <EditBoxModal
                        isOpen={isEditBoxModalOpen}
                        onClose={closeEditBoxModal}
                        box={selectedBoxForEdit}
                        onSubmit={handleEditBoxSubmit}
                        colorPalette={COLOR_PALETTE}
                    />
                )}

                {/* 박스 신청 내역 리스트 모달 */}
                {isListModalOpen && selectedBoxForList && (
                    <CompanyListModal
                        isOpen={isListModalOpen}
                        onClose={closeListModal}
                        companyBox={selectedBoxForList}
                        onSubmitApplication={(boxId, newApp) => {
                            setBoxes((prev) =>
                                prev.map((box) =>
                                    box.id === boxId
                                        ? { ...box, applications: [...(box.applications || []), newApp] }
                                        : box
                                )
                            );
                        }}
                    />
                )}
            </div>
        </DndProvider>
    );
}

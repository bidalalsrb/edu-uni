import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { COLOR_PALETTE } from "../../components/admin/ApplyPage/constants.js";
import GridCell from "../../components/admin/ApplyPage/GridCell.jsx";
import DraggableBox from "../../components/admin/ApplyPage/DraggableBox.jsx";
import CreateBoxModal from "../../components/admin/ApplyPage/modal/CreateBoxModal.jsx";
import EditBoxModal from "../../components/admin/ApplyPage/modal/EditBoxModal.jsx";
import CompanyListModal from "../../components/admin/ApplyPage/modal/CompanyListModal.jsx";
import CellAdjustModal from "../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";
import AlertNotification from "../../components/noti/AlertNotification.jsx";
import useLayoutStore from "../../store/layoutStore";

export default function ApplyPage() {
    const navigate = useNavigate();
    const {
        boxes,
        rowCount,
        colCount,
        initializeLayout,
        addBox,
        updateBox,
        removeBox,
        setRowCount,
        setColCount,
        saveLayout,
        setBoxes,
    } = useLayoutStore();

    // 모달 및 알림 상태
    const [isCreateCompanyBoxOpen, setIsCreateCompanyBoxOpen] = React.useState(false);
    const [isEditBoxModalOpen, setIsEditBoxModalOpen] = React.useState(false);
    const [selectedBoxForEdit, setSelectedBoxForEdit] = React.useState(null);
    const [selectedListBoxId, setSelectedListBoxId] = React.useState(null);
    const [isListModalOpen, setIsListModalOpen] = React.useState(false);
    const [isCellAdjustModalOpen, setIsCellAdjustModalOpen] = React.useState(false);
    const [alert, setAlert] = React.useState(null);

    // 컴포넌트 마운트 시 레이아웃 초기화
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            initializeLayout(storedUser.id);
        }
    }, [initializeLayout]);

    // Header 영역
    const Header = () => (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-md shadow-md mb-6">
            <h1 className="text-2xl font-bold text-center">박스 배치도 관리자 전용</h1>
        </header>
    );

    // GridLayout 영역
    const GridLayout = () => (
        <div
            className="gap-1 border p-2 bg-white rounded-md shadow"
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
    );

    // Inventory 영역
    const Inventory = () => {
        const unplacedBoxes = boxes.filter((b) => !b.placed);
        return (
            <div className="bg-white p-4 border rounded-md shadow-md w-40">
                <h3 className="font-semibold mb-2">인벤토리</h3>
                {unplacedBoxes.length > 0 ? (
                    unplacedBoxes.map((box) => (
                        <div key={box.id} className="mb-2">
                            <DraggableBox box={box} onDropToGrid={onDropToGrid} />
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">비어있음</p>
                )}
            </div>
        );
    };

    // ButtonBar 영역
    const ButtonBar = () => (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
                <button
                    onClick={() => setIsCellAdjustModalOpen(true)}
                    className="px-4 py-2 bg-purple-500 text-white font-semibold rounded shadow"
                >
                    셀 추가/삭제
                </button>
                <button
                    onClick={() => setIsCreateCompanyBoxOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow"
                >
                    기업 추가
                </button>
                <button
                    onClick={handleSaveLayout}
                    className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded shadow"
                >
                    저장
                </button>
            </div>
            <button
                onClick={handleJoinListNavigate}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded shadow"
            >
                joinList 이동하기
            </button>
        </div>
    );

    // 기업 박스 생성 함수
    const handleCreateCompanyBox = ({ companyName, color }) => {
        const newBox = {
            id: Date.now(),
            placed: false,
            row: null,
            col: null,
            companyName,
            color,
            applications: [],
        };
        addBox(newBox);
        setIsCreateCompanyBoxOpen(false);
        // 기업 추가 완료 알림 호출
        setAlert({ message: "기업 추가가 완료되었습니다.", type: "success" });
    };

    // 셀 추가/삭제 적용 함수
    const handleCellAdjustApply = (newRow, newCol) => {
        setRowCount(newRow);
        setColCount(newCol);
        setBoxes(
            boxes.filter(
                (box) => !box.placed || (box.row < newRow && box.col < newCol)
            )
        );
        setIsCellAdjustModalOpen(false);
        // 셀 추가/삭제 적용 완료 알림 호출
        setAlert({ message: "셀 추가/삭제가 적용되었습니다.", type: "success" });
    };

    // 박스 드롭 핸들러
    const onDropToGrid = (boxId, row, col) => {
        const droppedBox = boxes.find((b) => b.id === boxId);
        const targetBox = boxes.find(
            (b) => b.placed && b.row === row && b.col === col
        );
        if (targetBox && droppedBox.placed) {
            updateBox({
                ...droppedBox,
                row,
                col,
            });
            updateBox({
                ...targetBox,
                row: droppedBox.row,
                col: droppedBox.col,
            });
        } else if (!targetBox) {
            updateBox({
                ...droppedBox,
                placed: true,
                row,
                col,
            });
        } else {
            alert("해당 칸은 이미 박스가 있습니다.");
        }
    };

    // 박스 수정 모달 관련 함수
    const openEditBoxModal = (box) => {
        setSelectedBoxForEdit(box);
        setIsEditBoxModalOpen(true);
    };
    const closeEditBoxModal = () => {
        setSelectedBoxForEdit(null);
        setIsEditBoxModalOpen(false);
    };
    const handleEditBoxSubmit = (updatedBox) => {
        updateBox(updatedBox);
        closeEditBoxModal();
    };

    // 박스 삭제
    const handleDeleteBox = (boxId) => {
        removeBox(boxId);
    };

    // joinList 페이지 이동
    const handleJoinListNavigate = () => {
        navigate("/joinList");
    };

    // 레이아웃 저장 및 알림 처리
    const handleSaveLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            saveLayout(storedUser.id);
            setAlert({ message: "저장이 완료되었습니다.", type: "success" });
        } else {
            alert("로그인 정보가 없습니다.");
        }
    };

    // 리스트 모달 관련 함수
    const openListModal = (box) => {
        setSelectedListBoxId(box.id);
        setIsListModalOpen(true);
    };
    const closeListModal = () => {
        setSelectedListBoxId(null);
        setIsListModalOpen(false);
    };
    const selectedBoxForList = boxes.find((box) => box.id === selectedListBoxId);

    // 신청 완료(예: 신청 모달 내에서 호출 시)
    const handleApplicationComplete = () => {
        setAlert({ message: "신청이 완료되었습니다.", type: "success" });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="max-w-7xl mx-auto p-6">
                <Header />
                <GridLayout />
                <div className="flex justify-between items-start mt-6">
                    <Inventory />
                    <ButtonBar />
                </div>
                {isCellAdjustModalOpen && (
                    <CellAdjustModal
                        initialRowCount={rowCount}
                        initialColCount={colCount}
                        onApply={handleCellAdjustApply}
                        onCancel={() => setIsCellAdjustModalOpen(false)}
                    />
                )}
                <CreateBoxModal
                    isOpen={isCreateCompanyBoxOpen}
                    onClose={() => setIsCreateCompanyBoxOpen(false)}
                    onSubmit={handleCreateCompanyBox}
                    colorPalette={COLOR_PALETTE}
                />
                {isEditBoxModalOpen && selectedBoxForEdit && (
                    <EditBoxModal
                        isOpen={isEditBoxModalOpen}
                        onClose={closeEditBoxModal}
                        box={selectedBoxForEdit}
                        onSubmit={handleEditBoxSubmit}
                        colorPalette={COLOR_PALETTE}
                    />
                )}
                {isListModalOpen && selectedBoxForList && (
                    <CompanyListModal
                        isOpen={isListModalOpen}
                        onClose={closeListModal}
                        companyBox={selectedBoxForList}
                        onSubmitApplication={(boxId, newApp) => {
                            updateBox({
                                ...selectedBoxForList,
                                applications: [
                                    ...(selectedBoxForList.applications || []),
                                    newApp,
                                ],
                            });
                            // 신청 완료 알림 호출
                            handleApplicationComplete();
                        }}
                    />
                )}
                {alert && (
                    <AlertNotification
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>
        </DndProvider>
    );
}

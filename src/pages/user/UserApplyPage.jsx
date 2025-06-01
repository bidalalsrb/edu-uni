import React, {useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useNavigate} from "react-router-dom";
import {COLOR_PALETTE} from "../../components/admin/ApplyPage/constants.js";
import GridCell from "../../components/admin/ApplyPage/GridCell.jsx";
import DraggableBox from "../../components/admin/ApplyPage/DraggableBox.jsx";
import CreateBoxModal from "../../components/admin/ApplyPage/modal/CreateBoxModal.jsx";
import EditBoxModal from "../../components/admin/ApplyPage/modal/EditBoxModal.jsx";
import CompanyListModal from "../../components/admin/ApplyPage/modal/CompanyListModal.jsx";
import CellAdjustModal from "../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";
import AlertNotification from "../../components/noti/AlertNotification.jsx";
import useLayoutStore from "../../store/layoutStore";
import sampleLayout from "../../data/sampleData"; // 임시 데이터를 불러옴
import {useGetEventList, useGetLayoutList} from "../admin/api/layout.js";
import UserCompanyListModal from "../../components/admin/ApplyPage/modal/UserCompanyListModal.jsx";
import UserGridCell from "../../components/admin/ApplyPage/UserGridCell.jsx";

export default function UserApplyPage({record}) {
    const {data: layoutList} = useGetLayoutList();
    const {data: eventList} = useGetEventList();


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

    // 컴포넌트 마운트 시, 로컬 스토리지 데이터가 있으면 저장된 데이터 사용, 없으면 sampleLayout 사용
    const loadLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        let layout;
        if (storedUser) {
            const savedLayout = localStorage.getItem("layout_" + storedUser.id);
            if (savedLayout) {
                layout = JSON.parse(savedLayout);
            }
        } else {
            const savedLayout = localStorage.getItem("layout_sample");
            if (savedLayout) {
                layout = JSON.parse(savedLayout);
            }
        }
        if (!layout) {
            layout = sampleLayout;
        }
        return layout;
    };

    useEffect(() => {
        const layout = loadLayout();
        setBoxes(layout.boxes);
        setRowCount(layout.rowCount);
        setColCount(layout.colCount);
    }, [initializeLayout, setBoxes, setRowCount, setColCount]);

    // Header 영역
    const Header = () => (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-md shadow-md mb-6">
            <h1 className="text-2xl font-bold text-center">2025 공과계열 취업박람회 배치도</h1>
        </header>
    );

    // 선택된 행사(배치코드) 정보 표시 (record prop이 전달된 경우)
    const InfoSection = () => {
        if (!record) return null;
        return (
            <div className="mb-4 p-4 bg-gray-100 rounded-md">
                <p className="text-sm">
                    <strong>배치코드:</strong> {record.batchCode}
                </p>
                <p className="text-sm">
                    <strong>행사명:</strong> {record.name}
                </p>
                <p className="text-sm">
                    <strong>행사장소:</strong> {record.location}
                </p>
                <p className="text-sm">
                    <strong>담당자:</strong> {record.person}
                </p>
                <p className="text-sm">
                    <strong>시작/종료:</strong> {record.startDate} ~ {record.endDate}
                </p>
                <p className="text-sm">
                    <strong>등록일:</strong> {record.registrationDate}
                </p>
            </div>
        );
    };

    // GridLayout 영역: record가 있으면 해당 배치코드, 없으면 회원가입 시 저장된 배치코드에 맞는 박스만 필터링
    const GridLayout = () => {
        let normalizedBatchCode = "";
        if (record && record.batchCode) {
            normalizedBatchCode = record.batchCode.startsWith("#")
                ? record.batchCode
                : "#" + record.batchCode;
        } else {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser && storedUser.batchCode) {
                normalizedBatchCode = storedUser.batchCode.startsWith("#")
                    ? storedUser.batchCode
                    : "#" + storedUser.batchCode;
            }
        }

        const filteredBoxes = normalizedBatchCode
            ? boxes.filter((b) => {
                const normalizedBoxBatchCode = b.batchCode
                    ? (b.batchCode.startsWith("#") ? b.batchCode : "#" + b.batchCode)
                    : "";
                return normalizedBoxBatchCode === normalizedBatchCode;
            })
            : boxes;

        return (
            <div
                className="gap-1 border p-2 bg-white rounded-md shadow"
                style={{
                    display: "grid",
                    gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
                    gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                }}
            >
                {Array.from({length: rowCount}).map((_, row) =>
                    Array.from({length: colCount}).map((__, col) => {
                        const placedBox = filteredBoxes.find(
                            (b) => b.placed && b.row === row && b.col === col
                        );
                        return (
                            <UserGridCell
                                key={`${row}-${col}`}
                                row={row}
                                col={col}
                                box={placedBox}
                                onDropToGrid={onDropToGrid}
                                onOpenList={openListModal}
                            />
                        );
                    })
                )}
            </div>
        );
    };

    // 함수들
    const handleCreateCompanyBox = ({companyName, color}) => {
        const newBox = {
            id: Date.now(),
            placed: false,
            row: null,
            col: null,
            companyName,
            color,
            applications: [],
            // 박스 생성 시 해당 박스가 속할 배치코드를 저장 (record가 존재하면 해당 배치코드 할당)
            batchCode: record && record.batchCode ? record.batchCode : "",
        };
        addBox(newBox);
        setIsCreateCompanyBoxOpen(false);
        setAlert({message: "기업 추가가 완료되었습니다.", type: "success"});
    };

    const handleCellAdjustApply = (newRow, newCol) => {
        setRowCount(newRow);
        setColCount(newCol);
        setBoxes(
            boxes.filter((box) => !box.placed || (box.row < newRow && box.col < newCol))
        );
        setIsCellAdjustModalOpen(false);
        setAlert({message: "셀 추가/삭제가 적용되었습니다.", type: "success"});
    };

    const onDropToGrid = (boxId, row, col) => {
        const droppedBox = boxes.find((b) => b.id === boxId);
        const targetBox = boxes.find(
            (b) => b.placed && b.row === row && b.col === col
        );
        if (targetBox && droppedBox.placed) {
            updateBox({...droppedBox, row, col});
            updateBox({...targetBox, row: droppedBox.row, col: droppedBox.col});
        } else if (!targetBox) {
            updateBox({...droppedBox, placed: true, row, col});
        } else {
            alert("해당 칸은 이미 박스가 있습니다.");
        }
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
        updateBox(updatedBox);
        closeEditBoxModal();
    };

    const handleDeleteBox = (boxId) => {
        removeBox(boxId);
    };

    const handleJoinListNavigate = () => {
        navigate("/joinList");
    };

    const handleSaveLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const layoutData = {
            boxes,
            rowCount,
            colCount,
        };
        if (storedUser) {
            localStorage.setItem("layout_" + storedUser.id, JSON.stringify(layoutData));
            setAlert({message: "배치도가 저장되었습니다.", type: "success"});
        } else {
            localStorage.setItem("layout_sample", JSON.stringify(layoutData));
            setAlert({message: "배치도가 저장되었습니다.", type: "success"});
        }
    };

    const openListModal = (box) => {
        setSelectedListBoxId(box.id);
        setIsListModalOpen(true);
    };

    const closeListModal = () => {
        setSelectedListBoxId(null);
        setIsListModalOpen(false);
    };

    const selectedBoxForList = boxes.find((box) => box.id === selectedListBoxId);

    const handleApplicationComplete = () => {
        setAlert({message: "신청이 완료되었습니다.", type: "success"});
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="max-w-7xl mx-auto p-6">
                <Header/>
                {record && <InfoSection/>}
                <GridLayout/>
                {/*<div className="flex justify-between items-start mt-6">*/}
                {/*    <Inventory/>*/}
                {/*    <ButtonBar/>*/}
                {/*</div>*/}
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
                    <UserCompanyListModal
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

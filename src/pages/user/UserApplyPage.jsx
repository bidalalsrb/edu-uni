import React, { useEffect, useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import { COLOR_PALETTE } from "../../components/admin/ApplyPage/constants.js";
import CreateBoxModal from "../../components/admin/ApplyPage/modal/CreateBoxModal.jsx";
import EditBoxModal from "../../components/admin/ApplyPage/modal/EditBoxModal.jsx";
import CellAdjustModal from "../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";
import AlertNotification from "../../components/noti/AlertNotification.jsx";
import sampleLayout from "../../data/sampleData"; // 임시 데이터를 불러옴
import UserCompanyListModal from "../../components/admin/ApplyPage/modal/UserCompanyListModal.jsx";
import UserGridCell from "../../components/admin/ApplyPage/UserGridCell.jsx";

// zustand 관련 코드 완전 삭제!!

export default function UserApplyPage({ record }) {
    const navigate = useNavigate();

    // 상태 직접 선언
    const [boxes, setBoxes] = useState([]);
    const [rowCount, setRowCount] = useState(5);
    const [colCount, setColCount] = useState(5);

    // 모달 및 알림 상태
    const [isCreateCompanyBoxOpen, setIsCreateCompanyBoxOpen] = useState(false);
    const [isEditBoxModalOpen, setIsEditBoxModalOpen] = useState(false);
    const [selectedBoxForEdit, setSelectedBoxForEdit] = useState(null);
    const [selectedListBoxId, setSelectedListBoxId] = useState(null);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isCellAdjustModalOpen, setIsCellAdjustModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    // 로컬/샘플 데이터 불러오기
    const loadLayout = useCallback(() => {
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
    }, []);

    useEffect(() => {
        const layout = loadLayout();
        setBoxes(layout.boxes);
        setRowCount(layout.rowCount);
        setColCount(layout.colCount);
    }, [loadLayout]);

    // Header 영역
    const Header = () => (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-md shadow-md mb-6">
            <h1 className="text-2xl font-bold text-center">2025 공과계열 취업박람회 배치도</h1>
        </header>
    );

    // 행사 정보
    const InfoSection = () => {
        if (!record) return null;
        return (
            <div className="mb-4 p-4 bg-gray-100 rounded-md">
                <p className="text-sm"><strong>배치코드:</strong> {record.batchCode}</p>
                <p className="text-sm"><strong>행사명:</strong> {record.name}</p>
                <p className="text-sm"><strong>행사장소:</strong> {record.location}</p>
                <p className="text-sm"><strong>담당자:</strong> {record.person}</p>
                <p className="text-sm"><strong>시작/종료:</strong> {record.startDate} ~ {record.endDate}</p>
                <p className="text-sm"><strong>등록일:</strong> {record.registrationDate}</p>
            </div>
        );
    };

    // 그리드 필터링
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
                {Array.from({ length: rowCount }).map((_, row) =>
                    Array.from({ length: colCount }).map((__, col) => {
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

    // 박스 생성
    const handleCreateCompanyBox = ({ companyName, color }) => {
        const newBox = {
            id: Date.now(),
            placed: false,
            row: null,
            col: null,
            companyName,
            color,
            applications: [],
            batchCode: record && record.batchCode ? record.batchCode : "",
        };
        setBoxes(prev => [...prev, newBox]);
        setIsCreateCompanyBoxOpen(false);
        setAlert({ message: "기업 추가가 완료되었습니다.", type: "success" });
    };

    // 셀 추가/삭제
    const handleCellAdjustApply = (newRow, newCol) => {
        setRowCount(newRow);
        setColCount(newCol);
        setBoxes(prev => prev.filter((box) => !box.placed || (box.row < newRow && box.col < newCol)));
        setIsCellAdjustModalOpen(false);
        setAlert({ message: "셀 추가/삭제가 적용되었습니다.", type: "success" });
    };

    // 드래그 드롭
    const onDropToGrid = (boxId, row, col) => {
        setBoxes(prevBoxes => {
            const droppedBox = prevBoxes.find((b) => b.id === boxId);
            const targetBox = prevBoxes.find((b) => b.placed && b.row === row && b.col === col);

            if (targetBox && droppedBox.placed) {
                return prevBoxes.map((box) => {
                    if (box.id === droppedBox.id) return { ...box, row, col };
                    if (box.id === targetBox.id) return { ...box, row: droppedBox.row, col: droppedBox.col };
                    return box;
                });
            } else if (!targetBox) {
                return prevBoxes.map((box) =>
                    box.id === droppedBox.id
                        ? { ...box, placed: true, row, col }
                        : box
                );
            } else {
                alert("해당 칸은 이미 박스가 있습니다.");
                return prevBoxes;
            }
        });
    };

    // 박스 편집/삭제
    const openEditBoxModal = (box) => {
        setSelectedBoxForEdit(box);
        setIsEditBoxModalOpen(true);
    };
    const closeEditBoxModal = () => {
        setSelectedBoxForEdit(null);
        setIsEditBoxModalOpen(false);
    };
    const handleEditBoxSubmit = (updatedBox) => {
        setBoxes(prev => prev.map((box) =>
            box.id === updatedBox.id ? updatedBox : box
        ));
        closeEditBoxModal();
    };
    const handleDeleteBox = (boxId) => {
        setBoxes(prev => prev.filter((box) => box.id !== boxId));
    };

    // 저장
    const handleSaveLayout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const layoutData = { boxes, rowCount, colCount };
        if (storedUser) {
            localStorage.setItem("layout_" + storedUser.id, JSON.stringify(layoutData));
        } else {
            localStorage.setItem("layout_sample", JSON.stringify(layoutData));
        }
        setAlert({ message: "배치도가 저장되었습니다.", type: "success" });
    };

    // 리스트(모달) 핸들러
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
        setAlert({ message: "신청이 완료되었습니다.", type: "success" });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="max-w-7xl mx-auto p-6">
                <Header />
                {record && <InfoSection />}
                <GridLayout />
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
                            setBoxes(prev => prev.map(box =>
                                box.id === boxId
                                    ? { ...box, applications: [...(box.applications || []), newApp] }
                                    : box
                            ));
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

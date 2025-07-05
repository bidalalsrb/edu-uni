import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import GridCell from "../../../components/admin/ApplyPage/GridCell.jsx";
import DraggableBox from "../../../components/admin/ApplyPage/DraggableBox.jsx";
import CellAdjustModal from "../../../components/admin/ApplyPage/modal/CellAdjustModal.jsx";
import CompanyListModal from "../../../components/admin/ApplyPage/modal/CompanyListModal.jsx";
import CreateCompanyBoxModal from "../../../components/admin/ApplyPage/modal/CreateCompanyBoxModal.jsx";
import {COLOR_PALETTE} from "../../../components/admin/ApplyPage/constants.js";

import {Box, Paper, Button, Grid, Typography} from "@mui/material";
import api from "../../../util/api/api.js";

export default function EventLayoutCreate({record}) {
    const [rowCount, setRowCount] = useState(5);
    const [colCount, setColCount] = useState(5);
    const [boxes, setBoxes] = useState([]);
    const [isCellAdjustModalOpen, setIsCellAdjustModalOpen] = useState(false);
    const [isCreateBoxModalOpen, setIsCreateBoxModalOpen] = useState(false);
    const [selectedCompanyBox, setSelectedCompanyBox] = useState(null);
    const [isCompanyListModalOpen, setIsCompanyListModalOpen] = useState(false);
    const [createStatus, setCreateStatus] = useState(false);
    // 기업 박스 생성
    const handleCreateBox = ({companyName, color}) => {
        const newBox = {
            id: Date.now(),
            companyName,
            color,
            applications: [],
            placed: false,
            row: null,
            col: null,
        };
        setBoxes([...boxes, newBox]);
        setIsCreateBoxModalOpen(false);
    };

    // 박스를 그리드에 드롭
    const handleDropToGrid = (id, row, col) => {
        setBoxes((prevBoxes) => {
            const targetBox = prevBoxes.find(
                (b) => b.placed && b.row === row && b.col === col
            );
            return prevBoxes.map((box) => {
                if (box.id === id) {
                    return {...box, placed: true, row, col};
                }
                if (targetBox && box.id === targetBox.id) {
                    return {...box, placed: false, row: null, col: null};
                }
                return box;
            });
        });
    };

    // 셀에서 박스 제거
    const handleDeleteBoxFromGrid = (boxId) => {
        setBoxes((prevBoxes) =>
            prevBoxes.map((box) =>
                box.id === boxId ? {...box, placed: false, row: null, col: null} : box
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
        setBoxes((prevBoxes) =>
            prevBoxes.map((box) =>
                box.id === boxId
                    ? {...box, applications: [...(box.applications || []), newApplication]}
                    : box
            )
        );
    };

    // 행/열 조정
    const handleApplyCellAdjust = (newRows, newCols) => {
        setRowCount(newRows);
        setColCount(newCols);
        setIsCellAdjustModalOpen(false);
        setBoxes((prev) =>
            prev.map((b) =>
                b.placed && (b.row >= newRows || b.col >= newCols)
                    ? {...b, placed: false, row: null, col: null}
                    : b
            )
        );
    };

    // 인벤토리(미배치 박스)
    const inventoryBoxes = boxes.filter((b) => !b.placed);
    // 그리드 셀 생성
    const gridCells = [];
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            const box = boxes.find((b) => b.placed && b.row === row && b.col === col);
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
    // 배치도 생성
    const handleCreateLayout = async () => {
        const payload = {
            schoolCd: "S9490",
            programCd: 0,
            layoutCd: 1,
            layoutNm: "행사장 A구역",
            maxRow: rowCount,
            maxCol: colCount,
            coordinatorName: "남상민",
            place: "산학관",
            eventStartAt: "2025-07-05T14:54:09.579Z",
            eventEndAt: "2025-07-05T14:54:09.579Z"
        }
        try {

            // 실제 생성 API 호출 (userId 값은 실제 값으로 대체)
            const res = await api.post('/admin/layout/mgmg', payload);
            console.log('res', res)
            if (res.status === 200) {
                setCreateStatus(true);
            }
            // 예시: 1초 후 성공 처리 (필요 없으면 제거해도 됨)
            // setTimeout(() => setCreateStatus(true), 1000);
        } catch (err) {
            alert("배치도 생성 실패!");
            console.log(err)
        }
    };

    return (
        createStatus ?
            <DndProvider backend={HTML5Backend}>
                <Box sx={{p: 4}}>
                    {/* 상단 버튼바 */}
                    <Grid container spacing={2} alignItems="center" sx={{mb: 2}}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsCellAdjustModalOpen(true)}
                                sx={{
                                    fontWeight: 600,
                                    background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                }}
                            >
                                셀 추가/삭제
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => setIsCreateBoxModalOpen(true)}
                                sx={{fontWeight: 600}}
                            >
                                기업 박스 생성
                            </Button>
                        </Grid>
                        {/* 빈 공간 차지 */}
                        <Grid item xs/>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    fontWeight: 600,
                                    background: "linear-gradient(to bottom, #6d4aff, #3e1f99)",
                                }}
                                // onClick={handleSave} // 저장 핸들러 추가 필요
                            >
                                저장
                            </Button>
                        </Grid>
                    </Grid>

                    {/* 그리드 */}
                    <Paper
                        elevation={3}
                        sx={{
                            display: "grid",
                            gap: 1,
                            border: "1px solid #e0e0e0",
                            p: 2,
                            bgcolor: "#fff",
                            borderRadius: 2,
                            mb: 4,
                            gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
                            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
                        }}
                    >
                        {gridCells}
                    </Paper>

                    {/* 인벤토리 */}
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2,
                            borderRadius: 2,
                            boxShadow: 1,
                            width: "100%",
                            minHeight: 110,
                            mt: 2,
                            mb: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                        }}
                    >
                        <Typography variant="subtitle1" fontWeight={600} align="center" sx={{mb: 1}}>
                            인벤토리
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 2,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start"
                            }}
                        >
                            {inventoryBoxes.length > 0 ? (
                                inventoryBoxes.map((box) => (
                                    <Box key={box.id} sx={{width: '100px', height: '100px'}}>
                                        <DraggableBox box={box} onDropToGrid={handleDropToGrid}/>
                                    </Box>
                                ))
                            ) : (
                                <Typography color="text.secondary" align="center" sx={{fontSize: 14}}>
                                    비어있음
                                </Typography>
                            )}
                        </Box>
                    </Paper>

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
                </Box>
            </DndProvider>
            : (
                <Box
                    sx={{
                        height: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#fafbfc",
                        borderRadius: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        size="xmall"
                        sx={{
                            px: 8,
                            py: 2.5,
                            fontSize: 22,
                            fontWeight: 700,
                            background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                            borderRadius: 3,
                            boxShadow: 2,
                            '&:hover': {background: "linear-gradient(to bottom, #1F3EA6, #375DDC)"}
                        }}
                        onClick={handleCreateLayout}
                    >
                        배치도 생성
                    </Button>
                </Box>
            )
    );
}

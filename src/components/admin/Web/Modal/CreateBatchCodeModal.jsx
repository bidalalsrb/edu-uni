import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    InputLabel,
} from "@mui/material";
import api from "../../../../util/api/api"; // ← API util 경로에 맞게 수정!

function CreateBatchCodeModal({onClose, onSave}) {
    const [events, setEvents] = useState([]); // 서버에서 받아온 행사 리스트
    const [selectedEvent, setSelectedEvent] = useState(""); // 선택한 행사
    const [person, setPerson] = useState("");
    const [batchCode, setBatchCode] = useState("");

    // 행사 데이터 받아오기 (마운트시)
    useEffect(() => {
        const getEveneList = async () => {
            try {
                const res = await api.get("/event/program-list/mgmg/school-cd/S9490");
                setEvents(res.data.data || []);
            } catch (e) {
                console.log(e);
            }
        };
        getEveneList();
    }, []);
    // 랜덤 배치코드 발급
    const generateBatchCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setBatchCode("#" + code);
    };

    const handleSave = () => {
        if (!selectedEvent || !person || !batchCode) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        const newRecord = {
            event: selectedEvent,
            person,
            batchCode,
            registeredDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        };
        onSave(newRecord);
        onClose();
    };

    return (
        <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>배치도 등록</DialogTitle>
            <DialogContent>
                <Box sx={{mt: 1}}>
                    {/* 행사 셀렉트 */}
                    <FormControl fullWidth margin="normal" size="small">
                        <InputLabel id="event-label">행사 선택</InputLabel>
                        <Select
                            labelId="event-label"
                            label="행사 선택"
                            value={selectedEvent}
                            onChange={e => setSelectedEvent(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>행사 선택</em>
                            </MenuItem>
                            {events.map(ev => (
                                <MenuItem key={ev.programCd || ev.id} value={ev.programCd || ev.id}>
                                    {ev.programName || ev.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* 담당자 */}
                    <TextField
                        fullWidth
                        size="small"
                        margin="normal"
                        label="담당자"
                        value={person}
                        onChange={e => setPerson(e.target.value)}
                        placeholder="담당자 입력"
                    />

                    {/* 배치코드 발급 */}
                    <Grid container alignItems="center" spacing={1} sx={{mt: 1, mb: 2}}>
                        <Grid item>
                            <Button variant="contained" color="success" onClick={generateBatchCode}>
                                배치코드 발급
                            </Button>
                        </Grid>
                        <Grid item>
                            {batchCode && (
                                <Typography fontWeight={700} fontSize={18}>
                                    {batchCode}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>

                    {/* 버튼 영역 */}
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Button onClick={onClose} variant="outlined">
                            취소
                        </Button>
                        <Button onClick={handleSave} variant="contained">
                            저장
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default CreateBatchCodeModal;

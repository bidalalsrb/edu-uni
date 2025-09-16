import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../util/api/api.js";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import EventRegisterForm from "/src/components/admin/EventRegister/EventRegisterForm";
import EventImageUpload from "/src/components/admin/EventRegister/EventImageUpload";

export default function EventRegisterPage() {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        name: "",
        person: "",
        startDate: "",
        place: "",
        endDate: "",
        uploadImages: [],
        uploadImagePreviews: [],
        memo: ""
    });
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            // 이미지(여러장)
            images.forEach(file => {
                formData.append("image", file);
            });
            // 나머지 정보
            formData.append("schoolCd", "S9490");
            formData.append("programCd", "0"); // 필요시 변경
            formData.append("programName", eventData.name);
            formData.append("coordinatorName", eventData.person);
            formData.append("place", eventData.place);
            formData.append("programStartAt", eventData.startDate);
            formData.append("programEndAt", eventData.endDate);
            formData.append("description", eventData.memo || "");
            console.log('폼데',formData)
            const res = await api.post(
                '/event/program-list/mgmg',
                formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                }
            );
            console.log('등록 결과', res);
            alert("등록이 완료되었습니다.");
        } catch (err) {
            console.error(err);
            alert("등록에 실패했습니다.");
        }
    };

    return (
        <Box sx={{width: "100%", bgcolor: "#f5f6fa", minHeight: "100vh"}}>
            <Grid container spacing={3} sx={{px: 4, py: 4, m: 0}}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 1,
                        minHeight: 700,
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography variant="h6" fontWeight={700} align="center" mb={4}>
                            행사 정보
                        </Typography>
                        <EventRegisterForm eventData={eventData} setEventData={setEventData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{
                        p: 4,
                        borderRadius: 3,
                        boxShadow: 1,
                        minHeight: 700,
                        maxHeight: 700,
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography variant="h6" fontWeight={700} align="center" mb={4}>
                            행사 이미지 등록
                        </Typography>
                        <EventImageUpload
                            images={images}
                            setImages={setImages}
                            previews={previews}
                            setPreviews={setPreviews}
                            selectedIdx={selectedIdx}
                            setSelectedIdx={setSelectedIdx}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                width: 110,
                                alignSelf: "flex-end",
                                bgcolor: "#2258E9",
                                fontWeight: 600,
                                py: 1,
                                mt: "auto"
                            }}
                            onClick={handleSubmit}
                        >
                            등록하기
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

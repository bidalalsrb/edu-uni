import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../util/api/api.js";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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
            // 1. 행사정보 등록
            const eventPayload = {
                schoolCd: 'S9490',
                programName: eventData.name,
                coordinatorName: eventData.person,
                place: eventData.place,
                programStartAt: eventData.startDate,
                programEndAt: eventData.endDate,
                description: eventData.memo || ""
            };
            console.log('행사정보 데이터 입력', eventPayload);

            const res = await api.post('/event/program-list/mgmg', eventPayload);
            if (res.status === 200) {
                let imageUploadSuccess = true;

                // 2. 이미지 여러 장 업로드
                if (images.length > 0) {
                    const formData = new FormData();
                    formData.append("schoolCd", "S9490");
                    formData.append("programCd", "0"); // 필요하다면 실제 반환값 사용

                    images.forEach(file => {
                        formData.append("image", file);
                    });

                    // formData를 콘솔로 확인하려면:
                    // for (let pair of formData.entries()) {
                    //     console.log(pair[0] + ':', pair[1]);
                    // }

                    try {
                        const imageRes = await api.post('/resource/upload', formData, {
                            headers: {"Content-Type": "multipart/form-data"}
                        });
                        if (imageRes.status !== 200) {
                            imageUploadSuccess = false;
                        }
                    } catch (err) {
                        imageUploadSuccess = false;
                        console.log(err);
                    }
                }

                if (imageUploadSuccess) {
                    alert("등록이 완료되었습니다.");
                    navigate("/index/admin/event-list");
                } else {
                    alert("행사정보는 저장되었으나, 이미지 업로드에 실패했습니다.");
                }
            } else {
                alert("행사 등록 실패(코드 반환 없음)");
            }
        } catch (err) {
            console.log(err);
            alert("등록에 실패했습니다.");
        }
    };

    return (
        <Box sx={{ width: "100%", bgcolor: "#f5f6fa", minHeight: "100vh" }}>
            <Grid container spacing={3} sx={{ px: 4, py: 4, m: 0 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 1, minHeight: 700, display: "flex", flexDirection: "column" }}>
                        <Typography variant="h6" fontWeight={700} align="center" mb={4}>
                            행사 정보
                        </Typography>
                        <EventRegisterForm eventData={eventData} setEventData={setEventData} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 1, minHeight: 700, maxHeight: 700, display: "flex", flexDirection: "column" }}>
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
                            sx={{ width: 110, alignSelf: "flex-end", bgcolor: "#2258E9", fontWeight: 600, py: 1, mt: "auto" }}
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

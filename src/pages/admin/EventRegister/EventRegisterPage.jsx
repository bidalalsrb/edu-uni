import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../util/api/api.js";
import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";

export default function EventRegisterPage() {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        name: "",
        person: "",
        startDate: "",
        place: "",
        endDate: "",
        uploadImages: [],
        uploadImagePreviews: []
    });
    const [images, setImages] = useState([]); // File[]
    const [previews, setPreviews] = useState([]); // string[]
    const [selectedIdx, setSelectedIdx] = useState(0);
    const fileInputRef = useRef();

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
                    formData.append("programCd", "0");
                    images.forEach(file => {
                        formData.append("image", file);
                    });

                    // formData를 콘솔로 확인하려면:
                    for (let pair of formData.entries()) {
                        console.log(pair[0] + ':', pair[1]);
                    }

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
                    navigate("/index/admin/event-search");
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


    // 파일 업로드 버튼 클릭
    const handleImageClick = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    // 파일 업로드 시
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.slice(0, 5 - images.length);
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setImages(prev => [...prev, ...newFiles]);
        setPreviews(prev => [...prev, ...newPreviews]);
        if (images.length === 0 && newFiles.length > 0) setSelectedIdx(0);
    };

    // 썸네일 클릭시 큰 이미지로
    const handleThumbnailClick = idx => setSelectedIdx(idx);

    // 큰 이미지 미리보기 내용
    const mainPreview = previews.length
        ? previews[selectedIdx]
        : null;
    return (
        <Box sx={{width: "100%", bgcolor: "#f5f6fa"}}>
            {/* 메인 */}
            <Grid container sx={{width: "100%", m: 0, p: 0}}>
                <Grid container spacing={3} sx={{px: 4, py: 4}}>
                    {/* 행사 정보 */}
                    <Grid item xs={12} md={6} sx={{p: 0}}>
                        <Paper sx={{
                            p: 4,
                            borderRadius: 3,
                            boxShadow: 1,
                            minHeight: 700,
                            display: "flex", flexDirection: "column"
                        }}>
                            <Typography variant="h6" fontWeight={700} align="center" mb={4}>
                                행사 정보
                            </Typography>
                            <Box sx={{flex: 1, display: "flex", flexDirection: "column", gap: 2}}>
                                <TextField
                                    label="행사명 *"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value={eventData.name}
                                    onChange={e => setEventData({...eventData, name: e.target.value})}
                                />
                                <TextField
                                    label="행사 장소 *"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value={eventData.place}
                                    onChange={e => setEventData({...eventData, place: e.target.value})}
                                />
                                <TextField
                                    label="행사 담당자 *"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    value={eventData.person}
                                    onChange={e => setEventData({...eventData, person: e.target.value})}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="행사 시작 날짜 *"
                                            size="small"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{shrink: true}}
                                            margin="normal"
                                            value={eventData.startDate}
                                            onChange={e => setEventData({...eventData, startDate: e.target.value})}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="행사 종료 날짜 *"
                                            size="small"
                                            type="datetime-local"
                                            fullWidth
                                            InputLabelProps={{shrink: true}}
                                            margin="normal"
                                            value={eventData.endDate}
                                            onChange={e => setEventData({...eventData, endDate: e.target.value})}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    label="비고"
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    minRows={5}
                                    value={eventData.memo || ""}
                                    onChange={e => setEventData({...eventData, memo: e.target.value})}
                                />
                            </Box>

                        </Paper>
                    </Grid>
                    {/* 이미지 등록 */}
                    <Grid item xs={12} md={6} sx={{p: 0}}>
                        <Paper sx={{
                            p: 4,
                            borderRadius: 3,
                            boxShadow: 1,
                            minHeight: 700,
                            maxHeight: 700,
                            display: "flex", flexDirection: "column"
                        }}>
                            <Typography variant="h6" fontWeight={700} align="center" mb={4}>
                                행사 이미지 등록
                            </Typography>

                            {/* 큰 미리보기 (빨간박스) */}
                            <Box
                                sx={{
                                    flex: 1,
                                    aspectRatio: "4/3",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "2px dashed #eee",
                                    borderRadius: 2,
                                    minHeight: 270,
                                    height: 0,              // ★ 추가: flex:1과 함께하면 '남는 공간'만큼만 차지
                                    maxHeight: 400,         // ★ 추가: 최대 높이 제한
                                    mb: 3,
                                    bgcolor: "#fafbfc",
                                    cursor: "pointer",
                                    position: "relative",
                                    overflow: "hidden"      // ★ 추가: 자식이 절대 벗어나지 않도록
                                }}
                                onClick={images.length === 0 ? handleImageClick : undefined}
                            >
                                {/* 이미지 없으면 +, 있으면 미리보기 */}
                                {mainPreview ? (
                                    <img
                                        src={mainPreview}
                                        alt="선택이미지"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: 8,
                                            display: "block",
                                            maxHeight: "100%",
                                            maxWidth: "100%"
                                        }}
                                    />
                                ) : (
                                    <Box sx={{textAlign: "center"}}>
                                        <Box sx={{mb: 1}}>
                                            <svg width={44} height={44} fill="none" stroke="#bbb" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 4v16m8-8H4"
                                                />
                                            </svg>
                                        </Box>
                                        <Typography color="#888" fontSize={16}>이미지 추가</Typography>
                                    </Box>
                                )}
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    style={{display: "none"}}
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                            </Box>

                            {/* 썸네일 + 추가 버튼 (파란박스) */}
                            <Box sx={{display: "flex", gap: 1.5, mb: 2}}>
                                {previews.map((src, idx) => (
                                    <Box
                                        key={idx}
                                        onClick={() => handleThumbnailClick(idx)}
                                        sx={{
                                            width: 54,
                                            height: 54,
                                            borderRadius: 2,
                                            border: idx === selectedIdx ? "2px solid #2258E9" : "1px solid #eee",
                                            bgcolor: "#fafbfc",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <img
                                            src={src}
                                            alt={`썸네일${idx + 1}`}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: 8
                                            }}
                                        />
                                    </Box>
                                ))}
                                {/* + 버튼은 이미지 5장 미만일 때만 */}
                                {images.length < 5 && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleImageClick}
                                        sx={{
                                            width: 54, height: 54, borderRadius: 2, color: "#aaa",
                                            border: "2px dashed #ccc", minWidth: 0, fontSize: 34, fontWeight: 500
                                        }}
                                    >+</Button>
                                )}
                            </Box>

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
            </Grid>
        </Box>
    );
}

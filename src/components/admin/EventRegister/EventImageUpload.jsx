import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function EventImageUpload({ images, setImages, previews, setPreviews, selectedIdx, setSelectedIdx }) {
    const fileInputRef = useRef();

    // 파일 업로드 버튼 클릭
    const handleImageClick = () => fileInputRef.current?.click();

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

    const mainPreview = previews.length ? previews[selectedIdx] : null;

    return (
        <>
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
                    maxHeight: 400,
                    mb: 3,
                    bgcolor: "#fafbfc",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden"
                }}
                onClick={images.length === 0 ? handleImageClick : undefined}
            >
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
                    <Box sx={{ textAlign: "center" }}>
                        <Box sx={{ mb: 1 }}>
                            <svg width={44} height={44} fill="none" stroke="#bbb" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </Box>
                        <Typography color="#888" fontSize={16}>이미지 추가</Typography>
                    </Box>
                )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                {previews.map((src, idx) => (
                    <Box
                        key={idx}
                        onClick={() => handleThumbnailClick(idx)}
                        sx={{
                            width: 54, height: 54, borderRadius: 2,
                            border: idx === selectedIdx ? "2px solid #2258E9" : "1px solid #eee",
                            bgcolor: "#fafbfc",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            overflow: "hidden", cursor: "pointer"
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
        </>
    );
}

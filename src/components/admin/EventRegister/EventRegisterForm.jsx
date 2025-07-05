import React from "react";
import { Box, Grid, TextField } from "@mui/material";

export default function EventRegisterForm({ eventData, setEventData }) {
    return (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
                label={
                    <span> 행사명<span className=" ml-1 text-red-500">*</span></span>
                }
                size="small"
                fullWidth
                margin="normal"
                value={eventData.name}
                onChange={e => setEventData({ ...eventData, name: e.target.value })}
            />
            <TextField
                label={
                    <span> 행사 장소<span className=" ml-1 text-red-500">*</span></span>
                }
                size="small"
                fullWidth
                margin="normal"
                value={eventData.place}
                onChange={e => setEventData({ ...eventData, place: e.target.value })}
            />
            <TextField
                label={
                    <span> 행사 담당자<span className=" ml-1 text-red-500">*</span></span>
                }
                size="small"
                fullWidth
                margin="normal"
                value={eventData.person}
                onChange={e => setEventData({ ...eventData, person: e.target.value })}
            />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label={
                            <span> 행사 시작 날짜<span className=" ml-1 text-red-500">*</span></span>
                        }
                        size="small"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        value={eventData.startDate}
                        onChange={e => setEventData({ ...eventData, startDate: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label={
                            <span> 행사 종료 날짜<span className=" ml-1 text-red-500">*</span></span>
                        }
                        size="small"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        value={eventData.endDate}
                        onChange={e => setEventData({ ...eventData, endDate: e.target.value })}
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
                onChange={e => setEventData({ ...eventData, memo: e.target.value })}
            />
        </Box>
    );
}

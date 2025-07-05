import React from "react";
import {Button, FormControl, MenuItem, Radio, RadioGroup, Select, TextField, FormControlLabel} from "@mui/material";

// 상태&카테고리 라디오 아이콘
const UncheckedIcon = (
    <span style={{
        display: "block",
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: "3px solid #C6CBDF",
        background: "#fff",
    }}/>
);
const CheckedIcon = (
    <span style={{
        display: "block",
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: "7px solid #1F3EA6",
        background: "#fff",
        boxSizing: "border-box",
        boxShadow: "0 1px 6px 0 rgba(40,77,254,0.10)"
    }}/>
);

export default function ExcelDownSearchForm({
                                                searchTerm, setSearchTerm,
                                                searchOption, setSearchOption,
                                                statusValue, setStatusValue,
                                                categoryValue, setCategoryValue,
                                                onSearch, onReset
                                            }) {
    return (
        <section className="bg-white rounded-xl shadow-sm  border border-gray-200 px-14 py-14 ">
            <div className="flex flex-col gap-6 ">
                {/* 검색 */}
                <div className="flex items-center ">
                    <div className="w-28 min-w-28 text-left mr-28 font-semibold text-gray-800 ">검색</div>
                    <div className="flex gap-2 flex-1">
                        <FormControl size="small" sx={{
                            minWidth: 120,
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#fffFF',
                                '& fieldset': {
                                    borderColor: '#ffF',
                                    boxShadow: '0 0 0 1px rgba(55,93,220,0.10), 0 0px 8px rgba(0,0,0,0.12)',
                                }
                            }
                        }}>
                            <Select
                                value={searchOption}
                                onChange={(e) => setSearchOption(e.target.value)}
                            >
                                <MenuItem value="목록">목록</MenuItem>
                                <MenuItem value="행사명">행사명</MenuItem>
                                <MenuItem value="담당자">담당자</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            size="small"
                            placeholder="내용을 입력해주세요"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            sx={{
                                width: "50%",
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: "#fffFFF",
                                    '& fieldset': {
                                        borderColor: '#fffFFF',
                                        boxShadow: '0 0 0 1px rgba(55,93,220,0.10), 0 0px 8px rgba(0,0,0,0.12)',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                {/* 상태 */}
                <div className="flex items-center">
                    <div className="w-28 min-w-28 text-left mr-28 font-semibold text-gray-800 ">상태</div>
                    <div className="flex-1 flex items-center text-xl">
                        <RadioGroup
                            row
                            value={statusValue}
                            onChange={e => setStatusValue(e.target.value)}
                            name="status"
                            className="w-full"
                        >
                            <FormControlLabel value="option1"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="어쩌구" className="!mr-6"/>
                            <FormControlLabel value="option2"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="저쩌구" className="!mr-6"/>
                            <FormControlLabel value="option3"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="끝남" className="!mr-6"/>
                            <FormControlLabel value="option4"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="쩔라" className="!mr-6"/>
                        </RadioGroup>
                    </div>
                </div>
                {/* 카테고리 */}
                <div className="flex items-center">
                    <div className="w-28 min-w-28 text-left mr-28 font-semibold text-gray-800 ">카테고리</div>
                    <div className="flex-1 text-xl">
                        <RadioGroup
                            row
                            value={categoryValue}
                            onChange={e => setCategoryValue(e.target.value)}
                            name="status"
                        >
                            <FormControlLabel value="option1"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="어쩌구" className="!mr-6"/>
                            <FormControlLabel value="option2"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="저쩌구" className="!mr-6"/>
                            <FormControlLabel value="option3"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="끝남" className="!mr-6"/>
                            <FormControlLabel value="option4"
                                              control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon}/>}
                                              label="쩔라" className="!mr-6"/>
                        </RadioGroup>
                    </div>
                </div>
                {/* 버튼 */}
                <div className="flex justify-center gap-2 mt-2">
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                            fontSize: "15px",
                            borderRadius: "0.5rem",
                            boxShadow: "none",
                            '&:hover': {
                                background: "linear-gradient(to bottom, #1F3EA6, #375DDC)",
                                boxShadow: "0 2px 8px 0 rgba(55,93,220,0.16)",
                            },
                        }}
                        onClick={onSearch}
                    >
                        검색
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        className="gra-outline"
                        sx={{
                            backgroundColor: "#fff",
                            color: "#375DDC",
                            fontSize: "15px",
                            borderRadius: "0.5rem",
                            border: "none",
                            boxShadow: "none",
                            '&:hover': {
                                backgroundColor: "#f3f8ff",
                            },
                        }}
                        onClick={onReset}
                    >
                        초기화
                    </Button>
                </div>
            </div>
        </section>
    )
}

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../../util/api/api.js";
import {
    Box,
    Button, Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem, Paper,
    Radio,
    RadioGroup,
    Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
    TextField
} from "@mui/material";
import CustomPagination from "../../../components/common/CustomPagination.jsx";
import {formatDateTime} from "/src/util/common/commonFunctions.js";

function EventLayout() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("목록"); // 기본값 "행사명"
    const [statusValue, setStatusValue] = useState("option1");
    const [categoryValue, setCategoryValue] = useState("option1");
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5; // 사진 기준 한 페이지 7개

    const navigate = useNavigate();

    useEffect(() => {
        const getInitData = async () => {
            try {
                const response = await api.get(`/event/program-list/mgmg/school-cd/S9490`);
                setFilteredRecords(response.data.data);
                console.log(response);
            } catch (err) {
                console.error(err);
            }
        };
        getInitData();
    }, []);

    const UncheckedIcon = (
        <span style={{
            display: "block",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "3px solid #C6CBDF", // 연회색
            background: "#fff",
        }}/>
    );

// "선택" 상태 (파란색 테두리)
    const CheckedIcon = (
        <span style={{
            display: "block",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "7px solid #1F3EA6",   // 이미지처럼 진파랑(원하는 색상으로 변경 가능)
            background: "#fff",
            boxSizing: "border-box",
            boxShadow: "0 1px 6px 0 rgba(40,77,254,0.10)", // 부드러운 그림자(선택)
        }}/>
    );

    return (
        <main className="p-6 flex flex-col gap-6">
            {/* 검색/필터 섹션 */}
            <div className="text-sm text-gray-500 font-medium">행사 /<span className='font-bold text-gray-800'> 조회</span>
            </div>
            <section className="bg-white rounded-xl shadow-sm  border border-gray-200 px-14 py-14 ">
                <div className="flex flex-col gap-6 ">
                    {/* 검색 */}
                    <div className="flex items-center ">
                        <div className="w-28 min-w-28 text-left mr-28 font-semibold text-gray-800 ">검색</div>
                        <div className="flex gap-2 flex-1">
                            {/* MUI Select */}
                            <FormControl size="small" sx={{
                                minWidth: 120,
                                // OutlinedInput의 스타일 오버라이드
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#fffFF',   // 셀렉트 배경 밝게
                                    '& fieldset': {
                                        borderColor: '#ffF',     // 기본 테두리 흰색
                                        boxShadow: '0 0 0 1px rgba(55,93,220,0.10), 0 0px 8px rgba(0,0,0,0.12)',

                                    },
                                },
                            }}>
                                <Select
                                    labelId="search-option-label"
                                    value={searchOption}
                                    onChange={(e) => setSearchOption(e.target.value)}
                                >
                                    <MenuItem value="목록">목록</MenuItem>
                                    <MenuItem value="행사명">행사명</MenuItem>
                                    <MenuItem value="담당자">담당자</MenuItem>
                                </Select>
                            </FormControl>
                            {/* MUI Input */}
                            <TextField
                                size="small"
                                placeholder="내용을 입력해주세요"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                sx={{
                                    width: "50%",
                                    // OutlinedInput 전체 커스텀
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: "#fffFFF",
                                        '& fieldset': {
                                            borderColor: '#fffFFF',         // 밝은 흰색 테두리
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
                                onChange={(e) => setStatusValue(e.target.value)}
                                name="status"
                                className="w-full"
                            >
                                <FormControlLabel
                                    value="option1"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="어쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option2"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="저쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option3"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="끝남"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option4"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="쩔라"
                                    className="!mr-6"
                                />
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
                                onChange={(e) => setCategoryValue(e.target.value)}
                                name="status"
                            >
                                <FormControlLabel
                                    value="option1"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="어쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option2"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="저쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option3"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="끝남"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option4"
                                    control={<Radio
                                        icon={UncheckedIcon}
                                        checkedIcon={CheckedIcon}
                                    />}
                                    label="쩔라"
                                    className="!mr-6"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    {/* 버튼 */}
                    <div className="flex justify-center gap-2 mt-2">
                        {/* 파란색 그라데이션(커스텀) */}
                        <Button
                            type="button"
                            variant="contained"
                            sx={{
                                background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                fontSize: "`15px",      // text-xl과 비슷
                                borderRadius: "0.5rem",   // rounded-lg
                                boxShadow: "none",
                                '&:hover': {
                                    background: "linear-gradient(to bottom, #1F3EA6, #375DDC)",
                                    boxShadow: "0 2px 8px 0 rgba(55,93,220,0.16)",
                                },
                            }}
                        >
                            검색
                        </Button>

                        {/* 흰 배경 + gra-outline 커스텀 클래스도 추가 */}
                        <Button
                            type="button"
                            variant="outlined"
                            className="gra-outline"
                            sx={{
                                backgroundColor: "#fff",
                                color: "#375DDC",
                                fontSize: "15px",
                                borderRadius: "0.5rem",
                                border: "none", // gra-outline이 겹치지 않게
                                boxShadow: "none",
                                '&:hover': {
                                    backgroundColor: "#f3f8ff",
                                },
                            }}
                        >
                            초기화
                        </Button>
                    </div>
                </div>
            </section>


            {/* 테이블 섹션 */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200">
                {/* 상단: TOTAL */}
                <div className="flex items-center justify-between px-8 pt-6 pb-2">
        <span className="text-gray-600 text-sm font-medium">
          TOTAL : <span className="text-[#375DDC]">{filteredRecords.length}</span>
        </span>
                    {/* 최신순 셀렉트 등 필요시 여기에 */}
                </div>
                <TableContainer component={Paper} sx={{
                    boxShadow: "none", borderRadius: 3, px: 2, background: "#fff"
                }}>
                    <Table stickyHeader style={{tableLayout: "fixed", width: "100%"}}>
                        <TableHead>
                            <TableRow
                                sx={{
                                    background: "#F6F7F9",
                                    "& th": {
                                        fontWeight: 700,
                                        color: "#232323",
                                        fontSize: 15,
                                        background: "#F6F7F9",
                                        borderBottom: "1.5px solid #E2E5ED"
                                    }
                                }}
                            >
                                <TableCell align="center" style={{width: '7%'}}>NO.</TableCell>
                                <TableCell style={{width: '28%'}}>행사명</TableCell>
                                <TableCell style={{width: '20%'}}>행사장소</TableCell>
                                <TableCell style={{width: '15%'}}>담당자</TableCell>
                                <TableCell style={{width: '15%'}}>시작날짜</TableCell>
                                <TableCell style={{width: '15%'}}>종료날짜</TableCell>
                                <TableCell style={{width: '15%'}}>수정</TableCell>
                                <TableCell style={{width: '15%'}}>생성</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRecords.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{color: "#aaa"}}>
                                        검색 결과가 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRecords
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((record, idx) => (
                                        <TableRow
                                            key={idx}
                                            hover
                                            sx={{
                                                "&:hover": {background: "#F8FAFF"},
                                                cursor: "pointer",
                                                "&:last-child td": {borderBottom: 0}
                                            }}
                                        >
                                            <TableCell align="center" style={{width: '7%'}}>
                                                {idx + 1 + page * rowsPerPage}
                                            </TableCell>
                                            <TableCell style={{width: '28%'}}>{record.programName}</TableCell>
                                            <TableCell style={{width: '20%'}}>{record.place}</TableCell>
                                            <TableCell style={{width: '15%'}}>{record.coordinatorName}</TableCell>
                                            <TableCell
                                                style={{width: '15%'}}>{formatDateTime(record.programStartAt)}</TableCell>
                                            <TableCell
                                                style={{width: '15%'}}>{formatDateTime(record.programEndAt)}</TableCell>
                                            <TableCell style={{width: '15%'}}> <Button
                                                type="button"
                                                variant="contained"
                                                sx={{
                                                    background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                                    fontSize: "15px",      // text-xl과 비슷
                                                    borderRadius: "0.5rem",   // rounded-lg
                                                    boxShadow: "none",
                                                    '&:hover': {
                                                        background: "linear-gradient(to bottom, #1F3EA6, #375DDC)",
                                                        boxShadow: "0 2px 8px 0 rgba(55,93,220,0.16)",
                                                    },
                                                }}
                                            >
                                                수정
                                            </Button></TableCell>
                                            <TableCell style={{width: '15%'}}> <Button
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
                                                onClick={() => navigate('/index/admin/event-layout/create')}
                                            >
                                                생성
                                            </Button></TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>


                </TableContainer>
                {/* 페이지네이션 */}
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CustomPagination
                        page={page}
                        setPage={setPage}
                        total={filteredRecords.length}
                        rowsPerPage={7}
                    />
                </Box>
            </section>
        </main>
    );
}

export default EventLayout;

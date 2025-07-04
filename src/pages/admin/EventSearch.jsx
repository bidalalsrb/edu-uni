import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../util/api/api.js";
import {FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField} from "@mui/material";


function EventSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("목록"); // 기본값 "행사명"
    const [statusValue, setStatusValue] = useState("option1");
    const [categoryValue, setCategoryValue] = useState("option1");
    const [filteredRecords, setFilteredRecords] = useState([]);
    const navigate = useNavigate();
    // 검색 버튼 클릭시
    /* const handleSearch = () => {
         if (searchTerm.trim() === "") {
             // setFilteredRecords(sampleEvents);
             return;
         }
         const filtered = sampleEvents.filter((record) => {
             if (searchOption === "행사명") {
                 return record.name.includes(searchTerm);
             } else if (searchOption === "담당자") {
                 return record.person.includes(searchTerm);
             } else {
                 return true;
             }
         });
         setFilteredRecords(filtered);
     };
 */
    /*
        // 엔터 키로도 검색 가능
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                handleSearch();
            }
        };
    */

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
    return (
        <main className="p-6 flex flex-col gap-6">
            {/* 검색/필터 섹션 */}
            <div className="text-sm text-gray-500 font-medium">행사 /<span className='font-bold text-gray-800'> 조회</span>
            </div>
            <section className="bg-white rounded-xl shadow-sm  border border-gray-200 px-14 py-14 ">
                <div className="flex flex-col gap-9 text-xl">
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
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="어쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option2"
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="저쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option3"
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="끝남"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option4"
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
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
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="어쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option2"
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="저쩌구"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option3"
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="끝남"
                                    className="!mr-6"
                                />
                                <FormControlLabel
                                    value="option4"
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#1F3EA6", // 체크 됐을 때
                                            },
                                        }}
                                    />}
                                    label="쩔라"
                                    className="!mr-6"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                    {/* 버튼 */}
                    <div className="flex justify-center gap-2 mt-2">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-lg text-white bg-graBackColor font-semibold transition"
                        >
                            검색
                        </button>
                        <button
                            type="button"
                            className="gra-outline bg-white text-[#375DDC] font-semibold px-6 py-2 rounded-lg transition hover:bg-blue-50"
                        >
                            초기화
                        </button>
                    </div>
                </div>
            </section>


            {/* 테이블 섹션 */}
            <section className="bg-white rounded-xl shadow-sm">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">행사 목록</h3>
                    <button type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
                             focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">엑셀
                        다운로드
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-4 py-3 font-semibold">번호</th>
                            <th className="px-4 py-3 font-semibold">행사명</th>
                            <th className="px-4 py-3 font-semibold">장소</th>
                            <th className="px-4 py-3 font-semibold">담당자</th>
                            <th className="px-4 py-3 font-semibold">시작날짜</th>
                            <th className="px-4 py-3 font-semibold">종료날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRecords.length === 0 ? (
                            <tr className="border-b border-gray-100">
                                <td className="px-4 py-3" colSpan="4">
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            filteredRecords.map((record, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3"
                                        onClick={() => navigate('/index/admin/event-search-detail')}>{record.programName}</td>
                                    <td className="px-4 py-3">{record.coordinatorName}</td>
                                    <td className="px-4 py-3">{record.place}</td>
                                    <td className="px-4 py-3">{record.programStartAt}</td>
                                    <td className="px-4 py-3">{record.programEndAt}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-500">총 {filteredRecords.length}건</div>
                </div>
            </section>
        </main>
    );
}

export default EventSearch;

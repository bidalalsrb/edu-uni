import React from "react";
import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import CustomPagination from "../../../components/common/CustomPagination.jsx";
import { formatDateTime } from "/src/util/common/commonFunctions.js";

export default function ExcelDownDataTable({filteredRecords, page, setPage, rowsPerPage}) {
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between px-8 pt-6 pb-2">
                <span className="text-gray-600 text-sm font-medium">
                  TOTAL : <span className="text-[#375DDC]">{filteredRecords.length}</span>
                </span>
                <button type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
                         focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">엑셀
                    다운로드
                </button>
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
                                        <TableCell style={{width: '15%'}}>{formatDateTime(record.programStartAt)}</TableCell>
                                        <TableCell style={{width: '15%'}}>{formatDateTime(record.programEndAt)}</TableCell>
                                    </TableRow>
                                ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" alignItems="center">
                <CustomPagination
                    page={page}
                    setPage={setPage}
                    total={filteredRecords.length}
                    rowsPerPage={rowsPerPage}
                />
            </Box>
        </section>
    );
}

import React, {useEffect, useState} from "react";
import ExcelDownSearchForm from "/src/components/admin/ExcelDown/ExcelDownSearchForm";
import ExcelDownDataTable from "/src/components/admin/ExcelDown/ExcelDownDataTable";
import api from "../../../util/api/api.js";

export default function ExcelDown() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("목록");
    const [statusValue, setStatusValue] = useState("option1");
    const [categoryValue, setCategoryValue] = useState("option1");
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    // ... api, useEffect 생략

    const handleSearch = () => {/*...*/};
    const handleReset = () => {/*...*/};
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
            <div className="text-sm text-gray-500 font-medium">
                행사 /<span className='font-bold text-gray-800'> 조회</span>
            </div>
            <ExcelDownSearchForm
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                searchOption={searchOption} setSearchOption={setSearchOption}
                statusValue={statusValue} setStatusValue={setStatusValue}
                categoryValue={categoryValue} setCategoryValue={setCategoryValue}
                onSearch={handleSearch} onReset={handleReset}
            />
            <ExcelDownDataTable
                filteredRecords={filteredRecords}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
            />
        </main>
    );
}

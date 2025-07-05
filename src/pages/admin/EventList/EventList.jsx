import React, { useEffect, useState } from "react";
import api from "../../../util/api/api.js";
import EventListSearchForm from "../../../components/admin/EventList/EventListSearchForm.jsx";
import EventListDataTable from "../../../components/admin/EventList/EventListDataTable.jsx";

function EventList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchOption, setSearchOption] = useState("목록");
    const [statusValue, setStatusValue] = useState("option1");
    const [categoryValue, setCategoryValue] = useState("option1");
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        const getInitData = async () => {
            try {
                const response = await api.get(`/event/program-list/mgmg/school-cd/S9490`);
                setFilteredRecords(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };
        getInitData();
    }, []);

    // 검색, 초기화 핸들러(샘플)
    const handleSearch = () => { /* 조건에 따라 setFilteredRecords() 등 */ };
    const handleReset = () => {
        setSearchTerm(""); setSearchOption("목록"); setStatusValue("option1"); setCategoryValue("option1");
        // setFilteredRecords(원본) 등
    };

    return (
        <main className="p-6 flex flex-col gap-6">
            <div className="text-sm text-gray-500 font-medium">
                행사 /<span className='font-bold text-gray-800'> 조회</span>
            </div>
            <EventListSearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchOption={searchOption}
                setSearchOption={setSearchOption}
                statusValue={statusValue}
                setStatusValue={setStatusValue}
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
                onSearch={handleSearch}
                onReset={handleReset}
            />
            <EventListDataTable
                filteredRecords={filteredRecords}
                page={page}
                setPage={setPage}
                rowsPerPage={5}
            />
        </main>
    );
}

export default EventList;

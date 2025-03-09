// pages/user/ApplyListComponent.jsx
import React from "react";
import {useNavigate} from "react-router-dom";
import ApplyListCom from "../../components/user/ApplyListComponent.jsx";

function ApplyList() {
    useNavigate();
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto min-h-screen bg-white shadow-md rounded-md">
                {/* 메인 컨텐츠: 박람회 참석 내역 */}
                <main className="p-4 space-y-6">
                    <ApplyListCom />
                </main>
            </div>
        </div>
    );
}

export default ApplyList;

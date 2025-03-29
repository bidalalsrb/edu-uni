import React, { useEffect, useState } from "react";
import MainImage from "../../components/user/MainImage.jsx";
import SubImage from "../../components/user/SubImage.jsx";

function JoinList() {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.batchCode) {
            // 회원가입 시 입력한 배치코드에 '#'가 없는 경우 자동으로 붙여서 비교
            const normalizedBatchCode = user.batchCode.startsWith("#")
                ? user.batchCode
                : "#" + user.batchCode;
            const events = JSON.parse(localStorage.getItem("events")) || [];
            const matchingEvent = events.find((e) => e.batchCode === normalizedBatchCode);
            if (matchingEvent) {
                setEventData(matchingEvent);
            }
        }
    }, []);

    return (
        <main className="p-4 space-y-6">
            <MainImage mainImagePreview={eventData ? eventData.mainImagePreview : undefined} />
            <SubImage subImagePreviews={eventData ? eventData.subImagePreviews : undefined} />
        </main>
    );
}

export default JoinList;

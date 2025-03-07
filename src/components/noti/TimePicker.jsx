// src/components/noti/TimePicker.jsx
import React from "react";

const TimePicker = ({ label, selectedHour, selectedMinute, onHourChange, onMinuteChange }) => {
    const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
    const minutes = ["00", "10", "20", "30", "40", "50"];

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <select
                value={selectedHour}
                onChange={(e) => onHourChange(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                ))}
            </select>
            <span className="text-gray-700">:</span>
            <select
                value={selectedMinute}
                onChange={(e) => onMinuteChange(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {minutes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>
        </div>
    );
};

export default TimePicker;

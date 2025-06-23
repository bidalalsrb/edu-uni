import React, { useState } from "react";
import { UserCircleIcon, CameraIcon, LockClosedIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/solid";

function MyAccount() {
    // 예시 초기값
    const [userId] = useState("hong123");
    const [major, setMajor] = useState("컴퓨터공학과");
    const [studentNumber, setStudentNumber] = useState("202012345");
    const [phone, setPhone] = useState("01012345678");
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [newPw, setNewPw] = useState("");
    const [pwChanged, setPwChanged] = useState(false);

    // 저장
    const handleUpdate = (e) => {
        e.preventDefault();
        alert("수정이 완료되었습니다.");
        setShowPasswordChange(false);
        setPwChanged(false);
    };

    // 취소
    const handleCancel = () => {
        setShowPasswordChange(false);
        setPwChanged(false);
        setMajor("컴퓨터공학과");
        setStudentNumber("202012345");
        setPhone("01012345678");
    };

    return (
        <section className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg px-6 py-10">
            <h2 className="text-2xl font-bold text-center mb-6">프로필 설정</h2>
            {/* 프로필 아이콘 */}
            <div className="flex flex-col items-center mb-8 relative">
                <UserCircleIcon className="w-20 h-20 text-gray-300" />
                {/* 카메라 아이콘 예시 */}
            </div>
            <form className="space-y-6" onSubmit={handleUpdate}>
                {/* 아이디 */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">아이디</label>
                    <input
                        type="text"
                        value={userId}
                        readOnly
                        className="w-full border border-gray-200 rounded-lg px-3 py-3 bg-gray-100 text-gray-700 font-semibold text-center"
                    />
                </div>
                {/* 비밀번호 */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">비밀번호</label>
                    {!showPasswordChange ? (
                        <button
                            type="button"
                            className="w-full border border-gray-200 rounded-lg px-3 py-3 bg-gray-50 font-semibold flex items-center justify-center gap-2"
                            onClick={() => setShowPasswordChange(true)}
                        >
                            <LockClosedIcon className="w-5 h-5 text-gray-400" />
                            비밀번호 변경
                        </button>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <input
                                type="password"
                                value={newPw}
                                placeholder="새 비밀번호"
                                onChange={e => setNewPw(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-3"
                            />
                            <button
                                type="button"
                                className="px-3 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
                                onClick={() => setShowPasswordChange(false)}
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                onClick={() => {
                                    setPwChanged(true);
                                    setShowPasswordChange(false);
                                    setNewPw("");
                                }}
                            >
                                저장
                            </button>
                        </div>
                    )}
                    {pwChanged && (
                        <div className="text-sm text-green-600 mt-1">비밀번호가 변경되었습니다.</div>
                    )}
                </div>
                {/* 학과 */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">학과</label>
                    <input
                        type="text"
                        value={major}
                        onChange={e => setMajor(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-3 text-center"
                    />
                </div>
                {/* 학번 */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">학번</label>
                    <input
                        type="text"
                        value={studentNumber}
                        onChange={e => setStudentNumber(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-3 text-center"
                    />
                </div>
                {/* 전화번호 */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">전화번호</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-center"
                        />
                        <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400 absolute top-3 right-3" />
                    </div>
                </div>
                {/* 버튼 */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
                        onClick={handleCancel}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
                    >
                        수정
                    </button>
                </div>
            </form>
        </section>
    );
}

export default MyAccount;

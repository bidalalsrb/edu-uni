import React, { useState } from "react";
import logo from "/public/bultiger.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const steps = [
    "휴대폰 인증",
    "비밀번호 설정",
    "추가 정보 입력"
];

export default function Register() {
    const [step, setStep] = useState(1);

    // 모든 입력필드 상태 (id는 phone과 동일)
    const [form, setForm] = useState({
        phone: "",
        verificationCode: "",
        password: "",
        confirmPassword: "",
        name: "",
        batchCode: "",
        department: "",
        studentNumber: "",
        gender: "",
        grade: "",
    });
    const [errors, setErrors] = useState({});
    const [sentCode, setSentCode] = useState(""); // 실제로는 백엔드에서 발송
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 핸들러: 입력값 변경
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            // id는 항상 phone값과 동기화
            ...(name === "phone" ? { id: value } : {})
        }));
    };

    // 1단계: 인증번호 발송
    const handleSendCode = () => {
        if (!form.phone) {
            setErrors(prev => ({ ...prev, phone: "휴대폰 번호를 입력하세요." }));
            return;
        }
        setSentCode("1234"); // 실제 서비스는 백엔드 발송
        alert("인증번호가 발송되었습니다. (테스트: 1234)");
        setErrors(prev => ({ ...prev, phone: null }));
    };

    // 1단계: 인증 확인
    const handleVerifyCode = (e) => {
        e.preventDefault();
        let error = {};
        if (!form.phone) error.phone = "휴대폰 번호는 필수입니다.";
        if (!form.verificationCode) error.verificationCode = "인증번호를 입력하세요.";
        if (Object.keys(error).length) {
            setErrors(error);
            return;
        }
        if (form.verificationCode !== sentCode || !sentCode) {
            setErrors(prev => ({
                ...prev,
                verificationCode: "인증번호가 올바르지 않습니다."
            }));
            return;
        }
        setIsPhoneVerified(true);
        alert("인증 성공!");
        setStep(2);
    };

    // 2단계 → 3단계
    const handleNextStep2 = (e) => {
        e.preventDefault();
        let error = {};
        if (!form.password) {
            error.password = "비밀번호는 필수입니다.";
        } else if (
            form.password.length < 6 || form.password.length > 15 ||
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(form.password)
        ) {
            error.password = "6~15자 영문, 숫자, 특수문자를 포함해야 합니다.";
        }
        if (!form.confirmPassword) {
            error.confirmPassword = "비밀번호 확인을 입력하세요.";
        } else if (form.password !== form.confirmPassword) {
            error.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }
        if (Object.keys(error).length) {
            setErrors(error);
            return;
        }
        setErrors({});
        setStep(3);
    };

    // 3단계: 회원가입 완료
    const handleSubmit = (e) => {
        e.preventDefault();
        let error = {};
        if (!form.name) error.name = "이름은 필수 입력입니다.";
        if (!form.batchCode) error.batchCode = "학교코드는 필수 입력입니다.";
        if (!form.department) error.department = "학과는 필수 입력입니다.";
        if (!form.studentNumber) error.studentNumber = "학번은 필수 입력입니다.";
        if (!form.gender) error.gender = "성별은 필수 입력입니다.";
        if (!form.grade) error.grade = "학년을 선택하세요.";
        if (Object.keys(error).length) {
            setErrors(error);
            return;
        }
        setErrors({});
        // id는 phone값으로 저장
        const { confirmPassword, verificationCode, ...userData } = { ...form, id: form.phone };
        localStorage.setItem("user", JSON.stringify(userData));
        alert("회원가입 성공! 이제 로그인하세요.");
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-lg px-6 py-8 space-y-6">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="logo" className="w-40 h-auto object-contain" />
                </div>
                {/* Stepper */}
                <div className="flex items-center justify-between mb-8">
                    {steps.map((label, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`rounded-full w-8 h-8 flex items-center justify-center text-white font-bold
                    ${step === idx + 1
                                        ? "bg-blue-500"
                                        : step > idx + 1
                                            ? "bg-green-500"
                                            : "bg-gray-300"
                                    }`}
                                >
                                    {idx + 1}
                                </div>
                                <span className="mt-1 text-xs text-gray-700 text-center whitespace-nowrap">{label}</span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-200 mx-1">
                                    <div
                                        className={`h-1 ${step > idx + 1 ? "bg-blue-500" : "bg-gray-200"}`}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step 1: 휴대폰 인증 */}
                {step === 1 && (
                    <form className="space-y-4" onSubmit={handleVerifyCode}>
                        <label className="text-gray-700 font-medium">휴대폰 번호</label>
                        <div className="flex gap-2">
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                type="text"
                                placeholder="'-' 제외하고 입력"
                                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                disabled={isPhoneVerified}
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 rounded-lg font-semibold"
                                onClick={handleSendCode}
                                disabled={isPhoneVerified}
                            >인증번호 발송</button>
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                        <label className="text-gray-700 font-medium">인증 번호</label>
                        <div className="flex gap-2">
                            <input
                                name="verificationCode"
                                value={form.verificationCode}
                                onChange={handleChange}
                                type="text"
                                placeholder="인증번호 입력"
                                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                disabled={isPhoneVerified}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 rounded-lg font-semibold"
                                disabled={isPhoneVerified}
                            >인증 확인</button>
                        </div>
                        {errors.verificationCode && <p className="text-red-500 text-sm">{errors.verificationCode}</p>}
                    </form>
                )}

                {/* Step 2: 비밀번호 설정 */}
                {step === 2 && (
                    <form className="space-y-3" onSubmit={handleNextStep2}>
                        {/* 아이디: phone 값을 보여주기만 함 */}
                        <label className="text-gray-700 font-medium">아이디(휴대폰 번호)</label>
                        <input
                            name="id"
                            value={form.phone}
                            readOnly
                            className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100"
                        />

                        {/* 비밀번호 */}
                        <label className="text-gray-700 font-medium">비밀번호</label>
                        <div className="relative">
                            <input
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                placeholder="비밀번호"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                                tabIndex={-1}
                            >
                                {showPassword
                                    ? <EyeSlashIcon className="w-6 h-6" />
                                    : <EyeIcon className="w-6 h-6" />
                                }
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm">6~15자의 영문 숫자 특수문자를 포함해주세요</p>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        {/* 비밀번호 확인 */}
                        <label className="text-gray-700 font-medium">비밀번호 확인</label>
                        <div className="relative">
                            <input
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="비밀번호 확인"
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                                tabIndex={-1}
                            >
                                {showConfirmPassword
                                    ? <EyeSlashIcon className="w-6 h-6" />
                                    : <EyeIcon className="w-6 h-6" />
                                }
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

                        <div className="flex justify-between pt-2">
                            <button type="button"
                                    onClick={() => setStep(1)}
                                    className="px-4 py-2 rounded bg-gray-200 text-gray-600 font-semibold"
                            >이전</button>
                            <button type="submit"
                                    className="px-4 py-2 rounded bg-blue-500 text-white font-semibold"
                            >다음</button>
                        </div>
                    </form>
                )}

                {/* Step 3: 추가 정보 입력 */}
                {step === 3 && (
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        {/* 이름 */}
                        <label className="text-gray-700 font-medium">이름</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="예) 김타이거"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}



                        {/* 학교코드 */}
                        <label className="text-gray-700 font-medium">학교코드</label>
                        <input
                            name="batchCode"
                            value={form.batchCode}
                            onChange={handleChange}
                            type="text"
                            placeholder="학교코드 입력"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.batchCode && <p className="text-red-500 text-sm">{errors.batchCode}</p>}

                        {/* 학과 */}
                        <label className="text-gray-700 font-medium">학과</label>
                        <input
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            type="text"
                            placeholder="학과 입력"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}

                        {/* 학번 */}
                        <label className="text-gray-700 font-medium">학번</label>
                        <input
                            name="studentNumber"
                            value={form.studentNumber}
                            onChange={handleChange}
                            type="text"
                            placeholder="학번 입력"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.studentNumber && <p className="text-red-500 text-sm">{errors.studentNumber}</p>}

                        {/* 성별 */}
                        <label className="text-gray-700 font-medium">성별</label>
                        <input
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            type="text"
                            placeholder="성별 입력"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

                        {/* 학년 */}
                        <label className="text-gray-700 font-medium">학년</label>
                        <select
                            name="grade"
                            value={form.grade}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">학년 선택</option>
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                            <option value="4">4학년</option>
                            <option value="외부">외부</option>
                        </select>
                        {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}

                        <div className="flex justify-between pt-2">
                            <button type="button"
                                    onClick={() => setStep(2)}
                                    className="px-4 py-2 rounded bg-gray-200 text-gray-600 font-semibold"
                            >이전</button>
                            <button type="submit"
                                    className="px-4 py-2 rounded bg-blue-500 text-white font-semibold"
                            >가입 완료</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

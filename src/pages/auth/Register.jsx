import React, {useState} from "react";
import logo from "/public/bultiger.png";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import api from '../../util/api/api.js'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from "@mui/material";

const steps = [
    "휴대폰 인증",
    "비밀번호 설정",
    "추가 정보 입력"
];

export default function Register() {
    const [step, setStep] = useState(3);

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
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [uuid, setUuid] = useState("");
    // 핸들러: 입력값 변경
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === "phone" ? {id: value} : {})
        }));
    };

    // 1단계: 인증번호 발송
    const handleSendCode = async () => {
        if (!form.phone) {
            setErrors(prev => ({...prev, phone: "휴대폰 번호를 입력하세요."}));
            return;
        }

        try {
            const response = await api.post("/auth/create-code", {
                phoneNum: form.phone,
            });
            alert("인증번호가 발송되었습니다. (테스트: 1234)");
            console.log('인증번호', response);
            // setSentCode(response.data.code);
        } catch (error) {
            console.log(error);
        }

        setErrors(prev => ({...prev, phone: null}));
    };

    // 1단계: 인증 확인
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        let error = {};
        if (!form.phone) error.phone = "휴대폰 번호는 필수입니다.";
        if (!form.verificationCode) error.verificationCode = "인증번호를 입력하세요.";
        if (Object.keys(error).length) {
            setErrors(error);
            return;
        }

        setIsPhoneVerified(true);
        try {
            const response = await api.post("/auth/validate-code", {
                phoneNum: form.phone,
                code: form.verificationCode
            })
            console.log('인증번호 여부 확인', response);
            setUuid(response.data.data);
            alert("인증 성공!");
            setStep(2);
        } catch (error) {
            console.log(error);
        }
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
    const handleSubmit = async (e) => {
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
        // todo
        const data = {
            userId: form.phone,
            password: form.password,
            name: form.name,
            phoneNumber: form.phone,
            major: form.department,
            studentNumber: form.studentNumber,
            gender: form.gender,
            schoolCd: form.batchCode,
            username: form.name,
        };
        try {
            console.log('전 ', data)
            const response = await api.post(`/auth/sign-up/student/${uuid}`, data);
            console.log('통과', response)
            alert("회원가입 성공! 이제 로그인하세요.");
            window.location.href = "/";
        } catch (err) {
            console.log(err)
            alert("회원가입 실패\n" + (err?.response?.data?.message || ""));
        }
    };
    const UncheckedIcon = (
        <span style={{
            display: "block",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "3px solid #C6CBDF",
            background: "#fff",
        }}/>
    );

    const CheckedIcon = (
        <span style={{
            display: "block",
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "7px solid #1F3EA6",
            background: "#fff",
            boxSizing: "border-box",
            boxShadow: "0 1px 6px 0 rgba(40,77,254,0.10)",
        }}/>
    );
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-lg px-6 py-8 space-y-6">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="logo" className="w-40 h-auto object-contain"/>
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
                                <span
                                    className="mt-1 text-xs text-gray-700 text-center whitespace-nowrap">{label}</span>
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
                    <Box component="form" onSubmit={handleVerifyCode}>
                        <Grid container spacing={2}>
                            {/* 휴대폰 번호 입력 + 인증번호 발송 */}
                            <Grid item xs={8}>
                                <TextField
                                    label="휴대폰 번호"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="'-' 제외하고 입력"
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    disabled={isPhoneVerified}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSendCode}
                                    disabled={isPhoneVerified}
                                    sx={{
                                        background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                        color: "#fff",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        height: 40,
                                        boxShadow: "none",
                                        '&:hover': {
                                            background: "linear-gradient(to bottom, #1F3EA6, #375DDC)"
                                        }
                                    }}
                                >
                                    인증번호 발송
                                </Button>
                            </Grid>

                            {/* 인증번호 입력 + 인증 확인 */}
                            <Grid item xs={8}>
                                <TextField
                                    label="인증번호"
                                    name="verificationCode"
                                    value={form.verificationCode}
                                    onChange={handleChange}
                                    placeholder="인증번호 입력"
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    disabled={isPhoneVerified}
                                    error={!!errors.verificationCode}
                                    helperText={errors.verificationCode}
                                />
                            </Grid>
                            <Grid item xs={4} sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    disabled={isPhoneVerified}
                                    sx={{
                                        background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                        color: "#fff",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        height: 40,
                                        boxShadow: "none",
                                        '&:hover': {
                                            background: "linear-gradient(to bottom, #1F3EA6, #375DDC)"
                                        }
                                    }}
                                >
                                    인증 확인
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {/* Step 2: 비밀번호 설정 */}
                {step === 2 && (
                    <Box component="form" onSubmit={handleNextStep2}>
                        <Grid container spacing={2}>
                            {/* 아이디(휴대폰) */}
                            <Grid item xs={12}>
                                <TextField
                                    label="아이디(휴대폰 번호)"
                                    value={form.phone}
                                    InputProps={{readOnly: true}}
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                />
                            </Grid>

                            {/* 비밀번호 */}
                            <Grid item xs={12}>
                                <TextField
                                    label="비밀번호"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호"
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    error={!!errors.password}
                                    helperText={errors.password || "6~15자의 영문, 숫자, 특수문자를 포함해주세요"}
                                    InputProps={{
                                        endAdornment: (
                                            <Button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                sx={{minWidth: 0, p: 0, color: "#888"}}
                                                tabIndex={-1}
                                            >
                                                {showPassword
                                                    ? <EyeSlashIcon className="w-5 h-5"/>
                                                    : <EyeIcon className="w-5 h-5"/>
                                                }
                                            </Button>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* 비밀번호 확인 */}
                            <Grid item xs={12}>
                                <TextField
                                    label="비밀번호 확인"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="비밀번호 확인"
                                    fullWidth
                                    size="small"
                                    margin="normal"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <Button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                sx={{minWidth: 0, p: 0, color: "#888"}}
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword
                                                    ? <EyeSlashIcon className="w-5 h-5"/>
                                                    : <EyeIcon className="w-5 h-5"/>
                                                }
                                            </Button>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {/* 하단 버튼 */}
                        <Box display="flex" justifyContent="space-between" pt={4}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => setStep(1)}
                                sx={{
                                    color: "#375DDC",
                                    borderColor: "#E2E5ED",
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    px: 4,
                                    background: "#f5f8ff"
                                }}
                            >이전</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                    color: "#fff",
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    px: 4,
                                    '&:hover': {
                                        background: "linear-gradient(to bottom, #1F3EA6, #375DDC)"
                                    }
                                }}
                            >다음</Button>
                        </Box>
                    </Box>
                )}

                {/* Step 3: 추가 정보 입력 */}
                {step === 3 && (
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* 이름 */}
                        <TextField
                            label='이름'
                            size="small"
                            fullWidth
                            margin='normal'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="예) 김타이거"
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={{mb: 1}}
                        />

                        {/* 학교코드 + 확인 버튼 */}
                        <Grid container spacing={1} alignItems="center" sx={{mt: 2}}>
                            <Grid item xs>
                                <TextField
                                    label='학교코드'
                                    value={form.batchCode}
                                    onChange={handleChange}
                                    placeholder="학교코드 입력를 입력하시오"
                                    size="small"
                                    fullWidth
                                    error={!!errors.batchCode}
                                />
                            </Grid>
                            <Grid item sx={{alignSelf: "center"}}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        minWidth: 80,
                                        background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                        color: "#fff",
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        boxShadow: "none",
                                        '&:hover': {
                                            background: "linear-gradient(to bottom, #1F3EA6, #375DDC)"
                                        }
                                    }}

                                >
                                    확인
                                </Button>
                            </Grid>
                        </Grid>
                        {errors.batchCode && (
                            <Box sx={{color: "error.main", mb: 1}}>{errors.batchCode}</Box>
                        )}

                        {/* 학과 */}
                        <FormControl fullWidth variant="outlined" size="small" sx={{mt: 3}}>
                            <InputLabel id="dept-label">학과</InputLabel>
                            <Select
                                labelId="dept-label"
                                label="학과"
                                value={form.grade}
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>학과 선택</em></MenuItem>
                                <MenuItem value="컴퓨터공학과">컴퓨터공학과</MenuItem>
                            </Select>
                        </FormControl>

                        {/* 학번 */}
                        <TextField
                            label='학번'
                            value={form.studentNumber}
                            onChange={handleChange}
                            placeholder="학번 입력"
                            size="small"
                            margin='normal'
                            fullWidth
                            error={!!errors.studentNumber}
                            helperText={errors.studentNumber}
                            sx={{mt: 3}}
                        />

                        {/* 성별, 학년 */}
                        <Grid container spacing={2} sx={{mt: 1}}>
                            {/* 성별 */}
                            <Grid item xs={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">성별</FormLabel>
                                    <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
                                        <FormControlLabel
                                            value="남"
                                            control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon} />}
                                            label="남"
                                            className="!mr-6"
                                        />
                                        <FormControlLabel
                                            value="여"
                                            control={<Radio icon={UncheckedIcon} checkedIcon={CheckedIcon} />}
                                            label="여"
                                            className="!mr-6"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                {errors.gender && (
                                    <Box sx={{color: "error.main", fontSize: 13, mt: 0.5}}>
                                        {errors.gender}
                                    </Box>
                                )}
                            </Grid>
                            {/* 학년 */}
                            <Grid item xs={6}>
                                <FormControl fullWidth size="small" sx={{mt: 3}}>
                                    <InputLabel id="school-year-label">학년</InputLabel>
                                    <Select
                                        labelId="school-year-label"
                                        label="학년"
                                        value={form.schoolYear}
                                        onChange={handleChange}   // e => setForm({...form, schoolYear: e.target.value})
                                        name="schoolYear"
                                    >
                                        <MenuItem value=""><em>학년 선택</em></MenuItem>
                                        <MenuItem value="1">1학년</MenuItem>
                                        <MenuItem value="2">2학년</MenuItem>
                                        <MenuItem value="3">3학년</MenuItem>
                                        <MenuItem value="4">4학년</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        {/* 버튼 */}
                        <Box display="flex" justifyContent="space-between" pt={4}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => setStep(2)}
                                sx={{
                                    color: "#375DDC",
                                    borderColor: "#E2E5ED",
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    px: 4,
                                    background: "#f5f8ff"
                                }}
                            >이전</Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(to bottom, #375DDC, #1F3EA6)",
                                    color: "#fff",
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    px: 4,
                                    '&:hover': {
                                        background: "linear-gradient(to bottom, #1F3EA6, #375DDC)"
                                    }
                                }}
                            >가입 완료</Button>
                        </Box>
                    </Box>
                )}

            </div>
        </div>
    );
}

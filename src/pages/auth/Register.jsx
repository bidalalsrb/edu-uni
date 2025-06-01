import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid";
import logo from "/public/bultiger.png";
import {useCreateCodsMutation, useValidationCodeMutation} from "./api/auth.js";

// Zod 스키마 정의 (배치코드 필드 추가)
const schema = z
    .object({
        id: z
            .string()
            .nonempty("아이디는 필수 입력입니다.")
            .regex(/^[A-Za-z0-9]+$/, "아이디는 특수문자를 사용할 수 없습니다."),
        name: z.string().nonempty("이름은 필수 입력입니다."),
        password: z
            .string()
            .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
            .max(15, "비밀번호는 최대 15자 이하이어야 합니다.")
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,15}$/,
                "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
            ),
        confirmPassword: z.string().nonempty("비밀번호 확인은 필수 입력입니다."),
        address: z.string().nonempty("주소는 필수 입력입니다."),
        batchCode: z.string().nonempty("배치코드는 필수 입력입니다."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
    });

function Register() {
    const {mutate: sendCodeApi} = useCreateCodsMutation();
    const {mutate: validationCodeApi} = useValidationCodeMutation();
    // const {createCodsMutation} = useCreateCodsMutation;
    const phoneNum = useRef('');
    const code = useRef('');
    const userPhoneInfo = useRef({
        phoneNum: '',
        code: '',
        uuid: '',
    });
    const sendCode = async () => {
        if (phoneNum !== '') {

            sendCodeApi({phoneNum: phoneNum.current.value}, {
                onSuccess: (data) => {
                    console.log('성공', data);
                    userPhoneInfo.current.phoneNum = phoneNum.current.value;
                },
                onError: (error) => {
                    console.error('실패', error);
                },
            });
            console.log('test');
        } else console.log('null;;')
    }

    const validationCode = () => {
        if (userPhoneInfo.current.phoneNum !== '' && code.current.value !== '') {
            userPhoneInfo.current.code = code.current.value;
            console.log(userPhoneInfo.current,'ssssssssss')
            validationCodeApi(userPhoneInfo.current, {
                onSuccess: (data) => {
                    console.log('성공', data);
                    userPhoneInfo.current.phoneNum = phoneNum.current.value;
                },
                onError: (error) => {
                    console.error('실패', error);
                },
            })
        }
    }

    ///////////////////////////////

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        // localStorage에 저장 시 confirmPassword 필드는 제거
        const {confirmPassword, ...userData} = data;
        localStorage.setItem("user", JSON.stringify(userData));
        alert("회원가입 성공! 이제 로그인하세요.");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-lg px-6 py-8 space-y-6">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="logo" className="w-40 h-auto object-contain" />
                </div>

                {/* 휴대폰 인증 폼 */}
                <form className="space-y-3">
                    <label className="text-gray-700 font-medium">휴대폰 번호</label>
                    <div className="flex gap-2">
                        <input
                            ref={phoneNum}
                            type="text"
                            placeholder="휴대폰 번호 ('-'제외)"
                            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 rounded-lg font-semibold"
                            onClick={sendCode}
                        >인증번호 발송</button>
                    </div>
                    <label className="text-gray-700 font-medium">인증 번호</label>
                    <div className="flex gap-2">
                        <input
                            ref={code}
                            type="text"
                            placeholder="인증번호 입력"
                            className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 rounded-lg font-semibold"
                            onClick={validationCode}
                        >인증 확인</button>
                    </div>
                </form>

                {/* 회원가입 폼 */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <label className="text-gray-700 font-medium">이름</label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="예) 김타이거"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <label className="text-gray-700 font-medium">아이디</label>
                    <input
                        {...register("id")}
                        type="text"
                        placeholder="예) bultiger"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}

                    <label className="text-gray-700 font-medium">비밀번호</label>
                    <div className="relative">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showPassword
                                ? <EyeSlashIcon className="w-6 h-6"/>
                                : <EyeIcon className="w-6 h-6"/>
                            }
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm">6~15자의 영문 숫자 특수문자를 포함해주세요</p>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <label className="text-gray-700 font-medium">비밀번호 확인</label>
                    <div className="relative">
                        <input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="비밀번호 확인"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-500"
                        >
                            {showConfirmPassword
                                ? <EyeSlashIcon className="w-6 h-6"/>
                                : <EyeIcon className="w-6 h-6"/>
                            }
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    <label className="text-gray-700 font-medium">주소</label>
                    <input
                        {...register("address")}
                        type="text"
                        placeholder="주소"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                    <label className="text-gray-700 font-medium">배치코드</label>
                    <input
                        {...register("batchCode")}
                        type="text"
                        placeholder="배치코드 입력"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    {errors.batchCode && <p className="text-red-500 text-sm">{errors.batchCode.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold mt-3"
                    >
                        회원가입
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full bg-gray-200 text-gray-700 p-3 rounded-lg font-semibold"
                    >
                        로그인 화면으로
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;

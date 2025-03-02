import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

// Zod 스키마 정의
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
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,10}$/,
                "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다."
            ),
        confirmPassword: z.string().nonempty("비밀번호 확인은 필수 입력입니다."),
        address: z.string().nonempty("주소는 필수 입력입니다."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirmPassword"],
    });

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        // localStorage에 저장 시 confirmPassword 필드는 제거
        const { confirmPassword, ...userData } = data;
        localStorage.setItem("user", JSON.stringify(userData));
        alert("회원가입 성공! 이제 로그인하세요.");
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            {/* 로고 */}
            <div className="mb-6">
                <img src="/public/bultiger.png" alt="logo" className="w-60" />
            </div>

            {/* 회원가입 폼 */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 grid grid-cols-4 gap-2">
                {/* 이름 */}
                <label className="col-span-4 text-gray-700 font-medium text-left">이름</label>
                <input
                    {...register("name")}
                    type="text"
                    placeholder="예) 김타이거"
                    className="col-span-4 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="col-span-4 text-red-500 text-sm text-left">{errors.name.message}</p>
                )}

                {/* 아이디 */}
                <label className="col-span-4 text-gray-700 font-medium text-left">아이디</label>
                <input
                    {...register("id")}
                    type="text"
                    placeholder="예) bultiger"
                    className="col-span-4 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.id && (
                    <p className="col-span-4 text-red-500 text-sm text-left">{errors.id.message}</p>
                )}

                {/* 비밀번호 */}
                <label className="col-span-4 text-gray-700 font-medium text-left">비밀번호</label>
                <div className="col-span-4 relative">
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호"
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                        ) : (
                            <EyeIcon className="w-6 h-6" />
                        )}
                    </button>
                </div>
                {/* 비밀번호 도움말 */}
                <p className="col-span-4 text-gray-500 text-sm text-left">
                    6~15자의 영문 숫자 특수문자를 포함해주세요
                </p>
                {errors.password && (
                    <p className="col-span-4 text-red-500 text-sm text-left">{errors.password.message}</p>
                )}

                {/* 비밀번호 확인 */}
                <label className="col-span-4 text-gray-700 font-medium text-left">비밀번호 확인</label>
                <div className="col-span-4 relative">
                    <input
                        {...register("confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="비밀번호 확인"
                        className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-500"
                    >
                        {showConfirmPassword ? (
                            <EyeSlashIcon className="w-6 h-6" />
                        ) : (
                            <EyeIcon className="w-6 h-6" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="col-span-4 text-red-500 text-sm text-left">{errors.confirmPassword.message}</p>
                )}

                {/* 주소 */}
                <label className="col-span-4 text-gray-700 font-medium text-left">주소</label>
                <input
                    {...register("address")}
                    type="text"
                    placeholder="주소"
                    className="col-span-4 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                    <p className="col-span-4 text-red-500 text-sm text-left">{errors.address.message}</p>
                )}

                {/* 버튼 */}
                <button type="submit" className="col-span-4 bg-blue-500 text-white p-3 rounded-md font-semibold mt-3">
                    회원가입
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="col-span-4 bg-gray-200 text-gray-700 p-3 rounded-md font-semibold"
                >
                    로그인 화면으로
                </button>
            </form>
        </div>
    );
}

export default Register;

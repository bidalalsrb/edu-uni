import { useNavigate } from "react-router-dom";
import logo from "/public/bultiger.png";
import { useSignInMutation } from "./api/auth.js";
import { useRef } from "react";

function Login() {
    const navigate = useNavigate();
    const { mutate } = useSignInMutation();
    const userId = useRef('');
    const userPassword = useRef('');
    const userLoginInfo = useRef({ userId: '', password: '' });

    const clickLoginBtn = (e) => {
        e.preventDefault();
        userLoginInfo.current.userId = userId.current.value;
        userLoginInfo.current.password = userPassword.current.value;
        mutate(userLoginInfo.current);
        navigate("/joinlist");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-lg px-6 py-8 space-y-6">
                {/* 로고 */}
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="logo" className="w-40 h-auto object-contain" />
                </div>
                <form className="space-y-5" onSubmit={clickLoginBtn}>
                    <input
                        ref={userId}
                        type="text"
                        placeholder="아이디"
                        className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        autoComplete="username"
                    />
                    <input
                        ref={userPassword}
                        type="password"
                        placeholder="비밀번호"
                        className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        autoComplete="current-password"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        className="w-full bg-blue-100 text-blue-600 p-3 rounded-lg font-semibold"
                        onClick={() => navigate("/register")}
                    >
                        회원가입
                    </button>
                </form>
                {/* 추가 옵션 */}
                <p className="mt-4 text-center text-gray-400 text-sm cursor-pointer hover:underline">
                    계정 정보를 잊어버렸어요
                </p>
            </div>
        </div>
    );
}
export default Login;

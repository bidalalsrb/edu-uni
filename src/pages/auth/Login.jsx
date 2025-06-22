import {useNavigate} from "react-router-dom";
import logo from "/public/bultiger.png";
import {useState} from "react";
import api from "../../util/api/api.js";

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        userId: "",
        password: "",
    });

    // input 핸들러 (name 기반)
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // submit 핸들러
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            //todo 쿠키 저장 확인
            console.log(loginData);
            // const response = await api.post("/auth/sign-in", loginData);
            // console.log('로그인',response);
            // const accessToken = response.data.data;
            // Sess.setItem("ACCESS_TOKEN", accessToken);
            navigate('/joinlist')
            alert("로그인 성공");
            // navigate('/conversation/list');
        } catch (error) {
            console.error(error);
            alert("로그인 실패");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-[430px] bg-white rounded-2xl shadow-lg px-6 py-8 space-y-6">
                {/* 로고 */}
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="logo" className="w-40 h-auto object-contain" />
                </div>
                <form className="space-y-5" onSubmit={submitForm}>
                    <input
                        type="text"
                        name="userId"
                        placeholder="아이디"
                        className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={handleChange}
                        value={loginData.userId}
                        autoComplete="username"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        className="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        onChange={handleChange}
                        value={loginData.password}
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

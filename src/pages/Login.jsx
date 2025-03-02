import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "/public/bultiger.png";

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id === data.id && storedUser.password === data.password) {
            alert("로그인 성공!");
            // 로그인 성공 후 신용 점수 화면으로 이동
            navigate("/joinlist");
        } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            {/* 로고 */}
            <div className="mb-6">
                <img src={logo} alt="logo" className="w-60" />
            </div>

            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4">
                <input
                    {...register("id")}
                    type="text"
                    placeholder="아이디"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="비밀번호"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold cursor-pointer">
                    로그인
                </button>
                <button
                    type="button"
                    className="w-full bg-blue-100 text-blue-500 p-3 rounded-md font-semibold cursor-pointer"
                    onClick={() => navigate("/register")}
                >
                    회원가입
                </button>
            </form>

            {/* 추가 옵션 */}
            <p className="mt-4 text-gray-500 cursor-pointer text-sm">
                계정 정보를 잊어버렸어요
            </p>
        </div>
    );
}

export default Login;

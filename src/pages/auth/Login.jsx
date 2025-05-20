import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import logo from "/public/bultiger.png";
import {useSignInMutation} from "./api/auth.js";
import {useRef} from "react";

function Login() {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const {mutate: mutation} = useSignInMutation();
    const userId = useRef('');
    const userPassword = useRef('');
    const userLoginInfo = useRef({
        userId: '',
        password: ''
    });
    const clickLoginBtn = () => {
        userLoginInfo.current.userId = userId.current.value;
        userLoginInfo.current.password = userPassword.current.value;
        console.log(userLoginInfo.current, 'userLoginInfo.current');
        mutation(userLoginInfo.current);
        navigate("/joinlist");
    }; // mutate 안에 데이터 넣으면 post요청 감


    const onSubmit = (data) => {
        //     // admin 계정이면 바로 로그인
        //     if (data.id === "admin" && data.password === "1q2w3e4r1!") {
        //         alert("로그인 성공!");
        //         navigate("/joinlist");
        //         return;
        //     }
        //     // 그렇지 않으면 로컬 스토리지에 저장된 사용자 정보 확인
        //     const storedUser = JSON.parse(localStorage.getItem("user"));
        //     if (storedUser && storedUser.id === data.id && storedUser.password === data.password) {
        //         alert("로그인 성공!");
        //         navigate("/joinlist");
        //     } else {
        //         alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        //     }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            {/* 로고 */}
            <div className="mb-6">
                <img src={logo} alt="logo" className="w-60"/>
            </div>

            {/* 로그인 폼 */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4">
                <p>id : admin | pwd : 1q2w3e4r1! </p>
                {/*<input*/}
                {/*    {...register("id")}*/}
                {/*    type="text"*/}
                {/*    placeholder="아이디"*/}
                {/*    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                {/*/>*/}
                {/*<input*/}
                {/*    {...register("password")}*/}
                {/*    type="password"*/}
                {/*    placeholder="비밀번호"*/}
                {/*    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"*/}
                {/*/>*/}
                <input
                    ref={userId}
                    type="text"
                    placeholder="아이디"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    ref={userPassword}
                    type="password"
                    placeholder="비밀번호"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={clickLoginBtn}
                        className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold cursor-pointer">
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

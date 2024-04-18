import { useNavigate } from "react-router";

const LoginContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[640px] h-full flex flex-col items-center justify-center px-[110px] gap-y-[70px]">
      <div className="w-full flex flex-col items-start justify-center gap-y-15">
        <div className="text-48 text-black font-bold">Login</div>
        <div className="text-24 text-gray-300 whitespace-pre-wrap">
          몰디브 관리자 페이지에 오신 걸<br />
          환영합니다.
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-20">
        <div className="w-full flex flex-col items-start justify-center gap-y-10">
          <div className="font-medium text-16">아이디</div>
          <input
            className="w-full border border-gray-100 bg-white rounded-input outline-none px-16 py-8"
            type="text"
            placeholder="관리자 이메일을 입력해주세요."
          />
        </div>
        <div className="w-full flex flex-col items-start justify-center gap-y-10">
          <div className="font-medium text-16">비밀번호</div>
          <input
            className="w-full border border-gray-100 rounded-input outline-none px-16 py-8"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
      </div>
      <button
        className="w-full px-32 py-16 bg-dark-300 text-white font-semibold text-18 rounded-button hover:bg-main transition-colors ease-in-out duration-300 border-none outline-none active:outline-none focus:outline-none"
        onClick={() => {
          navigate("/");
        }}
      >
        로그인
      </button>
      <div className="w-full flex items-center justify-start text-14 text-gray-200">
        새로운 관리자이신가요?
        <span className="text-dark-300 px-8 cursor-pointer hover:underline underline-offset-2">관리자 추가하기</span>
      </div>
    </div>
  );
};

export default LoginContainer;

import { useState } from "react";
import Logo from "../../assets/logo/logo_admin.svg?react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { headerState } from "../../recoil/header";

const Header = () => {
  const navigate = useNavigate();
  const headerProps = useRecoilValue(headerState);
  const [isUserCategoryHover, setIsUserCategoryHover] = useState(false);
  const [isReportCategoryHover, setIsReportCategoryHover] = useState(false);

  return (
    <div className="w-full h-[56px] flex items-center justify-between bg-black text-white sticky top-0 px-28 z-10">
      <Logo
        className="h-[30px] w-auto my-13 cursor-pointer"
        onClick={() => {
          navigate("/user/list");
        }}
      />
      <div className="flex h-full items-center justify-center gap-x-36">
        <div
          className={
            `relative h-full flex items-center border-b-2 text-gray-300 cursor-pointer ` +
            (headerProps.level1Selected === "회원정보 관리" ? "border-white" : "border-black")
          }
          onMouseEnter={() => setIsUserCategoryHover(true)}
          onMouseLeave={() => setIsUserCategoryHover(false)}
        >
          <div
            className={headerProps.level1Selected === "회원정보 관리" ? "text-white font-semibold" : "text-gray-400"}
            onClick={() => {
              navigate("/user/list");
            }}
          >
            회원정보 관리
          </div>
          <div
            className={
              `w-[170px] absolute top-[60px] left-1/2 -translate-x-1/2 bg-[#161D24] rounded-lg flex flex-col items-center justify-center p-8 gap-y-8 text-14 font-normal ` +
              (!isUserCategoryHover && "hidden")
            }
            onMouseEnter={() => setIsUserCategoryHover(true)}
            onMouseLeave={() => setIsUserCategoryHover(false)}
          >
            <div
              className={
                `rounded px-48 py-7 hover:bg-[#28323C] hover:text-white ` +
                (headerProps.level2Selected === "회원목록" ? "text-white" : "")
              }
              onClick={() => {
                navigate("/user/list");
              }}
            >
              회원목록
            </div>
          </div>
        </div>
        <div
          className={
            `relative h-full flex items-center border-b-2 text-gray-300 cursor-pointer ` +
            (headerProps.level1Selected === "신고 관리" ? "border-white" : "border-black")
          }
          onMouseEnter={() => setIsReportCategoryHover(true)}
          onMouseLeave={() => setIsReportCategoryHover(false)}
        >
          <div
            className={headerProps.level1Selected === "신고 관리" ? "text-white font-semibold" : "text-gray-400"}
            onClick={() => {
              navigate("/report/reception");
            }}
          >
            신고 관리
          </div>
          <div
            className={
              `w-[170px] absolute top-[60px] left-1/2 -translate-x-1/2 bg-[#161D24] rounded-lg flex flex-col items-center justify-center p-8 gap-y-8 text-14 font-normal ` +
              (!isReportCategoryHover && "hidden")
            }
            onMouseEnter={() => setIsReportCategoryHover(true)}
            onMouseLeave={() => setIsReportCategoryHover(false)}
          >
            <div
              className={
                `rounded px-48 py-7 hover:bg-[#28323C] hover:text-white ` +
                (headerProps.level2Selected === "신고접수" ? "text-white" : "")
              }
              onClick={() => {
                navigate("/report/reception");
              }}
            >
              신고접수
            </div>
            <div
              className={
                `rounded px-48 py-7 hover:bg-[#28323C] hover:text-white ` +
                (headerProps.level2Selected === "신고처리" ? "text-white" : "")
              }
              onClick={() => {
                navigate("/report/process");
              }}
            >
              신고처리
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-[#374553] rounded text-14 border-none outline-none active:outline-none focus:outline-none my-13"
        onClick={() => {
          navigate("/login");
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Header;

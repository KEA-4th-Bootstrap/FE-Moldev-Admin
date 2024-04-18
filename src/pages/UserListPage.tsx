import { useEffect, useState } from "react";
import FilterButton from "../components/mainPage/FilterButton";
import SearchWrapper from "../components/mainPage/SearchWrapper";
import TitleContainer from "../components/mainPage/TitleContainer";
import { UserListItemType } from "../data/type";
import { UserListDummyData } from "../data/dummy";
import LeftEnd from "../assets/icons/icon_page_left_end.svg?react";
import Left from "../assets/icons/icon_page_left.svg?react";
import Right from "../assets/icons/icon_page_right.svg?react";
import RightEnd from "../assets/icons/icon_page_right_end.svg?react";
import LeftEndDisabled from "../assets/icons/icon_page_left_end_disable.svg?react";
import LeftDisabled from "../assets/icons/icon_page_left_disable.svg?react";
import RightDisabled from "../assets/icons/icon_page_right_disable.svg?react";
import RightEndDisabled from "../assets/icons/icon_page_right_end_disable.svg?react";
import Close from "../assets/icons/icon_close.svg?react";
import { useSetRecoilState } from "recoil";
import { headerState } from "../recoil/header";

const UserListPage = () => {
  const setHeaderProps = useSetRecoilState(headerState);
  const [userList, setUserList] = useState<UserListItemType[]>([]);
  const [currentUserList, setCurrentUserList] = useState<UserListItemType[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalList, setTotalList] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserListItemType | null>(null);

  useEffect(() => {
    setUserList(UserListDummyData);
  }, []);

  useEffect(() => {
    setHeaderProps({ level1Selected: "회원정보 관리", level2Selected: "회원목록" });
  }, [setHeaderProps]);

  useEffect(() => {
    if (userList.length <= 0) return;
    setTotalPage(Math.ceil(userList.length / 10));
    setTotalList(Math.ceil(userList.length / 10 / 5));
    setCurrentPage(1);
    setCurrentList(1);
  }, [userList]);

  useEffect(() => {
    const getPageNumbers = () => {
      const startPage = (currentList - 1) * 5 + 1;
      const endPage = Math.min(startPage + 4, totalPage);
      return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
    };

    setPageNumbers(getPageNumbers());
  }, [currentList, totalPage]);

  useEffect(() => {
    if (userList.length <= 0) return;
    const startIdx = (currentPage - 1) * 10;
    const endIdx = Math.min(startIdx + 10, userList.length);
    setCurrentUserList(userList.slice(startIdx, endIdx));
  }, [currentPage, userList]);

  return (
    <div className="w-full h-full">
      <TitleContainer level1="회원정보 관리" level2="회원목록" />
      <div className="w-full grow flex flex-col items-start justify-center p-24 pb-36 gap-y-8">
        <div className="w-full flex items-center justify-between">
          <SearchWrapper />
          <FilterButton>
            <>
              <div className="w-full p-12 border-b border-admin-gray-border cursor-pointer">가입일 오름차순</div>
              <div className="w-full p-12 cursor-pointer">가입일 내림차순</div>
            </>
          </FilterButton>
        </div>
        <div className="w-full flex items-center justify-start py-13 px-4 text-14 text-gray-300">
          <span className="font-semibold text-main">{userList.length}</span>개의 결과
        </div>
        <div className="w-full grow flex flex-col items-center justify-between">
          <table className="w-full table-fixed">
            <thead className="pb-8 border-b-2 border-admin-gray-border">
              <tr>
                <th className="w-[10%]">회원번호</th>
                <th className="w-[20%]">이메일</th>
                <th className="w-[15%]">몰디브아이디</th>
                <th className="w-[15%]">유저명</th>
                <th className="w-[13%]">섬 이름</th>
                <th className="w-[7%]">누적 경고 수</th>
                <th className="w-[10%]">마케팅 동의</th>
                <th className="w-[10%]">탈퇴처리</th>
              </tr>
            </thead>
            <tbody>
              {currentUserList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>@{user.moldevId}</td>
                  <td>{user.name}</td>
                  <td>{user.islandName}</td>
                  <td>{user.totalWarning}</td>
                  <td>{user.marketingAgree ? "동의" : "미동의"}</td>
                  <td
                    className="text-negative cursor-pointer hover:underline underline-offset-2"
                    onClick={() => setSelectedUser(user)}
                  >
                    탈퇴하기
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex items-center justify-end p-40">
          <div className="flex items-center justify-center rounded-2xl bg-white border border-admin-gray-border">
            <div className="w-12 h-12 flex items-center justify-center">
              {currentPage === 1 ? (
                <LeftEndDisabled className="cursor-not-allowed" width={24} height={24} />
              ) : (
                <LeftEnd
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => {
                    setCurrentPage(1);
                    setCurrentList(1);
                  }}
                />
              )}
            </div>
            <div className="w-12 h-12 flex items-center justify-center border-l border-admin-gray-border cursor-pointer">
              {currentList === 1 ? (
                <LeftDisabled className="cursor-not-allowed" width={24} height={24} />
              ) : (
                <Left
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => {
                    setCurrentPage((currentList - 1) * 5);
                    setCurrentList(currentList - 1);
                  }}
                />
              )}
            </div>
            {pageNumbers.map((pageNumber, idx) => (
              <div
                key={idx}
                className={
                  `w-12 h-12 flex items-center justify-center border-l border-admin-gray-border cursor-pointer ` +
                  (pageNumber === currentPage ? "text-white bg-admin-black-bg" : "text-admin-black bg-white")
                }
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </div>
            ))}
            <div className="w-12 h-12 flex items-center justify-center border-l border-admin-gray-border">
              {currentList === totalList ? (
                <RightDisabled width={24} height={24} className="cursor-not-allowed" />
              ) : (
                <Right
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => {
                    setCurrentPage(currentList * 5 + 1);
                    setCurrentList(currentList + 1);
                  }}
                />
              )}
            </div>
            <div className="w-12 h-12 flex items-center justify-center border-l border-admin-gray-border">
              {currentPage === totalPage ? (
                <RightEndDisabled width={24} height={24} className="cursor-not-allowed" />
              ) : (
                <RightEnd
                  className="cursor-pointer"
                  width={24}
                  height={24}
                  onClick={() => {
                    setCurrentPage(totalPage);
                    setCurrentList(totalList);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedUser && (
        <div
          className="fixed top-0 left-0 overflow-hidden w-screen h-screen z-10 bg-black/30 flex items-center justify-center"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-2/5 rounded-md bg-white px-20 pt-36 pb-16 flex flex-col items-start justify-center gap-y-20 relative"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="font-bold text-24">회원 탈퇴</div>
            <Close
              className="absolute top-4 right-4 cursor-pointer"
              width={24}
              height={24}
              onClick={() => setSelectedUser(null)}
            />
            <div className="w-full rounded-md bg-gray-50 p-16 py-20 flex flex-col gap-y-16">
              <div className="w-full flex items-center justify-start gap-x-20 text-13">
                <div className="font-bold">유저 이메일</div>
                <div className="text-gray-800">{selectedUser.email}</div>
              </div>
              <div className="w-full flex items-center justify-start gap-x-20 text-13">
                <div className="font-bold">유저명</div>
                <div className="text-gray-800">{selectedUser.name}</div>
              </div>
              <div className="w-full flex items-center justify-start gap-x-20 text-13">
                <div className="font-bold">섬 이름</div>
                <div className="text-gray-800">{selectedUser.islandName}</div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center text-14 text-gray-800">
              회원탈퇴 시 데이터는 복구되지 않습니다. 정말로 탈퇴처리하시겠습니까?
            </div>
            <div className="flex items-center justify-center w-full gap-x-8 h-[48px] mt-20">
              <button className="flex grow h-full items-center justify-center bg-gray-50 px-32 py-8 rounded-md border-none outline-none hover:border-none active:outline-none focus-within:outline-none">
                취소
              </button>
              <button className="flex grow h-full items-center justify-center bg-negative text-white px-32 py-8 rounded-md border-none outline-none hover:border-none active:outline-none focus-within:outline-none">
                탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListPage;

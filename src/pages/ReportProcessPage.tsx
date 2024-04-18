import { useEffect, useState } from "react";
import FilterButton from "../components/mainPage/FilterButton";
import SearchWrapper from "../components/mainPage/SearchWrapper";
import TitleContainer from "../components/mainPage/TitleContainer";
import { ReportProcessItemType } from "../data/type";
import { ReportProcessDummyData } from "../data/dummy";
import LeftEnd from "../assets/icons/icon_page_left_end.svg?react";
import Left from "../assets/icons/icon_page_left.svg?react";
import Right from "../assets/icons/icon_page_right.svg?react";
import RightEnd from "../assets/icons/icon_page_right_end.svg?react";
import LeftEndDisabled from "../assets/icons/icon_page_left_end_disable.svg?react";
import LeftDisabled from "../assets/icons/icon_page_left_disable.svg?react";
import RightDisabled from "../assets/icons/icon_page_right_disable.svg?react";
import RightEndDisabled from "../assets/icons/icon_page_right_end_disable.svg?react";
import RightArrow from "../assets/icons/icon_arrow_right_white.svg?react";
import DownArrow from "../assets/icons/icon_arrow_down.svg?react";
import Close from "../assets/icons/icon_close.svg?react";
import { useSetRecoilState } from "recoil";
import { headerState } from "../recoil/header";

const ReportProcessPage = () => {
  const setHeaderProps = useSetRecoilState(headerState);
  const [reportList, setReportList] = useState<ReportProcessItemType[]>([]);
  const [currentReportList, setCurrentReportList] = useState<ReportProcessItemType[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalList, setTotalList] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentList, setCurrentList] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportProcessItemType | null>(null);
  const [reportResult, setReportResult] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setReportList(ReportProcessDummyData);
  }, []);

  useEffect(() => {
    setHeaderProps({ level1Selected: "신고 관리", level2Selected: "신고처리" });
  }, [setHeaderProps]);

  useEffect(() => {
    if (reportList.length <= 0) return;
    setTotalPage(Math.ceil(reportList.length / 10));
    setTotalList(Math.ceil(reportList.length / 10 / 5));
    setCurrentPage(1);
    setCurrentList(1);
  }, [reportList]);

  useEffect(() => {
    const getPageNumbers = () => {
      const startPage = (currentList - 1) * 5 + 1;
      const endPage = Math.min(startPage + 4, totalPage);
      return Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
    };

    setPageNumbers(getPageNumbers());
  }, [currentList, totalPage]);

  useEffect(() => {
    if (reportList.length <= 0) return;
    const startIdx = (currentPage - 1) * 10;
    const endIdx = Math.min(startIdx + 10, reportList.length);
    setCurrentReportList(reportList.slice(startIdx, endIdx));
  }, [currentPage, reportList]);

  useEffect(() => {
    console.log(currentReportList);
  }, [currentReportList]);

  useEffect(() => {
    setIsOpen(false);
  }, [reportResult]);

  return (
    <div className="w-full h-full">
      <TitleContainer level1="신고 관리" level2="처리 현황" />
      <div className="w-full grow flex flex-col items-start justify-center p-24 pb-36 gap-y-8">
        <div className="w-full flex items-center justify-between">
          <SearchWrapper />
          <FilterButton>
            <>
              <div className="w-full p-12 border-b border-admin-gray-border cursor-pointer">처리일자 오름차순</div>
              <div className="w-full p-12 border-b border-admin-gray-border cursor-pointer">처리일자 내림차순</div>
              <div className="w-full p-12 border-b border-admin-gray-border cursor-pointer">신고일자 오름차순</div>
              <div className="w-full p-12 cursor-pointer">신고일자 내림차순</div>
            </>
          </FilterButton>
        </div>
        <div className="w-full flex items-center justify-start py-13 px-4 text-14 text-gray-300">
          <span className="font-semibold text-main">{reportList.length}</span>개의 결과
        </div>
        <div className="w-full grow flex flex-col items-center justify-between">
          <table className="w-full table-fixed">
            <thead className="pb-8 border-b-2 border-admin-gray-border">
              <tr>
                <th className="w-[10%]">신고번호</th>
                <th className="w-[10%]">유형</th>
                <th className="w-[20%]">대상 유저</th>
                <th className="w-[20%]">사유</th>
                <th className="w-[10%]">신고일자</th>
                <th className="w-[10%]">처리일자</th>
                <th className="w-[10%]">처리</th>
                <th className="w-[10%]">수정</th>
              </tr>
            </thead>
            <tbody>
              {currentReportList.map((report, idx) => (
                <tr key={idx}>
                  <td>{report.id}</td>
                  <td className="flex items-center justify-start">
                    {report.type === "article" ? (
                      <div className="px-8 py-2 rounded-lg bg-[#00AAFE] bg-opacity-[0.12] text-[#00AAFE] text-14">
                        게시글
                      </div>
                    ) : (
                      <div className="px-8 py-2 rounded-lg bg-[#4FC938] bg-opacity-[0.12] text-[#4FC938] text-14">
                        댓글
                      </div>
                    )}
                  </td>
                  <td>{report.targetEmail}</td>
                  <td>{report.reasonType}</td>
                  <td>{report.createdDate}</td>
                  <td>{report.processedDate}</td>
                  <td className={`${report.result === "ignore" ? "text-main" : "text-negative"}`}>
                    {report.result === "ignore"
                      ? "반려"
                      : report.result === "forever"
                        ? "계정 정지"
                        : "제재 " + report.result + "일"}
                  </td>
                  <td>
                    <button
                      className={`px-4 py-2 rounded-lg ${report.result === "ignore" ? "bg-main" : "bg-negative"} text-white text-14 flex items-center justify-center pl-16 pr-12 border-none outline-none hover:outline-none active:outline-none focus:outline-none`}
                      onClick={() => {
                        setSelectedReport(report);
                        setReportResult(
                          report.result === "ignore"
                            ? "반려"
                            : report.result === "forever"
                              ? "계정 정지"
                              : "제재 " + report.result + "일",
                        );
                      }}
                    >
                      <div>수정</div>
                      <RightArrow width={24} height={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex items-center justify-end py-40">
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
      {selectedReport && (
        <div
          className="fixed top-0 left-0 overflow-hidden w-screen h-screen z-10 bg-black/30 flex items-center justify-center"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="w-2/5 rounded-md bg-white px-20 py-36 flex flex-col items-start justify-center gap-y-20 relative"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="font-bold text-24">신고 처리</div>
            <Close
              className="absolute top-4 right-4 cursor-pointer"
              width={24}
              height={24}
              onClick={() => setSelectedReport(null)}
            />
            <div className="w-full flex flex-col gap-y-10">
              <div className="font-bold text-15 text-gray-800">
                신고 대상 {selectedReport.type === "article" ? "게시글" : "댓글"}
              </div>
              <div className="rounded-md bg-gray-50 p-16 h-[130px]">{selectedReport.content}</div>
            </div>
            <div className="w-full flex flex-col gap-y-16">
              <div className="w-full flex items-center justify-start gap-x-20 text-13">
                <div className="font-bold">신고 대상 계정</div>
                <div className="text-gray-800">{selectedReport.targetEmail}</div>
              </div>
              <div className="w-full flex items-center justify-start gap-x-20 text-13">
                <div className="font-bold">신고 접수 일시</div>
                <div className="text-gray-800">{selectedReport.createdDate}</div>
              </div>
            </div>
            <div className="w-full h-[48px] flex items-center justify-center gap-x-8">
              <div className="flex grow h-full items-center justify-center relative">
                <div
                  className="flex w-full h-full items-center justify-center px-16 gap-x-4 rounded-md border border-admin-gray-border cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="flex items-center justify-center grow">
                    {!reportResult ? "처리 방안을 선택해주세요." : reportResult}
                  </div>
                  <DownArrow
                    className={`${isOpen ? "rotate-180" : "rotate-0"} transition-all ease-in-out duration-150`}
                    width={24}
                    height={24}
                  />
                </div>
                <div
                  className={`absolute top-[60px] w-full ${isOpen ? "flex" : "hidden"} flex-col items-start justify-center bg-white shadow-xl rounded-md`}
                >
                  <div
                    className="w-full px-12 py-8 border-b border-admin-gray-border cursor-pointer"
                    onClick={() => setReportResult("제재 1일")}
                  >
                    제재 1일
                  </div>
                  <div
                    className="w-full px-12 py-8 border-b border-admin-gray-border cursor-pointer"
                    onClick={() => setReportResult("제재 3일")}
                  >
                    제재 3일
                  </div>
                  <div
                    className="w-full px-12 py-8 border-b border-admin-gray-border cursor-pointer"
                    onClick={() => setReportResult("제재 7일")}
                  >
                    제재 7일
                  </div>
                  <div
                    className="w-full px-12 py-8 border-b border-admin-gray-border cursor-pointer"
                    onClick={() => setReportResult("제재 30일")}
                  >
                    제재 30일
                  </div>
                  <div className="w-full px-12 py-8 cursor-pointer" onClick={() => setReportResult("계정 정지")}>
                    계정 정지
                  </div>
                </div>
              </div>
              <div className="flex h-full items-center justify-center gap-x-8">
                <button className="flex h-full items-center justify-center bg-gray-50 px-32 py-8 rounded-md border-none outline-none hover:border-none active:outline-none focus-within:outline-none">
                  취소
                </button>
                <button className="flex h-full items-center justify-center bg-main text-white px-32 py-8 rounded-md border-none outline-none hover:border-none active:outline-none focus-within:outline-none">
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportProcessPage;

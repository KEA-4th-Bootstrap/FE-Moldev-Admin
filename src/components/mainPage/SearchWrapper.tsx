import Search from "../../assets/icons/icon_search_gray.svg?react";

const SearchWrapper = () => {
  return (
    <div className="w-[480px] flex items-center justify-start px-12 py-6 gap-x-12 rounded-lg bg-[#F7F8F9]">
      <Search width={24} height={24} />
      <input
        className="grow h-full bg-transparent outline-none text-14 font-normal text-admin-black placeholder:text-admin-gray"
        type="text"
        placeholder="@UserName으로 검색해보세요"
      />
    </div>
  );
};

export default SearchWrapper;

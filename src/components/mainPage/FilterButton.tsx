import { ReactNode, useState } from "react";
import Down from "../../assets/icons/icon_arrow_down.svg?react";

const FilterButton = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button className="relative flex w-[200px] h-[52px] items-center justify-center border border-[#E9EBEE] rounded-lg bg-white outline-none hover:outline-none active:outline-none focus:outline-none hover:border-[#E9EBEE]">
      <div className="flex w-full h-full items-center justify-center gap-x-8" onClick={() => setIsOpen(!isOpen)}>
        <div className="grow text-14 text-admin-black">정렬</div>
        <Down
          className={`${isOpen ? "rotate-180" : "rotate-0"} transition-all ease-in-out duration-150`}
          width={24}
          height={24}
        />
      </div>
      <div
        className={`absolute top-[60px] w-full ${isOpen ? "flex" : "hidden"} flex-col items-start justify-center bg-white shadow-xl rounded-md text-14`}
      >
        {children}
      </div>
    </button>
  );
};

export default FilterButton;

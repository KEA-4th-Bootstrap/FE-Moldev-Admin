import Right from "../../assets/icons/icon_arrow_right.svg?react";

const TitleContainer = ({ level1, level2 }: { level1: string; level2?: string }) => {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-y-4 px-8 pt-36 pb-52">
      <div className="flex items-center justify-start gap-x-8 text-14">
        <div className={level2 ? "text-[#646F7C]" : "font-semibold text-[#161D24"}>{level1}</div>
        <Right width={18} height={18} />
        <div className="font-semibold text-[#161D24]">{level2}</div>
      </div>
      <div className="text-24 font-semibold">{level2}</div>
    </div>
  );
};

export default TitleContainer;

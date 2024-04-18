import { atom } from "recoil";

export interface HeaderProps {
  level1Selected: string;
  level2Selected: string;
}

export const headerState = atom<HeaderProps>({
  key: "headerState",
  default: {
    level1Selected: "회원정보 관리",
    level2Selected: "회원목록",
  },
});

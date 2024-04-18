import { Outlet } from "react-router";
import Header from "../components/mainPage/Header";

const MainPage = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-between overflow-y-scroll">
      <Header />
      <div className="w-full min-h-screen grow flex items-center justify-center px-120 pt-[56px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;

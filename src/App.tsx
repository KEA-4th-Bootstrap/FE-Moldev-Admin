import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserListPage from "./pages/UserListPage";
import ReportReceptionPage from "./pages/ReportReceptionPage";
import ReportProcessPage from "./pages/ReportProcessPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Navigate replace to="/user/list" />} />
            <Route path="user/list" element={<UserListPage />} />
            <Route path="report/reception" element={<ReportReceptionPage />} />
            <Route path="report/process" element={<ReportProcessPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;

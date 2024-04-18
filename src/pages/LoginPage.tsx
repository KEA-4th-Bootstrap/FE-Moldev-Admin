import LoginContainer from "../components/loginPage/LoginContainer";
import ModelContainer from "../components/loginPage/ModelContainer";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ModelContainer />
      <LoginContainer />
    </div>
  );
};

export default LoginPage;

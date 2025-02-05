import { Route, Routes } from "react-router-dom";
import { getEnviroments } from "../conf/enviroments";
import AuthPage from "../pages/AuthPage/AuthPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import GetEmployeePage from "../pages/GetEmployeePage";
import RegisterUser from "../pages/RegistPage/RegistPage";

const Router: React.FC = () => {
  const isLoggedIn = sessionStorage.getItem(getEnviroments().PW_SESSION);
  return (
    <>
      <Routes>
        <Route path="/" Component={isLoggedIn ? Dashboard : AuthPage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/new_user" Component={RegisterUser} />
        <Route path="/get_employee" Component={GetEmployeePage} />
      </Routes>
    </>
  );
};

export default Router;

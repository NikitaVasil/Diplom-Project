import Hemlet from "react-helmet";
import AuthFormik from "../../components/ui/AuthFormik";
import logo from "../../img/logo-900.png";

const AuthPage: React.FC = () => {
  return (
    <div className=" bg-white">
      <Hemlet>
        <title>
          Вход в систему Управления разработкой технической документации
        </title>
      </Hemlet>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-aut"
            src={logo}
            alt="Логотип Института навигации"
          />
          <h3 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Авторизация
          </h3>
          <AuthFormik />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

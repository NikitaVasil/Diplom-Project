import Hemlet from "react-helmet";
import RegistFormik from "../../components/ui/RegistFormik";
import logo from "../../img/logo-900.png";

const RegisterUser: React.FC = () => {
  return (
    <>
      <Hemlet>
        <title>Регистрация пользователя</title>
      </Hemlet>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-aut"
            src={logo}
            alt="Логотип Института навигации"
          />
          <h3 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Регистрация пользователя
          </h3>
          <RegistFormik />
        </div>
      </div>
    </>
  );
};

export default RegisterUser;

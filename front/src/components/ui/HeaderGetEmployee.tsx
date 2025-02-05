import { useNavigate } from "react-router-dom";
import logo from "../../img/logo-500.png";

const HeaderGetEmployee = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = sessionStorage.getItem("userRole");

  const TeamLeed = () => {
    if (role == "admin") {
      return true;
    }
  };

  // const pageUpdate = () => {
  //   navigate("/");
  // };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className=" flex justify-between dark:text-white items-center">
        {/* Left Side */}

        <div className=" flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className=" h-8 w-9 " />
          <h3 className=" inline-block font-bold font-sans md:text-lg">
            Техническая <p className=" -mt-2">документация</p>
          </h3>
        </div>

        {/* Right Side */}
        <div className=" flex space-x-4 items-center md:space-x-6">
          <button
            className={TeamLeed() ? " hidden md:block button" : " hidden"}
            onClick={() => {
              navigate("/new_user");
            }}
          >
            + Добавить нового пользователя
          </button>

          <button
            className={TeamLeed() ? " hidden md:block button" : " hidden"}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Вернуться назад
          </button>

          <button
            className={TeamLeed() ? " button py-1 px-3 md:hidden" : " hidden"}
            onClick={() => {
              navigate("/new_user");
            }}
          >
            +
          </button>

          <button
            className={TeamLeed() ? " button py-1 px-3 md:hidden" : " hidden"}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Назад
          </button>
        </div>
      </header>
    </div>
  );
};

export default HeaderGetEmployee;

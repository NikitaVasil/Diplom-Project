/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router";

function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }: any) {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");
  const role = sessionStorage.getItem("userRole");
  const [logout, setLogout] = useState(false);

  if (logout == true) {
    setTimeout(() => {
      navigate("/");
    }, 300);
  }

  const TeamLeed = () => {
    if (role == "admin") {
      return true;
    }
  };

  const rootAdmin = () => {
    if (role == "admin" && userName == "root") {
      return true;
    }
  };

  const logOff = () => {
    sessionStorage.clear();
    setLogout(true);
    // navigate("/");
  };

  return (
    <div
      className={
        type === "Панель"
          ? " absolute  top-16  right-5"
          : " absolute  top-6  right-4"
      }
    >
      <div className=" flex justify-end items-center">
        <div className=" w-60 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg  h-auto pr-12">
          <p className=" font-bold ">{userName}</p>
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className={
              TeamLeed()
                ? " cursor-pointer dark:text-gray-400 text-gray-700"
                : " hidden"
            }
          >
            Редактировать {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className={TeamLeed() ? " cursor-pointer text-red-500" : " hidden"}
          >
            Удалить {type}
          </p>

          <p
            onClick={() => {
              navigate("/new_user");
            }}
            className={
              rootAdmin() && type === "Панель"
                ? " cursor-pointer dark:text-gray-400 text-gray-700"
                : " hidden"
            }
          >
            Добавить пользователя
          </p>

          <p
            onClick={() => {
              navigate("/get_employee");
            }}
            className={
              rootAdmin() && type === "Панель"
                ? " cursor-pointer dark:text-gray-400 text-gray-700"
                : " hidden"
            }
          >
            Посмотреть список пользователей
          </p>

          <p
            onClick={() => logOff()}
            className={
              type === "Панель"
                ? " cursor-pointer dark:text-gray-400 text-gray-700"
                : " hidden"
            }
          >
            Выход
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;

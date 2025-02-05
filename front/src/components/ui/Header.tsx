/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import iconDown from "../../assets/icon-chevron-down.svg";
import iconUp from "../../assets/icon-chevron-up.svg";
// import elipsis from "../../assets/icon-vertical-ellipsis.svg";
import AddEditBoardModal from "../../components/modals/AddEditBoardModal";
import AddEditTaskModal from "../../components/modals/AddEditTaskModal";
import DeleteModal from "../../components/modals/DeleteModal";
import ElipsisMenu from "../../components/modals/ElipsisMenu";
import logo from "../../img/logo-500.png";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";
import HeaderDropdown from "./HeaderDropdown";

const Header = ({ setBoardModalOpen, boardModalOpen }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteBoard, setDeleteBoard] = useState(false);
  // const [isFirst, setIsFirst] = useState(true);

  const role = sessionStorage.getItem("userRole");
  const userName = sessionStorage.getItem("userName");

  function getUpperCaseLetters(str: string): string[] {
    const upperCaseLetters = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i].toUpperCase() === str[i]) {
        upperCaseLetters.push(str[i]);
      }
    }
    // console.log(upperCaseLetters.join("").trim().replace(" ", ""));
    return upperCaseLetters;
  }

  function joinArrayElements(arr: string[]): string {
    return arr.join("");
  }
  // let initials: any;
  // if (userName != null && isFirst == true) {
  //   for (let i = 0; i <= userName.length; i++) {
  //     if (userName[i] === userName[i].toUpperCase()) {
  //       initials += userName[i];
  //       console.log(initials);
  //     }
  //   }
  //   setIsFirst(false);
  // }

  const TeamLeed = () => {
    if (role == "admin") {
      return true;
    }
  };

  const pageUpdate = () => {
    navigate("/");
  };

  const [openDropdown, setOpenDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const currentState = store.getState().boards.boards;
  let name: any;
  if (currentState.length != 0) {
    currentState.map((board: any) => {
      if (board.isActive) {
        name = board.name;
      }
    });
  } else {
    name = "Создать новую панель";
  }

  if (deleteBoard == true) {
    if (currentState.length != 0) {
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setTimeout(() => {
        pageUpdate();
      }, 500);
      setDeleteBoard(false);
    } else {
      setDeleteBoard(false);
    }
  }

  const onDeleteBtnClick = (e: any) => {
    if (e.target.textContent === "Удалить") {
      dispatch(boardsSlice.actions.deleteBoard());
      navigate("/");
      setDeleteBoard(true);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <header className=" flex justify-between dark:text-white items-center">
        {/* Left Side */}

        <div className=" flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className=" h-8 w-9 " />
          <h3 className=" hidden md:inline-block font-bold font-sans md:text-lg">
            Техническая <p className=" -mt-2">документация</p>
          </h3>
          <div className=" flex items-center">
            <h3 className=" truncate max-w-[200px] md:text-lg text-lg font-bold md:ml-10 font-sans">
              {name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt="dropdown icon"
              className=" w-3 ml-2 md:hidden cursor-pointer"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className=" flex space-x-4 items-center md:space-x-6">
          <button
            className={TeamLeed() ? " hidden md:block button" : " hidden"}
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
          >
            + Новая задача
          </button>

          <button
            className={TeamLeed() ? " button py-1 px-3 md:hidden" : " hidden"}
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
          >
            +
          </button>
          <button
            className=" button w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
          >
            {joinArrayElements(
              getUpperCaseLetters(userName != null ? userName : " ")
            )
              .trim()
              .replace(" ", "") || "ROOT"}
          </button>
          <img className=" cursor-pointer h-8" />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Панель"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>
      </header>

      {openDropdown && (
        <HeaderDropdown
          setBoardModalOpen={setBoardModalOpen}
          setOpenDropdown={setOpenDropdown}
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          type={"add"}
          setOpenAddEditTask={setOpenAddEditTask}
          device="mobile"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="панель"
          title={name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
};

export default Header;

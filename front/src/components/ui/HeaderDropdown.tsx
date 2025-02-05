/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortBy } from "lodash";
import { useDispatch } from "react-redux";
import useBoards from "../../Hooks/useBoards";
import useRenderCount from "../../Hooks/useRenderCount";
import boardIcon from "../../assets/icon-board.svg";
import { getEnviroments } from "../../conf/enviroments";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";

function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }: any) {
  const dispatch = useDispatch();
  const keyBoard = "boardId";
  const token_test = sessionStorage.getItem(getEnviroments().PW_SESSION);
  let token = "";
  if (!token_test) {
    console.error("Ошибка токена");
  } else {
    token = token_test;
  }

  const boards = useBoards(token).allBoards; //custom-hook

  //сортировка массива с панелями
  const sortBoards = sortBy(boards, ["id"]);

  sortBoards.map((board: any) => {
    sessionStorage.setItem("userId", board.userId);
  });

  const currentState = store.getState().boards.boards;

  if (useRenderCount() == 3 && currentState.length == 0) {
    sortBoards.map((board: any) => {
      dispatch(boardsSlice.actions.addBoardStateIsBD({ board }));
    });
    const boardId = sortBoards.length;
    localStorage.setItem(keyBoard, boardId.toString());
  }

  currentState.map((board: any) => {
    sessionStorage.setItem("userId", board.userId);
  });

  return (
    <div
      className=" py-10 px-6 absolute left-0 right-0
        bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* Dropdown Modal */}

      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
          Все доски: {currentState.length}
        </h3>
        <div>
          {currentState.map((board: any, index: any) => (
            <div
              className={`cursor-pointer flex items-baseline space-x-2 px-5 py-4
                ${
                  board.isActive &&
                  "bg-[#635fc7] rounded-r-full text-white mr-8 "
                }`}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ board, index }));
                setOpenDropdown(false);
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className=" cursor-pointer flex items-baseline space-x-2  text-[#635fc7] px-5 py-4  "
          >
            <img src={boardIcon} className=" filter-white  h-4 " />
            <p className=" text-lg font-bold  ">Создать новую Панель</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;

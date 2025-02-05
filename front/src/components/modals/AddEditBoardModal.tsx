/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../../assets/icon-cross.svg";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";

function AddEditBoardModal({ setBoardModalOpen, type }: any) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");

  const [_isValid, setIsValid] = useState(true);
  // const [columnUpd, setColumnUpd] = useState(false);

  const keyBoard = "boardId";
  const locBoardId = localStorage.getItem(keyBoard);
  const currentId = "curId";
  const locCurId = localStorage.getItem(currentId);

  let board: any = [];

  board = store.getState().boards.boards;

  const stateColumns = [
    {
      name: "В работе",
      id: uuidv4(),
      boardId: locBoardId != null ? locBoardId : "0",
      tasks: [],
    },
    {
      name: "Выполнено",
      id: uuidv4(),
      boardId: locBoardId != null ? locBoardId : "0",
      tasks: [],
    },
  ];

  const stateCol = () => {
    if (board != null) {
      const boardColumnActive = board.map((board: any) => {
        if (board.isActive) {
          return board.columns;
        }
      });
      return boardColumnActive[0];
      // console.log("activeBoard", boardColumnActive);
    } else {
      return stateColumns;
    }
  };

  let arrColumns: any = [];

  arrColumns = stateCol();

  const [newColumns, setNewColumns] = useState(arrColumns);

  if (locCurId == null) {
    board.map((board: any) => {
      if (board.isActive) {
        localStorage.setItem(currentId, board.id);
      }
    });
  }

  if (type === "edit" && isFirstLoad && board.lenght != 0) {
    board.map((board: any) => {
      if (board.isActive) {
        setNewColumns(board.columns);
        setName(board.name);
      }
    });
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    if (newColumns != undefined) {
      for (let i = 0; i < newColumns.length; i++) {
        if (!newColumns[i].name.trim()) {
          return false;
        }
      }
      setIsValid(true);
      return true;
    }
  };

  const onChange = (id: any, newValue: string) => {
    const column: any = [];
    newColumns.forEach((element: any) =>
      column.push(Object.assign({}, element))
    );
    // console.log(column);
    column.find((col: any) => col.id === id);
    if (column != undefined) {
      column.name = newValue;
    }
    setNewColumns(column);
  };

  const onDelete = (id: any) => {
    setNewColumns((prevState: any[] | undefined) =>
      prevState != undefined
        ? prevState.filter((el) => el.id !== id)
        : stateCol()
    );
  };

  const onSubmit = (type: string) => {
    setBoardModalOpen(false);
    if (type === "add" && locBoardId == null) {
      const locBoardId = "0";
      localStorage.setItem(currentId, locBoardId);
      dispatch(
        boardsSlice.actions.addBoardState({ name, newColumns, locBoardId })
      );
      const getId = parseInt(locBoardId);
      const boardId = getId + 1;
      localStorage.setItem(keyBoard, boardId.toString());
    } else if (type === "add" && locBoardId != null) {
      localStorage.setItem(currentId, locBoardId);
      dispatch(
        boardsSlice.actions.addBoardState({ name, newColumns, locBoardId })
      );
      const getId = parseInt(locBoardId);
      const boardId = getId + 1;
      localStorage.setItem(keyBoard, boardId.toString());
    } else {
      let id: any;
      board.map((board: any) => {
        if (board.isActive) {
          id = board.id;
        }
      });
      localStorage.setItem(currentId, id);
      dispatch(boardsSlice.actions.editBoard({ name, newColumns, id }));
    }
  };

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
        shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Редактирование" : "Добавление новой"} панели задач
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Наименование панели задач
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder="введите наименование доски"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Столбцы панели задач
          </label>

          {newColumns != undefined ? (
            newColumns.map((column: any, index: any) => (
              <div key={index} className=" flex items-center w-full ">
                <input
                  className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                  onChange={(e) => {
                    // console.log(e.target.value);
                    if (e.target.value != "") {
                      onChange(column.id, e.target.value);
                    } else {
                      alert("Заполните поле");
                    }
                  }}
                  type="text"
                  value={column.name}
                />
                <img
                  src={crossIcon}
                  onClick={() => {
                    onDelete(column.id);
                  }}
                  className=" m-4 cursor-pointer "
                />
              </div>
            ))
          ) : (
            <label className=" text-sm dark:text-white text-red-500">
              Статусы задач не подгужены
            </label>
          )}
          <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
              onClick={() => {
                setNewColumns((state: any) => [
                  ...state,
                  {
                    name: "",
                    id: uuidv4(),
                    boardId: locCurId != null ? locCurId : "0",
                    tasks: [],
                  },
                ]);
              }}
            >
              + Добавить новый столбец
            </button>
            <button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) {
                  onSubmit(type);
                }
              }}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add"
                ? "Создать новую панель задач"
                : "Сохранить изменения"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;

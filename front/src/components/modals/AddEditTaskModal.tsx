/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../../assets/icon-cross.svg";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setOpenAddEditTask,
  taskIndex,
  prevColIndex = 0,
  userRespons,
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [_isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [upd, setUpd] = useState(false);
  const board = store.getState().boards.boards;

  const keyTask = "taskId";
  const locTaskId = localStorage.getItem(keyTask);

  let columns: any;
  let columnId: any;

  const pageUpdate = () => {
    if (upd == true) {
      navigate("/dashboard");
    }
  };

  board.map((board: any) => {
    if (board.isActive) {
      columns = board.columns;
    }
  });

  const objUser = sessionStorage.getItem("objUser");
  let responsible: any = [];
  if (objUser != null) {
    responsible = JSON.parse(objUser);
  }

  let respons: any;

  if (type === "edit" && isFirstLoad) {
    responsible.map((resp: any) => {
      if (resp.name == userRespons) {
        respons = resp;
      }
    });
  }

  const col = columns.find((_col: any, index: any) => index === prevColIndex);
  const task = col
    ? col.tasks.find((_task: any, index: any) => index === taskIndex)
    : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  columnId = columns[newColIndex].id;
  const [subtasks, setSubtasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
      taskId: locTaskId != null ? locTaskId : "0",
    },
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
      taskId: locTaskId != null ? locTaskId : "0",
    },
  ]);

  const onChangeSubtasks = (id: any, newValue: any) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      if (subtask != undefined) {
        subtask.title = newValue;
      }
      return newState;
    });
  };

  const onChangeStatus = (e: any) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
    columnId = columns[newColIndex].id;
    // console.log("columnId", columnId);
    setUpd(true);
    pageUpdate();
    // navigate("/dashboard");
  };

  const onChangeRespons = (e: any) => {
    responsible.map((res: any) => {
      if (res.name == e.target.value) {
        respons = res;
        sessionStorage.setItem("currentRespons", JSON.stringify(res));
      }
    });
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask: any) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id: any) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type: string) => {
    if (type === "add" && locTaskId == null) {
      const locTaskId = "0";
      if (respons == undefined) {
        respons = responsible[0];
      }
      console.log("resp_0", respons);
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
          locTaskId,
          columnId,
          respons,
        })
      );
      const getId = parseInt(locTaskId);
      const taskId = getId + 1;
      localStorage.setItem(keyTask, taskId.toString());
      navigate("/dashboard");
    } else if (type === "add" && locTaskId != null) {
      if (respons == undefined) {
        respons = responsible[0];
      }
      console.log("resp_1=", respons);
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
          locTaskId,
          columnId,
          respons,
        })
      );
      const getId = parseInt(locTaskId);
      const taskId = getId + 1;
      localStorage.setItem(keyTask, taskId.toString());
      navigate("/dashboard");
    } else if (type === "edit") {
      const currRespons = sessionStorage.getItem("currentRespons");
      if (respons == undefined && currRespons == null) {
        responsible.map((resp: any) => {
          if (resp.name == userRespons) {
            respons = resp;
          }
        });
      } else if (currRespons != null) {
        respons = JSON.parse(currRespons);
        sessionStorage.removeItem("currentRespons");
      }
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
          respons,
          columnId,
        })
      );
      navigate("/dashboard");
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        if (type === "add") {
          setOpenAddEditTask(false);
        } else {
          setIsTaskModalOpen(false);
        }
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
      shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Редактировать" : "Добавить новую"} задачу
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Введите наименование задачи
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder="Например, разработать справку"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="Введите описание задачи"
          />
        </div>

        {/* Subtasks */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Подзадача
          </label>

          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                placeholder="Например, сбор информации"
              />
              <img
                className={type === "add" ? " m-4 cursor-pointer" : " hidden"}
                src={crossIcon}
                onClick={() => {
                  onDelete(subtask.id);
                }}
              />
            </div>
          ))}

          <button
            className=" w-full items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                {
                  title: "",
                  isCompleted: false,
                  id: uuidv4(),
                  taskId: task.id,
                },
              ]);
            }}
          >
            + добавить новую подзадачу
          </button>
        </div>

        {/* Responsible section */}

        <div className=" mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            {type == "edit"
              ? "Отвественный за выполнение задачи:"
              : "Выберете исполнителя задачи"}{" "}
            {type == "edit" ? <b>{userRespons}</b> : ""}
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={respons}
            onChange={onChangeRespons}
          >
            <option className=" status-options">
              {type === "edit"
                ? "Нажмите, чтобы изменить исполнителя"
                : "Нажмите, чтобы выбрать исполнителя"}
            </option>
            {responsible != null
              ? responsible.map((user: any, index: any) => (
                  <option className=" status-options" key={index}>
                    {user.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Текущий статус
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column: any, index: Key | null | undefined) => (
              <option key={index}>{column.name}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                type === "add" && setOpenAddEditTask(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
            className=" w-full items-center text-white bg-[#635fc7] py-2 rounded-full "
          >
            {type === "edit" ? "Сохранить изменение" : "Создать задачу"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;

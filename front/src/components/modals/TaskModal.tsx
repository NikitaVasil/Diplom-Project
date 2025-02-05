/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import elipsis from "../../assets/icon-vertical-ellipsis.svg";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";
import Subtask from "../ui/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import ElipsisMenu from "./ElipsisMenu";

function TaskModal({
  taskIndex,
  colIndex,
  setIsTaskModalOpen,
  userRespons,
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [updState, setUpdState] = useState(false);
  const boards = store.getState().boards.boards;

  const pageUpdate = () => {
    navigate("/");
  };

  if (updState == true) {
    setTimeout(() => {
      pageUpdate();
    }, 500);
  }

  let columns: any;

  boards.map((board: any) => {
    if (board.isActive) {
      columns = board.columns;
    }
  });

  const role = sessionStorage.getItem("userRole");

  const TeamLeed = () => {
    if (role == "admin") {
      return true;
    }
  };

  const col = columns.find((_col: any, i: any) => i === colIndex);
  const task = col.tasks.find((_task: any, i: any) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask: { isCompleted: any }) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);

  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));

  const onChange = (e: any) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e: any) => {
    if (e.target !== e.currentTarget) {
      setUpdState(true);
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e: any) => {
    if (e.target.textContent === "Удалить") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    console.log("idUser =", userRespons);
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      {/* MODAL SECTION */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>

          <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Подзадачи ({completed} из {subtasks.length})
        </p>

        {/* subtasks section */}

        <div className=" mt-3 space-y-2">
          {subtasks.map((_subtask: any, index: any) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>

        {/* Responsible section */}

        <div
          className={TeamLeed() ? "mt-8 flex flex-col space-y-3" : " hidden"}
        >
          <label className="  text-sm dark:text-white text-gray-500">
            Отвественный: <b className=" text-red-400">{userRespons}</b>
          </label>
        </div>

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Текущий статус
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col: any, index: any) => (
              <option className="status-options" key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
          userRespons={userRespons}
        />
      )}
    </div>
  );
}

export default TaskModal;

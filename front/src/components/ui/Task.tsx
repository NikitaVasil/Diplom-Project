/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskModal from "../../components/modals/TaskModal";
import { store } from "../../redux/store";

function Task({ colIndex, taskIndex }: any) {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("userRole");
  const objUser = sessionStorage.getItem("objUser");
  let respons: any;
  if (role === "admin" && objUser != null) {
    respons = JSON.parse(objUser);
  }
  const [updState, setUpdState] = useState(false);

  if (updState == true) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const TeamLeed = () => {
    if (role == "admin") {
      return true;
    }
  };

  const boards = store.getState().boards.boards;

  let columns: any;

  boards.map((board: any) => {
    if (board.isActive) {
      columns = board.columns;
    }
  });

  const col = columns.find((_col: any, i: any) => i === colIndex);
  const task = col.tasks.find((_task: any, i: any) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks: any;
  if (task != null) {
    subtasks = task.subtasks;
    subtasks.forEach((subtask: any) => {
      if (subtask.isCompleted) {
        completed++;
      }
    });
  }

  let responsible = "";
  if (respons != undefined) {
    respons.map((resp: any) => {
      if (task != null) {
        if (resp.id == task.userId) {
          responsible = resp.name;
        }
      }
    });
  }

  const handleOnDrag = (e: any) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex }),
      setUpdState(true)
    );
  };

  return (
    <div className={task == null ? " hidden" : ""}>
      <div
        onClick={() => {
          console.log("userRespons =", responsible);
          setIsTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">
          {task != null ? task.title : ""}
        </p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} из {subtasks != undefined ? subtasks.length : ""}{" "}
          выполненные задачи
        </p>
        <p
          className={
            TeamLeed()
              ? " font-bold text-xs tracking-tighter mt-2 text-gray-500"
              : " hidden"
          }
        >
          Отвественный: {responsible}
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
          userRespons={responsible}
        />
      )}
    </div>
  );
}

export default Task;

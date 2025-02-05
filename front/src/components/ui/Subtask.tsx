/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";

function Subtask({ index, taskIndex, colIndex }: any) {
  const dispatch = useDispatch();
  const boards = store.getState().boards.boards;

  const [checkState, setCheckState] = useState(false);

  if (checkState == true) {
    return <Subtask index={index} taskIndex={taskIndex} colIndex={colIndex} />;
  }

  let columns: any;
  boards.map((board: any) => {
    if (board.isActive) {
      columns = board.columns;
    }
  });
  const col = columns.find((_col: any, i: any) => i === colIndex);
  const task = col.tasks.find((_task: any, i: any) => i === taskIndex);
  const subtask = task.subtasks.find((_subtask: any, i: any) => i === index);
  const checked = subtask.isCompleted;

  const onChange = (_e: any) => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
    setCheckState(true);
  };

  return (
    <div className=" w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
      <input
        className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={`${checked && "line-through opacity-30"}`}>
        {subtask.title}
      </p>
    </div>
  );
}

export default Subtask;

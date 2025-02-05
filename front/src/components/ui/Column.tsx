/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";
import Task from "../ui/Task";

function Column({ colIndex }: any) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const [color, _setColor] = useState("");

  const board = store.getState().boards.boards;

  let columns: any;

  board.map((board: any) => {
    if (board.isActive) {
      columns = board.columns;
    }
  });

  const col = columns.find((_col: any, i: any) => i === colIndex);

  useEffect(() => {
    if (colors != undefined) {
      const setCol = shuffle(colors).pop();
      if (setCol != undefined) {
        _setColor(setCol);
      }
    }
  }, [dispatch]);

  const handleOnDrop = (e: any) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <div className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]">
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col.tasks.length})
      </div>

      {col.tasks.map((_task: any, index: any) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;

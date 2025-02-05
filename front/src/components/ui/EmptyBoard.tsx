/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function EmptyBoard({ type }: any) {
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-bold">
        {type === "edit"
          ? "Эта панель задач пуста. Для начала создайте новую колонку."
          : "Доступных панелей задач нет. Для начала создайте новую панель задач"}
      </h3>
      <button
        onClick={() => {
          setBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70
        dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
      >
        {type === "edit"
          ? "+ Добавить новую колонку"
          : "+ Добавить новую панель задач"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal setBoardModalOpen={setBoardModalOpen} type={type} />
      )}
    </div>
  );
}

export default EmptyBoard;

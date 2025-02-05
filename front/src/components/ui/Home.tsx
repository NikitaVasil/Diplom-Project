/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import store from "../../redux/store";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "../ui/Column";
import EmptyBoard from "../ui/EmptyBoard";
import Sidebar from "../ui/Sidebar";

function Home({ setBoardModalOpen, BoardModalOpen }: any) {
  const role = sessionStorage.getItem("userRole");

  const TeamLeed = () => {
    if (role == "admin") {
      return true;
    }
  };

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const board = store.getState().boards.boards;

  let columns: any;

  board.map((board: any) => {
    if (board.isActive) {
      columns = board.columns;
    }
  });

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-[#f4f7fd]  scrollbar-hide h-screen flex    dark:bg-[#20212c] overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setBoardModalOpen={setBoardModalOpen}
          isBoardModalOpen={BoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      {/* Columns Section */}

      {columns.length > 0 ? (
        <>
          {columns.map((_col: any, index: any) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            onClick={() => {
              setBoardModalOpen(true);
            }}
            className={
              TeamLeed()
                ? " h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
                : " hidden"
            }
          >
            + Новый столбец
          </div>
        </>
      ) : (
        <>
          <EmptyBoard type="edit" />
        </>
      )}
      {BoardModalOpen && (
        <AddEditBoardModal type="edit" setBoardModalOpen={setBoardModalOpen} />
      )}
    </div>
  );
}

export default Home;

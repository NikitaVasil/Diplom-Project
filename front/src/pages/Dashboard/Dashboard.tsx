/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortBy } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EmptyBoard from "../../components/ui/EmptyBoard";
import Header from "../../components/ui/Header";
import Home from "../../components/ui/Home";
import { getEnviroments } from "../../conf/enviroments";
import useBoards from "../../Hooks/useBoards";
import useRenderCount from "../../Hooks/useRenderCount";
import boardsSlice from "../../redux/boardsSlice";
import store from "../../redux/store";

const Dashboard = () => {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  // const [isFirst, setIsFirst] = useState(true);
  const dispatch = useDispatch();

  const keyBoard = "boardId";
  const token_test = sessionStorage.getItem(getEnviroments().PW_SESSION);
  let token = "";
  if (!token_test) {
    console.error("Ошибка токена");
  } else {
    token = token_test;
  }

  const dataUpdate = () => {
    localStorage.removeItem("persist:root");
  };

  const boards = useBoards(token).allBoards; //custom-hook

  //сортировка массива с панелями
  const sortBoards = sortBy(boards, ["id"]);

  const board = store.getState().boards.boards;

  function isEqual(object1: any, object2: any) {
    const props1 = Object.getOwnPropertyNames(object1);
    const props2 = Object.getOwnPropertyNames(object2);

    if (props1.length !== props2.length) {
      return false;
    }

    for (let i = 0; i < props1.length; i += 1) {
      const prop = props1[i];
      const bothAreObjects =
        typeof object1[prop] === "object" && typeof object2[prop] === "object";

      if (
        (!bothAreObjects && object1[prop] !== object2[prop]) ||
        (bothAreObjects && !isEqual(object1[prop], object2[prop]))
      ) {
        return false;
      }
    }
    return true;
  }

  if (board.length == sortBoards.length) {
    for (let i = 0; i < board.length; i++) {
      const boardBD = sortBoards[i];
      const boardState = board[i];
      // console.log("bd", boardBD);
      if (!isEqual(boardBD, boardState)) {
        setTimeout(() => {
          dataUpdate();
        }, 1000);
      }
    }
  }

  if (useRenderCount() == 3 && board.length == 0) {
    sortBoards.map((board: any) => {
      dispatch(boardsSlice.actions.addBoardStateIsBD({ board }));
    });
    const boardId = sortBoards.length;
    localStorage.setItem(keyBoard, boardId.toString());
  }

  let activeBoard: any;

  board.map((board: any) => {
    if (board.isActive) {
      activeBoard = board.isActive;
    }
  });
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        {boards.length > 0 ? (
          <>
            <Header
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            <Home
              setBoardModalOpen={setBoardModalOpen}
              BoardModalOpen={boardModalOpen}
            />
          </>
        ) : (
          <>
            <EmptyBoard type="add" />
          </>
        )}
      </>
    </div>
  );
};

export default Dashboard;

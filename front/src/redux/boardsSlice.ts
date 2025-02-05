/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import deleteBoard from "../service/deleteBoard";
import deleteTasks from "../service/deleteTask";
import editBoard from "../service/editBoard";
import editTasks from "../service/editTask";
import newBoard from "../service/newBoard";
import newTask from "../service/newTask";
import setStatusTask from "../service/setStatusTask";
import setSubtaskIsComplete from "../service/setSubtaskIsCompleted";

const arr: object[] = []
const keyStorage = 'userId'
const date = new Date()

export const boardsSlice = createSlice({
  name: "boards",
  initialState: arr,
  reducers: {
    addBoardState: (state, action) => {
      const isActive = state.length > 0 ? false : true
      const payload = action.payload
      console.log('column', payload.newColumns)
      const board = {
        id: payload.locBoardId,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        userId: sessionStorage.getItem(keyStorage),
        name: payload.name,
        isActive,
        columns: payload.newColumns,
      };
      
      // добавляем в State
      state.push(board)

      const columnBD : any = []
      payload.newColumns.map((col : any) => {
        const column = {
          name: col.name,
          id: col.id,
          boardId: col.boardId,
        }
        columnBD.push(column)
      })
      const boardBD = {
        id: payload.locBoardId,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        userId: sessionStorage.getItem(keyStorage),
        name: payload.name,
        isActive,
        columns: columnBD,
      };
      //добавляем в бд
      newBoard(boardBD)
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board: any = state.find((board: any) => board.isActive);
      if(board != undefined) {
        board.id = payload.id
        board.name = payload.name;
        board.columns = payload.newColumns;
      }

      const columnBD : any = []
      payload.newColumns.map((col : any) => {
        const column = {
          name: col.name,
          id: col.id,
          boardId: col.boardId,
        }
        columnBD.push(column)
      })

      const updateBoard = {
        id: payload.id,
        name: payload.name,
        columns: columnBD,
      }

      console.log(updateBoard)
      editBoard(updateBoard)
    },
    setBoardActive: (state, action) => {
      // console.log('state =', state.length)
      // console.log('currentState', action.payload.board)
      if(state.length == 0 ) {
        state.push(action.payload.currentState)
      }
      state.map((board: any, index : any) => {
        if(action.payload.index != undefined) {
          index === action.payload.index
            ? (board.isActive = true)
            : (board.isActive = false)
          return board
        }
      });
    },
    addBoardStateIsBD: (state, action) => {
      const board = action.payload.board
      state.push(board)
    },
    deleteBoard: (state) => {
      let boardActive : any
      state.map((board : any) => {
        if(board.isActive){
          boardActive = board
        }
      })
      state.splice(state.indexOf(boardActive), 1);
      //удаление из бд
      deleteBoard(boardActive.id)
    },
    addTask: (state, action) => {
      const { title, status, description, subtasks, newColIndex, locTaskId, columnId, respons } =
        action.payload;
      const taskDB = {
        id: locTaskId,
        title: title,
        description: description,
        status: status,
        subtasks: subtasks,
        columnId: columnId,
        userId: respons.id
      };

      const task = {
        id: locTaskId,
        title: title,
        description: description,
        status: status,
        subtasks: subtasks,
        columnId: columnId,
        userId: respons.id
      };

      console.log('task', task)
      state.map((board : any) => {
        if(board.isActive) {
          const column = board.columns.find((_col : any, index : any) => index === newColIndex);

          column.tasks.push(task);

          //добавить функцию добавления в БД
          newTask(taskDB)
        }
      })
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
        respons,
        columnId,
      } = action.payload;
      console.log('respId = ',respons)

      state.map((board : any) => {
        if(board.isActive) {
          const column = board.columns.find((_col: any, index: any) => index === prevColIndex);
          const task = column.tasks.find((_task: any, index: any) => index === taskIndex);
          task.title = title;
          task.status = status;
          task.description = description;
          task.subtasks = subtasks;
          task.userId = respons.id;
          task.columnId = columnId

          if (prevColIndex === newColIndex) return;
          column.tasks = column.tasks.filter((_task: any, index: any) => index !== taskIndex);
          const newCol = board.columns.find((_col: any, index: any) => index === newColIndex);
          
          //добавление в State
          newCol.tasks.push(task);

          //добавление в ДБ
          editTasks(task)
        }
      })
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      state.map((board: any) => {
        if(board.isActive) {
          const prevCol = board.columns.find((_col: any, i: any) => i === prevColIndex);
          const task = prevCol.tasks.splice(taskIndex, 1)[0];
          
          board.columns.find((_col: any, i: any) => i === colIndex).tasks.push(task);
          const columns = board.columns.find((_col: any, i: any) => i === colIndex);

          //обновление в БД
          const taskId = task.id;
          const taskStatus = columns.name;
          const taskColumnId = columns.id;
          const status = {taskId, taskStatus, taskColumnId};
          setStatusTask(status);
        }
      })
    },
    setSubtaskCompleted: (state, action) => {
      const payload = action.payload;
      state.map((board: any) => {
        if(board.isActive) {
          const col = board.columns.find((_col: any, i: any) => i === payload.colIndex);
          const task = col.tasks.find((_task: any, i: any) => i === payload.taskIndex);
          const subtask = task.subtasks.find((_subtask: any, i: any) => i === payload.index);
          subtask.isCompleted = !subtask.isCompleted;

          //обновление в БД
          const taskId = task.id;
          const subtaskId = subtask.id;
          const subtaskIsCompleted = subtask.isCompleted;
          const setSubtaskComp = { taskId, subtaskId, subtaskIsCompleted};
          setSubtaskIsComplete(setSubtaskComp);
        }
      })
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      state.map((board: any) => {
        if(board.isActive) {
          const columns = board.columns;
          const col = columns.find((_col: any, i: any) => i === payload.colIndex);
          if (payload.colIndex === payload.newColIndex) return;
          const task = col.tasks.find((_task: any, i: any) => i === payload.taskIndex);
          task.status = payload.status;
          col.tasks = col.tasks.filter((_task: any, i: any) => i !== payload.taskIndex);
          const newCol = columns.find((_col: any, i: any) => i === payload.newColIndex);
          newCol.tasks.push(task);

          //обновление в БД
          const taskId = task.id;
          const taskStatus = task.status
          const taskColumnId = newCol.id
          const status = {taskId, taskStatus, taskColumnId}
          setStatusTask(status)
        }
      })
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      state.map((board: any) => {
        if(board.isActive) {
          const col = board.columns.find((_col: any, i: any) => i === payload.colIndex);
          const task = col.tasks.find((_task: any, i: any) => i === payload.taskIndex);
          col.tasks = col.tasks.filter((_task: any, i: any) => i !== payload.taskIndex );
          
          //удаление из БД
          const taskId = task.id
          deleteTasks(taskId);
        }
      })
    },
  },
});

export default boardsSlice;
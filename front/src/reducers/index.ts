import { combineReducers } from '@reduxjs/toolkit';
import boardsSlice from '../redux/boardsSlice';
import usersSlice from '../redux/usersSlice';

export default combineReducers({
  boards: boardsSlice.reducer,
  users: usersSlice.reducer
});
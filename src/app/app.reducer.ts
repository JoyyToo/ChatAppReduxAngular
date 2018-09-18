import { UsersState, UsersReducer } from "./user/user.reducer";
import { ThreadsState, ThreadsReducer } from "./thread/threads.reducer";
import { combineReducers, Reducer } from "redux";
export * from './thread/threads.reducer';
export * from './user/user.reducer';

export interface AppState {
  users: UsersState;
  threads: ThreadsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer,
  threads: ThreadsReducer
});

export default rootReducer;
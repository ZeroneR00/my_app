import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../AppWithRedux";
import {TasksStateType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})


export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
import React, {useCallback, useReducer} from 'react';

import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    console.log("APP")
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask =  useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }, [] )

    const addTask =  useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }, [] )

    const changeStatus =  useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    }, [] )

    const changeTaskTitle =  useCallback((id: string, newTitle: string, todolistId: string) => {

        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }, [] )

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId));

    }, [] )

    const removeTodolist = useCallback( (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);

    }, [] )

    const changeTodolistTitle = useCallback ((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);

    }, [])


    const addTodolist = useCallback( (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);

    }, []);


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: '20px 0 20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>

                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }

                        return <Grid item>
                            <Paper elevation={3} style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })

                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;

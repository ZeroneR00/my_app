import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Checkbox, IconButton} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newStatus: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}


export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompetedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }


    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
                    <DeleteIcon fontSize="inherit"  />
                </IconButton>
            </h3>
           <AddItemForm addItem={addTask}/>
            <div>
                {props.tasks.map((t: TaskType) => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <div key={t.id} className={t.isDone ? "isDone" : ""}>
                        <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                        <IconButton aria-label="delete" size="small" onClick={onRemoveHandler}>
                            <DeleteIcon fontSize="inherit"   />
                        </IconButton>
                    </div>
                })}
                <div>
                    <Button variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={'primary'} variant={props.filter === "active" ? "contained" : "text"}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={'secondary'} variant={props.filter === "completed" ? "contained" : "text"}
                            onClick={onCompetedClickHandler}>Competed
                    </Button>
                </div>
            </div>
        </div>
    )
}


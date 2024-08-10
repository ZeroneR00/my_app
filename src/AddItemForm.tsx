import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log("additemform")
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error){
            setError(false);
        }
        if (e.charCode === 13) {
            addTask()
            setTitle("")
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError(true)
        }
    }
    const errorr = "Ошибка"

    return <div>
        <TextField
            value={title}
            label="Введите значение"
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={error}
            helperText={error ? errorr : ''}
        />

        <IconButton onClick={addTask} color={'primary'} >
            <ControlPoint/>
        </IconButton>
    </div>
});
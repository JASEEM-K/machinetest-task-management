import React, { useState } from "react";
import ModelComponent from "./ModelComponent";

const TaskModel = () => {
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <ModelComponent open={open} onClose={onClose}>
                <input></input>
                <button>Create Task</button>
            </ModelComponent>
        </div>
    );
};

export default TaskModel;

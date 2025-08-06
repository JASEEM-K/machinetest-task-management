import React from "react";
import type { ISendTask, ITaskView } from "../types/global.types";
import TaskCard from "./TaskCard";
import AddTaskComponent from "./AddTaskComponent";
import { useDroppable } from "@dnd-kit/core";

const ProgressColumn = ({
    title,
    tasks,
    update,
}: {
    title: string;
    tasks: ITaskView[];
    update: React.Dispatch<React.SetStateAction<ITaskView[]>>;
}) => {
    const { setNodeRef } = useDroppable({
        id: title,
    });
    return (
        <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
            <h2 className="mb-4 font-semibold text-neutral-100">{title}</h2>
            <div
                ref={setNodeRef}
                className="flex flex-1 flex-col gap-4 group  "
            >
                {tasks.map((task) => {
                    return (
                        <TaskCard
                            key={task._id}
                            _id={task._id}
                            priority={task.priority}
                            status={task.status}
                            title={task.title}
                            description={task.description}
                            dueDate={task.dueDate}
                        />
                    );
                })}
                <AddTaskComponent status={title} update={update} />
            </div>
        </div>
    );
};

export default ProgressColumn;

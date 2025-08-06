import { useEffect, useState } from "react";
import ProgressColumn from "./components/ProgressColumn";
import type { ITaskView } from "./types/global.types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { axiosInstance } from "./config/axiosInstance";
import { toast } from "sonner";

const COLUMNS = [
    { title: "To Do" },
    { title: "In Progress" },
    { title: "Done" },
];

// const tasks: ITaskView[] = [
//     {
//         title: "hello",
//         _id: "1",
//         priority: "Medium",
//         status: "To Do",
//         description: "flsdkfj",
//         dueDate: new Date("2025-01-14"),
//     },
//     {
//         title: "hello 2",
//         _id: "2",
//         priority: "Medium",
//         status: "In Progress",
//         description: "flsdkfj",
//         dueDate: new Date("2025-01-14"),
//     },
//     {
//         title: "hello 3 ",
//         _id: "3",
//         priority: "High",
//         status: "To Do",
//         description: "flsdkfj",
//         dueDate: new Date("2025-01-14"),
//     },
//     {
//         title: "hello 4",
//         _id: "4",
//         priority: "Medium",
//         status: "To Do",
//         description: "flsdkfj",
//         dueDate: new Date("2025-01-14"),
//     },
// ];

function App() {
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const [Tasks, setTasks] = useState<ITaskView[]>([]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;
        const taskId = active.id as string;
        const newStatus = over.id as string;

        // setk;
        setTasks(() =>
            Tasks.map((task) =>
                task._id === taskId
                    ? {
                          ...task,
                          status: newStatus,
                      }
                    : task
            )
        );
        const body = JSON.stringify({ status: newStatus });
        axiosInstance
            .put(`/tasks/${taskId}`, body)
            .then((res: any) => {
                if (res.status !== "success") {
                } else {
                    const data = JSON.parse(res.data).data as ITaskView;
                    setTasks(() =>
                        Tasks.map((task) => (task._id === taskId ? data : task))
                    );
                }
                toast(JSON.parse(res.data).message);
            })
            .catch((err) => toast(err.message));
    };

    useEffect(() => {
        console.log("fetching");
        axiosInstance
            .get("/tasks")
            .then((res: any) => {
                const data = JSON.parse(res.data).data;
                console.log(res.data);
                setTasks(data);
                toast(JSON.parse(res.data).message);
            })
            .catch((err) => toast(err.message))
            .finally(() => console.log("finished fetching"));
    }, []);

    if (Tasks === undefined) {
        return <div>Nothing to see here</div>;
    }

    return (
        <div className="bg-black w-dvw h-full py-10">
            <div className="w-full h-full flex justify-around">
                <DndContext onDragEnd={handleDragEnd}>
                    {COLUMNS.map((column) => {
                        return (
                            <ProgressColumn
                                key={column.title}
                                title={column.title}
                                update={setTasks}
                                tasks={Tasks.filter(
                                    (task) => task.status === column.title
                                )}
                            />
                        );
                    })}
                </DndContext>
            </div>
            <button
                className="bg-green-500"
                onClick={() => toast("hello", { description: "sldkjfsl" })}
            >
                Lkisjdf
            </button>
        </div>
    );
}

export default App;

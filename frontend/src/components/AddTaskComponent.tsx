import React, { useEffect, useState } from "react";
import type { ISendTask, ITaskView } from "../types/global.types";
import ModelComponent from "./ModelComponent";
import InputComponent from "./InputComponent";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "sonner";

const AddTaskComponent = ({
    status,
    update,
}: {
    status: string;
    update: React.Dispatch<React.SetStateAction<ITaskView[]>>;
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ISendTask>({
        priority: "",
        status: status,
        title: "",
        description: "",
        dueDate: undefined,
    });
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (key: string, value: string) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };
    const [selectedDate, setSelectedDate] = useState<string>("");

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => ({ ...prev, dueDate: event.target.value }));
    };

    const handleSubmition = () => {
        setLoading(true);
        const body = JSON.stringify(data);
        axiosInstance
            .post("/tasks/", body)
            .then((res: any) => {
                console.log(res);
                if (res.status !== "success") {
                } else {
                    const data = JSON.parse(res.data).data as ITaskView;
                    console.log(data);

                    update((prev) => [...prev, data]);
                }
                toast(JSON.parse(res.data).message);
            })
            .catch((err) => {
                toast("Something weng wrong", { description: err });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);

    return (
        <div className=" bg-card-primary px-2 rounded-md group-hover:visible text-white py-2 flex justify-center items-center cursor-pointer hover:bg-slate-500/20 invisible transition-all">
            <div onClick={() => setOpen(true)}>Add Task +</div>
            <ModelComponent
                className="bg-card-primary"
                open={open}
                onClose={onClose}
            >
                <div className=" flex flex-col space-y-3 w-80 items-center h-80">
                    <InputComponent
                        field="title"
                        name="Title"
                        changeValue={onChange}
                        value={data.title}
                    />
                    <InputComponent
                        field="description"
                        name="Description"
                        changeValue={onChange}
                        value={data.description ?? ""}
                    />
                    <InputComponent
                        field="priority"
                        name="Priority"
                        changeValue={onChange}
                        value={data.priority}
                    />
                    <label htmlFor="dueDate">Select Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={data.dueDate}
                        onChange={handleDateChange}
                    />
                    <button disabled={loading} onClick={handleSubmition}>
                        Submit
                    </button>
                </div>
            </ModelComponent>
        </div>
    );
};

export default AddTaskComponent;

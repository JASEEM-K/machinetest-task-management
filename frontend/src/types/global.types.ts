export interface ITask {
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate?: Date;
}

export interface ITaskView extends ITask {
    _id: string;
}

export interface ISendTask {
    title: string;
    description?: string;
    status: string;
    priority: string;
    dueDate?: string;
}

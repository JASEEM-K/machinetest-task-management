import React, { useState } from "react";
import type { ITaskView } from "../types/global.types";
import {
    Document,
    Page,
    View,
    Text,
    StyleSheet,
    PDFDownloadLink,
    PDFViewer,
} from "@react-pdf/renderer";
import ModelComponent from "./ModelComponent";
import { useDraggable } from "@dnd-kit/core";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "sonner";

const TaskCard = (params: ITaskView) => {
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    };
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: params._id,
    });

    const handleDelete = () => {
        axiosInstance
            .delete(`/tasks/${params._id}`)
            .then((res) => {
                toast(JSON.parse(res.data).message);
            })
            .catch((err) => {
                toast(err.message);
            });
    };

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;

    const styles = StyleSheet.create({
        page: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffff",
            gap: "5px",
            padding: "30px 50px",
        },
        section: {
            margin: 10,
            padding: 10,
        },
        content: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: 20,
        },
        textBold: {
            fontFamily: "Helvetica-Bold",
        },
        heading: {
            fontSize: 24,
        },
    });

    const MyDocument = () => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={(styles.textBold, styles.heading)}>
                            Task Managment
                        </Text>
                    </View>
                    <View style={(styles.section, styles.content)}>
                        <Text>
                            <Text style={styles.textBold}>Title:</Text>
                            {params.title}
                        </Text>
                        {params.description && (
                            <Text>
                                <Text style={styles.textBold}>
                                    Description:
                                </Text>
                                {params.description}
                            </Text>
                        )}
                        <Text>
                            <Text style={styles.textBold}>Priority :</Text>
                            {params.priority}
                        </Text>
                        <Text>
                            <Text style={styles.textBold}>Status :</Text>
                            {params.status}
                        </Text>
                        <Text>
                            <Text style={styles.textBold}>Due Date :</Text>
                            {params.dueDate?.toDateString() ?? "-"}
                        </Text>
                    </View>
                </Page>
            </Document>
        );
    };
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className={` ${
                params.priority === "Medium"
                    ? "shadow-[0px_4px_1px_rgba(75,_112,_245,_1)]"
                    : params.priority === "Low"
                    ? "shadow-[0px_4px_1px_rgba(241,_74,_0,_1)]"
                    : params.priority === "High"
                    ? "shadow-[0px_4px_1px_rgba(247,_55,_79,_1)]"
                    : ""
            }
                card-comp   `}
            id={params._id}
        >
            <div
                className={`${
                    params.priority === "Medium"
                        ? "bg-priority-med"
                        : params.priority === "Low"
                        ? "bg-priority-low"
                        : params.priority === "High"
                        ? "bg-priority-high"
                        : ""
                } max-w-[4rem] rounded-md flex items-center py-1 justify-center`}
            >
                <span className="text-sm font-semibold">{params.priority}</span>
            </div>
            <div className="text-lg font-semibold">{params.title}</div>
            <div>{params.description}</div>
            {/* <button onClick={() => handleDownload(params._id)}
                data-html2canvas-ignore
            >
                Download
            </button> */}
            <PDFDownloadLink document={<MyDocument />}>
                <button>Download Pdf</button>
            </PDFDownloadLink>
            <br />
            <button
                className="px-2 mt-0.5 py-1.5 rounded-md bg-red-500 cursor-pointer hover:bg-red-300 "
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default TaskCard;

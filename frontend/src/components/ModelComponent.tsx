import React from "react";

const ModelComponent = ({
    open,
    onClose,
    children,
    className,
}: {
    open: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            onClick={onClose}
            className={`  fixed inset-0 flex justify-center items-center transition-colors ${
                open ? "visible bg-black/40" : "invisible"
            }`}
        >
            <div
                // this is to prevent closing when clicking this div which is happening due to propagation
                onClick={(e) => e.stopPropagation()}
                className={` rounded-xl shadow p-6 transition-all ${
                    open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                } ${className} `}
            >
                {children}
            </div>
        </div>
    );
};

export default ModelComponent;

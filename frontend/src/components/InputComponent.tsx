import React from "react";

const InputComponent = (props: IInputComp) => {
    return (
        <label htmlFor="input-comp-styled" className="relative">
            <input
                type="text"
                className="input-comp"
                value={props.value}
                placeholder="sometext"
                onChange={(e) => props.changeValue(props.field, e.target.value)}
                id="input-comp-styled"
            />
            <span className="input-span">{props.name}</span>
        </label>
    );
};

interface IInputComp {
    name: string;
    value: string;
    field: string;
    changeValue: (field: string, value: string) => void;
}

export default InputComponent;

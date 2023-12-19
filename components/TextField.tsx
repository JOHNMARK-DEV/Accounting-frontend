
import React from "react"
import { TextField as Textbox } from "@mui/material";

type ITextField = {
    Name: String,
    Label: String,
    Type: "TEXT" | "NUMBER" | "MONEY_FORMAT" | "DATE" | "DATE",
    ColorVariant: "primary" | "error" | "secondary" | "info" | "success" | "warning",
    isDisabled: boolean,
}
const TextField = ({
    Name, Label, Type, ColorVariant = "primary", isDisabled
}: ITextField) =>{

    switch (Type) {
        case "TEXT":
            return <Textbox label={Label} variant="standard" color={ColorVariant} disabled={isDisabled} />;
            break;
        case "NUMBER":
            return <Textbox label={Label} variant="standard" color={ColorVariant} disabled={isDisabled} />;
            break;
        case "MONEY_FORMAT":
            return <Textbox label={Label} variant="standard" color={ColorVariant} disabled={isDisabled} />;
            break;
        case "DATE":
            return <Textbox label={Label} variant="standard" color={ColorVariant} disabled={isDisabled} />;
            break;

        default:
            break;
    }
    return (
        <>
            {


            }
        </>
    )
}

export default TextField;
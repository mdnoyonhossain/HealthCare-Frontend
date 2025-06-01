import React from "react";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface TTimePicker {
    name: string;
    label: string;
    variant?: "outlined";
    size?: "small" | "medium";
    fullWidth?: boolean;
    sx?: SxProps;
    required?: boolean;
}

const HCTimePicker = ({ name, label, size = "small", variant = "outlined", fullWidth = true, sx, required }: TTimePicker) => {
    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...field } }) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            {...field}
                            label={label}
                            value={value || Date.now()}
                            onChange={(time) => onChange(time)}
                            timezone="system"
                            slotProps={{
                                textField: {
                                    required: required,
                                    fullWidth: fullWidth,
                                    size: size,
                                    sx: {
                                        ...sx,
                                    },
                                    variant: variant,
                                    error: isError,
                                    helperText: isError ? (formState.errors[name]?.message as string) : "",
                                },
                            }}
                        />
                    </LocalizationProvider>
                );
            }}
        />
    );
};

export default HCTimePicker;
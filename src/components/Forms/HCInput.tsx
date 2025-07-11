import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type THCInput = {
    name: string;
    label: string;
    type?: string;
    variant?: "outlined";
    size?: "small" | "medium";
    fullWidth?: boolean;
    sx?: SxProps;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
}

const HCInput = ({ name, type = "text", label, variant = "outlined", size = "small", fullWidth, sx, placeholder, required, disabled, multiline, rows }: THCInput) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    type={type}
                    label={label}
                    variant={variant}
                    size={size}
                    fullWidth={fullWidth}
                    sx={{ ...sx }}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    multiline={multiline}
                    rows={rows}
                    value={field.value ?? ""}
                    error={!!error?.message}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default HCInput;
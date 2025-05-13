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
    required: boolean;
}

const HCInput = ({ name, type = "text", label, variant = "outlined", size = "small", fullWidth, sx, placeholder, required }: THCInput) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
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
                    value={field.value ?? ""}
                />
            )}
        />
    );
};

export default HCInput;
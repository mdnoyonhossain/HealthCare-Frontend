import { MenuItem, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type THCSelectField = {
    name: string;
    label: string;
    type?: string;
    variant?: "outlined";
    size?: "small" | "medium";
    fullWidth?: boolean;
    placeholder?: string;
    required?: boolean;
    sx?: SxProps;
    items: string[];
}

const HCSelectField = ({ items, name, label, variant = "outlined", size = "small", fullWidth, sx, required }: THCSelectField) => {
    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    {...field}
                    sx={{ ...sx }}
                    size={size}
                    select
                    label={label}
                    required={required}
                    fullWidth={fullWidth}
                    variant={variant}
                    error={isError}
                    helperText={isError ? (formState.errors[name]?.message as string) : ""}
                >
                    {items.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
}

export default HCSelectField;
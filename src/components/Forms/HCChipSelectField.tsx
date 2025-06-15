import React from "react";
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type THCChipSelectField = {
    name: string;
    label: string;
    items: string[];
    sx?: SxProps;
    required?: boolean;
    size?: "small" | "medium";
};

const HCChipSelectField = ({ name, label, items, sx, required, size = "small" }: THCChipSelectField) => {
    const { control, formState } = useFormContext();
    const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field }) => (
                <FormControl sx={{ width: "100%", minWidth: 200, ...sx }} error={isError} size={size}>
                    <InputLabel id={`${name}-label`} required={required}>
                        {label}
                    </InputLabel>
                    <Select
                        {...field}
                        multiple
                        size={size}
                        value={Array.isArray(field.value) ? field.value : []}
                        labelId={`${name}-label`}
                        id={`${name}-select`}
                        input={<OutlinedInput id={`${name}-input`} label={label} />}
                        renderValue={(selected: string[]) => (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} size={size} />
                                ))}
                            </Box>
                        )}
                    >
                        {items.map((item) => (
                            <MenuItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default HCChipSelectField;
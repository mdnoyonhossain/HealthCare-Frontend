import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type TDatePicker = {
    name: string;
    label: string;
    variant?: "outlined";
    size?: "small" | "medium";
    fullWidth?: boolean;
    sx?: SxProps;
    required?: boolean;
}

const HCDatePicker = ({ name, label, size = "small", variant = "outlined", fullWidth, sx, required }: TDatePicker) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={dayjs(new Date().toDateString())}
            render={({ field: { onChange, value, ...field } }) => {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label={label}
                            timezone="system"
                            disablePast
                            {...field}
                            onChange={(date) => onChange(date)}
                            value={value || Date.now()}
                            slotProps={{
                                textField: {
                                    required: required,
                                    size: size,
                                    sx: { ...sx },
                                    variant: variant,
                                    fullWidth: fullWidth
                                },
                            }}
                        />
                    </LocalizationProvider>
                );
            }}
        />
    );
};

export default HCDatePicker;
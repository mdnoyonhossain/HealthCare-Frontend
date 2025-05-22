import * as React from 'react';
import { styled, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@mui/material';

type THCFileUploader = {
    name: string;
    label: string;
    type?: string;
    variant?: "contained" | "outlined";
    sx?: SxProps;
}

const HCFileUploader = ({ name, type = "file", label, variant = "contained", sx }: THCFileUploader) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
                <Button
                    component="label"
                    role={undefined}
                    variant={variant}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{ ...sx }}
                >
                    {label || "Upload Files"}
                    <Input
                        {...field}
                        type={type}
                        style={{ display: "none" }}
                        value={value?.fileName}
                        onChange={(e) => onChange((e.target as HTMLInputElement)?.files?.[0])}
                    />
                </Button>
            )}
        />
    );
};

export default HCFileUploader;
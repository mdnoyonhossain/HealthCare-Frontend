"use client";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Box, Button, Input, SvgIconProps, SxProps } from "@mui/material";
import { ReactElement } from "react";

type TFileUploadButton = {
    name: string;
    label?: string;
    accept?: string;
    sx?: SxProps;
    icon?: ReactElement<SvgIconProps>;
    variant?: "contained" | "text";
    onFileUpload: (file: File) => void;
}

const AutoFileUploader = ({ name, label, accept, sx, icon, variant = "contained", onFileUpload }: TFileUploadButton) => {
    return (
        <Box>
            <Button
                component="label"
                role={undefined}
                variant={variant}
                tabIndex={-1}
                startIcon={icon ? icon : <CloudUploadIcon />}
                sx={{ ...sx }}
            >
                {label || "Upload file"}
                <Input
                    type="file"
                    inputProps={{ accept: accept }}
                    style={{ display: "none" }}
                    onChange={(e) => {
                        const fileInput = e.target as HTMLInputElement;
                        const file = fileInput.files?.[0];
                        if (file) {
                            onFileUpload(file);
                        }
                    }}
                />
            </Button>
        </Box>
    );
};

export default AutoFileUploader;
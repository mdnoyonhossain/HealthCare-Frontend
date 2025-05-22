import HCFileUploader from "@/components/Forms/HCFileUploader";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCModal from "@/components/Shared/HCModal/HCModal"
import { zodResolver } from "@hookform/resolvers/zod";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

type TSpecialisModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const createSpecialistValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    file: z.any().refine((file) => file instanceof File, "File is required"),
});

const SpecialistModal = ({ open, setOpen }: TSpecialisModal) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateSpicialist = (data: FieldValues) => {
        setIsLoading(true);
        console.log(data);
    }

    return (
        <HCModal open={open} setOpen={setOpen} title="Create Medical Specialist">
            <HCForm onSubmit={handleCreateSpicialist} resolver={zodResolver(createSpecialistValidationSchema)} defaultValues={{ title: "", file: "" }}>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCInput type="text" name="title" label="Title" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCFileUploader type="file" name="file" label="Upload Specialist Photo" variant="contained" sx={{ width: "100%", boxShadow: "none", borderRadius: 1, textTransform: "capitalize" }} />
                    </Grid>
                </Grid>
                {isLoading ? (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={
                            isLoading ? (
                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <MedicalInformationIcon />
                            )
                        }
                        disabled={isLoading}
                        sx={{
                            color: 'white',
                            backgroundColor: '#2CB0ED',
                            padding: { xs: "6px 16px", sm: "6px 50px" },
                            fontSize: "15px",
                            margin: "10px 0 8px 0",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                boxShadow: "none"
                            },
                        }}
                    >
                        {isLoading ? 'Creating Specialist...' : 'Specialist'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<MedicalInformationIcon />}
                        sx={{
                            color: 'white',
                            backgroundColor: '#2CB0ED',
                            padding: { xs: "6px 16px", sm: "6px 50px" },
                            fontSize: "15px",
                            margin: "10px 0 8px 0",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                boxShadow: "none"
                            },
                        }}
                    >
                        Specialist
                    </Button>
                )}
            </HCForm>
        </HCModal>
    );
};

export default SpecialistModal;
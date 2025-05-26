import HCFileUploader from "@/components/Forms/HCFileUploader";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCModal from "@/components/Shared/HCModal/HCModal"
import { useCreateSpecialtiesMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Button, Grid } from "@mui/material";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TSpecialisModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const createSpecialistValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    file: z.any().refine((file) => file instanceof File, "File is required"),
});

const CreateSpecialistModal = ({ open, setOpen }: TSpecialisModal) => {
    const [isLoading, setIsLoading] = useState(false);
    const [createSpicialist] = useCreateSpecialtiesMutation();

    const handleCreateSpicialist = async (data: FieldValues) => {
        const spicialistData = modifyPayload(data);
        setIsLoading(true);

        try {
            const res = await createSpicialist(spicialistData).unwrap();
            if (res?.id) {
                toast.success("Spicialist created successfully", {
                    description: `Specialist Title: ${res?.title}`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                setOpen(false);
            }
            else if (!res?.id) {
                toast.error("Spicialist created failed", {
                    description: "An unexpected error occurred while creating the specialist. Please try again.",
                    position: "top-center",
                    duration: 6000,
                    icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                    style: { background: '#FDF1F1', border: "1px solid #FECACA" }
                });

                setIsLoading(false)
            }
        }
        catch (err: any) {
            toast.error("Something went wrong", {
                description: err?.message || "Unable to create specialist at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    return (
        <HCModal open={open} setOpen={setOpen} title="Create Medical Specialist">
            <HCForm onSubmit={handleCreateSpicialist} resolver={zodResolver(createSpecialistValidationSchema)} defaultValues={{ title: "", file: "" }}>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCInput type="text" name="title" label="Title" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCFileUploader type="file" name="file" label="Upload Specialist File" variant="contained" sx={{ width: "100%", boxShadow: "none", borderRadius: 1, textTransform: "capitalize" }} />
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
                        Create Specialist
                    </Button>
                )}
            </HCForm>
        </HCModal>
    );
};

export default CreateSpecialistModal;
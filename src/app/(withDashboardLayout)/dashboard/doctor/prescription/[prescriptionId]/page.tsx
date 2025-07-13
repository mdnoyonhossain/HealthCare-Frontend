"use client"
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import { Box, Button, Grid, Typography } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { AlertCircle, Check } from "lucide-react";
import { use, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useRouter } from "next/navigation";
import { useCreatePrescriptionMutation } from "@/redux/api/prescriptionApi";
import HCDatePicker from "@/components/Forms/HCDatePicker";
import { dateFormatter } from "@/utils/dateFormatter";

type TPrescriptionParams = {
    params: Promise<{
        prescriptionId: string;
    }>;
};

const CreatePrescriptionPage = ({ params }: TPrescriptionParams) => {
    const router = useRouter();
    const { prescriptionId } = use(params);
    const [isLoading, setIsLoading] = useState(false);
    const [createPrescription] = useCreatePrescriptionMutation();

    const handleCreatePrescription = async (data: FieldValues) => {
        const prescriptionData = {
            appointmentId: prescriptionId,
            instructions: data.instructions,
            followUpDate: data.followUpDate?.toISOString?.() || new Date(data.followUpDate).toISOString(),
        };

        setIsLoading(true);

        try {
            const res = await createPrescription(prescriptionData).unwrap();
            if (res?.id) {
                toast.success("Prescription Created Successfully", {
                    description: `The prescription for appointment ID ${prescriptionData.appointmentId} has been recorded successfully.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                router.push("/dashboard/doctor/appointments");
            }
            else if (!res?.id) {
                toast.error("Failed to Create Prescription", {
                    description: "A prescription has already been created for this appointment. Duplicate entries are not allowed.",
                    position: "top-center",
                    duration: 6000,
                    icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                    style: { background: '#FDF1F1', border: "1px solid #FECACA" }
                });

                setIsLoading(false)
            }
        }
        catch (err: any) {
            toast.error("Server Error", {
                description: err?.message || "The system encountered an error while processing your request. Please contact support if the issue persists.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Prescription
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        Manage your pateint prescription
                    </Typography>
                </Box>
            </Box>
            <HCForm onSubmit={handleCreatePrescription}>
                <Grid container spacing={2} mt={2} mb={3}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCInput
                            name="instructions"
                            label="Instructions"
                            placeholder="Write your prescription..."
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCDatePicker name="followUpDate" label="Follow-Up Date" variant="outlined" size="small" />
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
                                <MedicalServicesIcon />
                            )
                        }
                        disabled={isLoading}
                        sx={{
                            py: 1,
                            fontWeight: "bold",
                            fontSize: "15px",
                            backgroundColor: "#008767",
                            color: "#fff",
                            textTransform: "none",
                            transition: "all 0.4s ease",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "#008767",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                ".icon": {
                                    transform: "rotate(270deg)",
                                },
                            }
                        }}
                    >
                        {isLoading ? 'Updating Doctor...' : 'Doctor'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<MedicalServicesIcon />}
                        sx={{
                            py: 1,
                            fontWeight: "bold",
                            fontSize: "15px",
                            backgroundColor: "#008767",
                            color: "#fff",
                            textTransform: "none",
                            transition: "all 0.4s ease",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "#008767",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                ".icon": {
                                    transform: "rotate(270deg)",
                                },
                            }
                        }}
                    >
                        Create Prescription
                    </Button>
                )}
            </HCForm>
        </Box>
    );
};

export default CreatePrescriptionPage;
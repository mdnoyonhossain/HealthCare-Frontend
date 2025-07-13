"use client";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCDatePicker from "@/components/Forms/HCDatePicker";
import { Box, Button, Grid, Typography } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { AlertCircle, Check } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreatePrescriptionMutation } from "@/redux/api/prescriptionApi";

type TPrescriptionParams = {
    params: Promise<{
        prescriptionId: string;
    }>;
};

const CreatePrescriptionPage = ({ params }: TPrescriptionParams) => {
    const router = useRouter();
    const { prescriptionId } = React.use(params);

    const [isLoading, setIsLoading] = useState(false);
    const [createPrescription] = useCreatePrescriptionMutation();

    const { register, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            medicineName: "Napa Extra",
            dosage: "1 tablet",
            frequency: "3 times daily (1+1+1)",
            duration: "7 days",
            instructionDetails: `Take the medicine after meals.
Drink plenty of water throughout the day.
Avoid spicy food during the treatment period.
Follow-up visit recommended after 7 days.`,
            followUpDate: null,
        },
    });

    const medicationDetails = `
${watch("medicineName") || ""}
Dosage: ${watch("dosage") || ""}
Frequency: ${watch("frequency") || ""}
Duration: ${watch("duration") || ""}`;

    const instructionDetails = watch("instructionDetails") || "";

    const combinedInstructions = `Medication:${medicationDetails}

Instructions:
${instructionDetails}`;

    const handleCreatePrescription = async (data: FieldValues) => {
        const medicationDetails = `${data.medicineName}
            Dosage: ${data.dosage}
            Frequency: ${data.frequency}
            Duration: ${data.duration}
        `;

        const formattedInstructions = `Medication:
${medicationDetails}

Instructions:
${data.instructionDetails}`;

        const prescriptionData = {
            appointmentId: prescriptionId,
            instructions: formattedInstructions,
            followUpDate:
                data.followUpDate?.toISOString?.() ||
                new Date(data.followUpDate).toISOString(),
        };

        setIsLoading(true);

        try {
            const res = await createPrescription(prescriptionData).unwrap();
            if (res?.id) {
                toast.success("Prescription Created Successfully", {
                    description: `The prescription for appointment ID ${prescriptionData.appointmentId} has been recorded successfully.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" },
                });

                setIsLoading(false);
                router.push("/dashboard/doctor/appointments");
            } else if (!res?.id) {
                toast.error("Failed to Create Prescription", {
                    description:
                        "A prescription has already been created for this appointment. Duplicate entries are not allowed.",
                    position: "top-center",
                    duration: 6000,
                    icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                    style: { background: "#FDF1F1", border: "1px solid #FECACA" },
                });

                setIsLoading(false);
            }
        } catch (err: any) {
            toast.error("Server Error", {
                description:
                    err?.message || "The system encountered an error while processing your request. Please contact support if the issue persists.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: "#FDF1F1", border: "1px solid #FECACA" },
            });

            setIsLoading(false);
        }
    };

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
                        Manage your patient prescription
                    </Typography>
                </Box>
            </Box>

            <HCForm onSubmit={handleCreatePrescription}>
                {/* Medication fields */}
                <Typography variant="h6" mt={2} mb={1}>
                    Medications
                </Typography>
                <Grid container spacing={2} mb={3}>
                    <Grid sx={{ xs: 12, sm: 3 }}>
                        <HCInput
                            {...register("medicineName", { required: true })}
                            name="medicineName"
                            label="Medicine Name"
                            placeholder="Napa Extra"
                            fullWidth

                        />
                    </Grid>
                    <Grid sx={{ xs: 12, sm: 3 }}>
                        <HCInput
                            {...register("dosage", { required: true })}
                            name="dosage"
                            label="Dosage"
                            placeholder="1 tablet"
                            fullWidth

                        />
                    </Grid>
                    <Grid sx={{ xs: 12, sm: 3 }}>
                        <HCInput
                            {...register("frequency", { required: true })}
                            name="frequency"
                            label="Frequency"
                            placeholder="3 times daily (1+1+1)"
                            fullWidth

                        />
                    </Grid>
                    <Grid sx={{ xs: 12, sm: 3 }}>
                        <HCInput
                            {...register("duration", { required: true })}
                            name="duration"
                            label="Duration"
                            placeholder="7 days"
                            fullWidth
                        />
                    </Grid>
                </Grid>

                {/* Instructions */}
                <Typography variant="h6" mb={1}>
                    Instructions
                </Typography>
                <Grid container spacing={2} mb={3}>
                    <Grid sx={{ xs: 12, md: 6, sm: 6 }} >
                        <HCInput
                            {...register("instructionDetails", { required: true })}
                            name="instructionDetails"
                            label="Instructions"
                            placeholder={`E.g. Take after meals
                                            Drink plenty of water
                                            Avoid spicy food`
                            }
                            multiline
                            rows={6}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                {/* Follow-up Date */}
                <Grid container spacing={2} mb={3}>
                    <Grid sx={{ xs: 12, sm: 3 }}>
                        <HCDatePicker
                            {...register("followUpDate", { required: true })}
                            name="followUpDate"
                            label="Follow-Up Date"
                            variant="outlined"
                            size="small"

                        />
                    </Grid>
                </Grid>

                {/* Live preview of combined prescription */}
                <Box
                    mt={3}
                    p={2}
                    sx={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: 1,
                        whiteSpace: "pre-wrap",
                        fontFamily: "monospace",
                        fontSize: 14,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Preview
                    </Typography>
                    {combinedInstructions}
                </Box>

                {/* Submit button */}
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
                        marginBottom: "50px",
                        "&:hover": {
                            backgroundColor: "#008767",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            ".icon": {
                                transform: "rotate(270deg)",
                            },
                        },
                    }}
                >
                    {isLoading ? "Creating Prescription..." : "Create Prescription"}
                </Button>
            </HCForm>
        </Box>
    );
};

export default CreatePrescriptionPage;
"use client"
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import { Box, Button, Grid, Typography } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { AlertCircle, Check } from "lucide-react";
import { use, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useRouter } from "next/navigation";
import { useGetSingleSpecialtiesQuery, useUpdateSpecialtiesMutation } from "@/redux/api/specialtiesApi";
import HCFileUploader from "@/components/Forms/HCFileUploader";

type TSpecialtiesUpdateParams = {
    params: Promise<{
        specialtiesId: string;
    }>;
};

const SpecialtiesUpdatePage = ({ params }: TSpecialtiesUpdateParams) => {
    const router = useRouter();
    const { specialtiesId } = use(params);
    const [isLoading, setIsLoading] = useState(false);
    const { data: getSingleSpeciality, isLoading: specialityLoading } = useGetSingleSpecialtiesQuery(specialtiesId);
    const [updateSpicialist, { isLoading: uploadp }] = useUpdateSpecialtiesMutation();

    if (specialityLoading) {
        return <SkeletonLoading />
    }

    const handleCreateSpicialist = async (value: FieldValues) => {
        const { file, title } = value;

        const formData = new FormData();
        if (file) formData.append("file", file);
        formData.append("data", JSON.stringify({ title }));

        setIsLoading(true);

        try {
            const res = await updateSpicialist({ data: formData, id: specialtiesId }).unwrap();
            if (res?.id) {
                toast.success("Spicialist updated successfully", {
                    description: `The specialist "${res?.title}" has been updated successfully.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                router.push('/dashboard/admin/specialties');
            }
            else if (!res?.id) {
                toast.error("Spicialist updated failed", {
                    description: "The update did not complete as expected. Please verify your input and try again.",
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
                description: err?.message || "Unable to update specialist at this time.",
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
                        Update Specialties
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        Update medical specialties
                    </Typography>
                </Box>
            </Box>
            <HCForm onSubmit={handleCreateSpicialist} defaultValues={getSingleSpeciality}>
                <Grid container spacing={2} mt={3} mb={2}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCInput type="text" name="title" label="Title" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCFileUploader type="file" name="file" label="Upload Specialist Photo" variant="contained" sx={{ width: "100%", boxShadow: "none", borderRadius: 1, textTransform: "capitalize", py: 0.7, fontSize: "15px", fontWeight: 600 }} />
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
                            mt: 1,
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
                        {isLoading ? 'Creating Specialist...' : 'Specialist'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<MedicalInformationIcon />}
                        sx={{
                            mt: 1,
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
                        Create Specialist
                    </Button>
                )}
            </HCForm>
        </Box>
    );
};

export default SpecialtiesUpdatePage;
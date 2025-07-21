"use client"
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCSelectField from "@/components/Forms/HCSelectField";
import { genderItems } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { AlertCircle, Check } from "lucide-react";
import { use, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useGetSingleDoctorQuery, useUpdateDoctorMutation } from "@/redux/api/doctorApi";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useRouter } from "next/navigation";

type TDoctorUpdateParams = {
    params: Promise<{
        doctorId: string;
    }>;
};

const DoctorUpdatePage = ({ params }: TDoctorUpdateParams) => {
    const router = useRouter();
    const { doctorId } = use(params);
    const [isLoading, setIsLoading] = useState(false);
    const [updateDoctor] = useUpdateDoctorMutation();
    const { data: getSingleDoctor, isLoading: doctorLoading } = useGetSingleDoctorQuery(doctorId);

    if (doctorLoading) {
        return <SkeletonLoading />
    }

    const handleUpdateDoctor = async (data: FieldValues) => {
        data.appointmentFee = Number(data.appointmentFee);
        data.experience = Number(data.experience);
        data.id = doctorId;
        setIsLoading(true);

        try {
            const res = await updateDoctor({ id: data.id, body: data }).unwrap();
            if (res?.id) {
                toast.success("Doctor Updated Successfully", {
                    description: `Dr. ${res?.name} has been updated as a ${res?.designaton}.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                router.push("/dashboard/admin/doctors");
            }
            else if (!res?.id) {
                toast.error("Failed to update doctor", {
                    description: "Something went wrong while updating the doctor's information. Please try again.",
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
                description: err?.message || "Unable to create doctor at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    const defaultValues = {
        email: getSingleDoctor?.email || "",
        name: getSingleDoctor?.name || "",
        contactNumber: getSingleDoctor?.contactNumber || "",
        address: getSingleDoctor?.address || "",
        registrationNumber: getSingleDoctor?.registrationNumber || "",
        gender: getSingleDoctor?.gender || "",
        experience: getSingleDoctor?.experience || 0,
        appointmentFee: getSingleDoctor?.appointmentFee || 0,
        qualification: getSingleDoctor?.qualification || "",
        currentWorkingPlace: getSingleDoctor?.currentWorkingPlace || "",
        designaton: getSingleDoctor?.designaton || "",
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
                        Update Doctor
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        Manage your doctor info update
                    </Typography>
                </Box>
            </Box>
            <HCForm onSubmit={handleUpdateDoctor} defaultValues={getSingleDoctor && defaultValues}>
                <Grid container spacing={2} mt={3} mb={3}>
                    <Grid size={{ sm: 4, md: 6, xs: 12 }}>
                        <HCInput type="text" name="name" label="Doctor Name" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 6, xs: 12 }}>
                        <HCInput type="email" name="email" disabled={true} label="Email Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="contactNumber" label="Contact Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="address" label="Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="registrationNumber" label="Registration Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCSelectField items={genderItems} name="gender" label="Gender" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="experience" label="Experience" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="appointmentFee" label="Appointment Fee" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="qualification" label="Qualification" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="currentWorkingPlace" label="CurrentWorkingPlace" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="designaton" label="Designation" variant="outlined" size="small" fullWidth />
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
                        Update Doctor
                    </Button>
                )}
            </HCForm>
        </Box>
    );
};

export default DoctorUpdatePage;
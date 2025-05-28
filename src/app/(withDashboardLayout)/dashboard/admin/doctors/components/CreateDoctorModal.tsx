import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCSelectField from "@/components/Forms/HCSelectField";
import HCFullScreenModal from "@/components/Shared/HCModal/HCFullScreenModal";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { genderItems } from "@/types";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Button, Grid } from "@mui/material";
import { AlertCircle, Check, DatabaseBackup } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TDoctorModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const createDoctorValidationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    doctor: z.object({
        email: z.string().email("Invalid email address"),
        name: z.string().min(1, "Name is required"),
        contactNumber: z.string().min(10, "Contact number is required"),
        address: z.string().min(1, "Address is required"),
        registrationNumber: z.string().min(1, "Registration number is required"),
        gender: z.string().min(1, "Gender is required"),
        experience: z.coerce.number().min(0, "Experience must be a non-negative number"),
        appointmentFee: z.coerce.number().min(0, "Appointment fee must be a non-negative number"),
        qualification: z.string().min(1, "Qualification is required"),
        currentWorkingPlace: z.string().min(1, "Current working place is required"),
        designaton: z.string().min(1, "Designation is required"),
        profilePhoto: z.string().default("").optional(),
    }),
});

const CreateDoctorModal = ({ open, setOpen }: TDoctorModal) => {
    const [isLoading, setIsLoading] = useState(false);
    const [createDoctor] = useCreateDoctorMutation();

    const handleCreateDoctor = async (data: FieldValues) => {
        data.doctor.appointmentFee = Number(data.doctor.appointmentFee);
        data.doctor.experience = Number(data.doctor.experience);
        const doctorData = modifyPayload(data);
        setIsLoading(true);

        try {
            const res = await createDoctor(doctorData).unwrap();
            if (res?.id) {
                toast.success("Doctor Created Successfully", {
                    description: `Dr. ${res?.name} has been registered as a ${res?.designaton}.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                setOpen(false);
            }
            else if (!res?.id) {
                toast.error("Email Already Exists", {
                    description: "An account with this email already exists. Please use a different email.",
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
        password: "",
        doctor: {
            email: "",
            name: "",
            contactNumber: "",
            address: "",
            registrationNumber: "",
            gender: "",
            experience: 0,
            appointmentFee: 0,
            qualification: "",
            currentWorkingPlace: "",
            designaton: "",
            profilePhoto: "",
        },
    };

    return (
        <HCFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
            <HCForm onSubmit={handleCreateDoctor} resolver={zodResolver(createDoctorValidationSchema)} defaultValues={defaultValues}>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.name" label="Doctor Name" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="email" name="doctor.email" label="Email Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="password" name="password" label="Password" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.contactNumber" label="Contact Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.address" label="Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.registrationNumber" label="Registration Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCSelectField items={genderItems} name="doctor.gender" label="Gender" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.experience" label="Experience" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.appointmentFee" label="Appointment Fee" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.qualification" label="Qualification" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.currentWorkingPlace" label="CurrentWorkingPlace" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="doctor.designaton" label="Designation" variant="outlined" size="small" fullWidth />
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
                        {isLoading ? 'Creating Doctor...' : 'Doctor'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<MedicalServicesIcon />}
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
                        Create Doctor
                    </Button>
                )}
            </HCForm>
        </HCFullScreenModal>
    );
};

export default CreateDoctorModal;
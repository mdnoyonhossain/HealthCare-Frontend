"use client"
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCFullScreenModal from "@/components/Shared/HCModal/HCFullScreenModal";
import { useGetSingleDoctorQuery, useUpdateDoctorMutation } from "@/redux/api/doctorApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { AlertCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HCSelectField from "@/components/Forms/HCSelectField";
import { genderItems } from "@/types";
import MultipleSelectChip from "./MultipleSelectFieldChip";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";

type TUpdateModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
};

const UpdateMyProfilevalidationSchema = z.object({
    experience: z.preprocess((x) => (x ? x : undefined), z.coerce.number().int().optional()),
    appointmentFee: z.preprocess((x) => (x ? x : undefined), z.coerce.number().int().optional()),
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    gender: z.string().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designaton: z.string().optional(),
    address: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TUpdateModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSpecialtiesIds, setSelectedSpecialtiesIds] = useState<string[]>([]);

    const { data: getSingleDoctorData, refetch, isSuccess } = useGetSingleDoctorQuery(id);
    const { data: getAllSpecialties } = useGetAllSpecialtiesQuery({});
    const [updateDoctor] = useUpdateDoctorMutation();

    useEffect(() => {
        if (!isSuccess) return;

        setSelectedSpecialtiesIds(getSingleDoctorData?.doctorSpecialties?.map((speciality: any) => speciality?.specialitiesId));
    }, [isSuccess]);

    const handleUpdateMyProfile = async (data: FieldValues) => {
        const specialties = selectedSpecialtiesIds?.map((specialitiesId: string) => ({
            specialitiesId,
            isDeleted: false,
        }));

        const excludedFields: Array<keyof typeof data> = [
            'email',
            'id',
            'role',
            'needPasswordChange',
            'status',
            'createdAt',
            'updatedAt',
            'isDeleted',
            'averageRating',
            'review',
            'profilePhoto',
            'registrationNumber',
            'schedules',
            'doctorSpecialties'
        ];

        const updatedValues = Object.fromEntries(
            Object.entries(data)?.filter(([key]) => {
                return !excludedFields.includes(key);
            })
        );

        updatedValues.specialties = specialties;
        setIsLoading(true);

        try {
            const res = await updateDoctor({ body: updatedValues, id }).unwrap();
            if (res?.id) {
                toast.success("Profile updated Successfully", {
                    description: "The doctor's profile has been updated  successfully.",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                refetch();
                setOpen(false);
            }
            else if (!res?.id) {
                toast.error("Failed to update doctor profile", {
                    description: "Unable to update the doctor's profile. Please check the inputs and try again.",
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
                description: err?.message || "Unable to update doctor profile at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    return (
        <HCFullScreenModal open={open} setOpen={setOpen} title='Update My Profile'>
            <HCForm onSubmit={handleUpdateMyProfile} defaultValues={getSingleDoctorData} resolver={zodResolver(UpdateMyProfilevalidationSchema)}>
                <Grid container spacing={2} mt={3} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="name" label="Doctor Name" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="email" name="email" disabled={true} label="Email Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="contactNumber" label="Contact Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCSelectField items={genderItems} name="gender" label="Gender" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="address" label="Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="registrationNumber" disabled={true} label="Registration Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="qualification" label="Qualification" variant="outlined" size="small" fullWidth />
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
                        <HCInput type="text" name="currentWorkingPlace" label="Current Working Place" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="designaton" label="Designation" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <MultipleSelectChip
                            allSpecialties={getAllSpecialties}
                            selectedIds={selectedSpecialtiesIds}
                            setSelectedIds={setSelectedSpecialtiesIds}
                        />
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
                                <AccountBoxIcon />
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
                        {isLoading ? 'Updating Profile...' : 'Profile'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<AccountBoxIcon />}
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
                        Update Profile
                    </Button>
                )}
            </HCForm>
        </HCFullScreenModal>
    );
};

export default ProfileUpdateModal;
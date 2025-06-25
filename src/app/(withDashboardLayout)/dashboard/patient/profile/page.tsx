"use client"
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/userApi";
import { Box, Button, Grid } from "@mui/material";
import Image from "next/image";
import defaultDoctorImg from "@/assets/images/defautlDoctor.jpg";
import DoctorInformation from "./components/PatientInformations";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import { toast } from "sonner";
import { AlertCircle, Check } from "lucide-react";
import ProfileUpdateModal from "./components/PatientProfileUpdateModal";
import { useState } from "react";

const PatientProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: getMyProfile, isLoading } = useGetMyProfileQuery({});
    const [updateMyProfile, { isLoading: updateMyProfileLoading }] = useUpdateMyProfileMutation();
    
    const fileUploadHandler = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({}));

        try {
            const res = await updateMyProfile(formData).unwrap();
            if (res?.id) {
                toast.success("Profile Photo Updated Successfully", {
                    description: "Your new profile photo is now live.",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });
            }
        }
        catch (err: any) {
            toast.error("Something went wrong", {
                description: err?.message || "Unable to update profile photo at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });
        }
    };

    if (isLoading) {
        return <SkeletonLoading />;
    }

    return (
        <Grid container spacing={3} mb={3}>
            <Grid size={{ sm: 6, md: 4, xs: 12 }}>
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        position: 'relative',
                        borderRadius: 2,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        src={getMyProfile?.profilePhoto || defaultDoctorImg}
                        alt="User Photo"
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                    />
                </Box>

                <Box mt={2}>
                    {updateMyProfileLoading ? (
                        <Button
                            variant="outlined"
                            fullWidth
                            disabled
                            startIcon={<CloudUploadIcon />}
                            sx={{
                                py: 1.5,
                                fontWeight: "bold",
                                fontSize: "15px",
                                textTransform: "none",
                                color: "#666",
                                borderColor: "#ccc",
                                "& .MuiButton-startIcon": {
                                    color: "#999",
                                },
                            }}
                        >
                            Uploading...
                        </Button>
                    ) : (
                        <Button
                            component="label"
                            variant="outlined"
                            fullWidth
                            sx={{
                                fontWeight: "bold",
                                fontSize: "15px",
                                textTransform: "none",
                                backgroundColor: "#F9FAFB",
                                borderColor: "#008767",
                                color: "#008767",
                                "&:hover": {
                                    backgroundColor: "#E6F4F1",
                                    borderColor: "#008767",
                                },
                            }}
                        >
                            <AutoFileUploader
                                name='file'
                                label='Choose Your Profile Photo'
                                icon={<CloudUploadIcon />}
                                onFileUpload={fileUploadHandler}
                                variant='text'
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "15px",
                                    textTransform: "none",
                                    backgroundColor: "#F9FAFB",
                                    borderColor: "#008767",
                                    color: "#008767",
                                    "&:hover": {
                                        backgroundColor: "#E6F4F1",
                                        borderColor: "#008767",
                                    },
                                }}
                            />
                        </Button>
                    )}
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ModeEditIcon className="icon" sx={{ transition: "transform 0.4s ease" }} />}
                    sx={{
                        mt: 2,
                        px: 3,
                        py: 1.5,
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
                        },
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    Edit Profile
                </Button>
                <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id={getMyProfile?.id} />
            </Grid>

            <Grid size={{ sm: 6, md: 8, xs: 12 }}>
                <DoctorInformation data={getMyProfile} />
            </Grid>
        </Grid>
    );
};

export default PatientProfile;
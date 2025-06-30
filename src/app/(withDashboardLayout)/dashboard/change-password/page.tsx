"use client";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AlertCircle, Check, KeySquareIcon, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyIcon from '@mui/icons-material/Key';
import { useChangePasswordMutation } from "@/redux/api/authApi";
import logoutUser from "@/services/actions/logoutUser";

const changePasswordValidationSchema = z.object({
    oldPassword: z.string().min(6, 'Old Password Must be at least 6 characters long'),
    newPassword: z.string().min(6, 'New Password Must be at least 6 characters long'),
});

const ChangePasswordPage = () => {
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [changePassword] = useChangePasswordMutation();

    const handleChangePassword = async (data: FieldValues) => {
        setIsLoading(true);

        try {
            const res = await changePassword(data);
            if (res?.data) {
                toast.success("Password Change successful", {
                    description: res?.data?.message,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                logoutUser(navigate);
            }
            else if (!res?.data) {
                toast.error("Password Change Failed", {
                    description: "The current password you entered is incorrect. Please try again.",
                    position: "top-center",
                    duration: 4000,
                    icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                    style: { background: '#FDF1F1', border: "1px solid #FECACA" }
                });

                setIsLoading(false)
            }
        }
        catch (err: any) {
            toast.error("Something went wrong during login", {
                description: err?.message || "We couldn’t log you in due to a technical issue. Please check your internet connection or try again later.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-[700px]">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                    <Stack sx={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Box sx={{
                            width: "100%",
                            background: "white",
                            boxShadow: 1,
                            borderRadius: 1,
                            p: 4
                        }}>
                            <Stack sx={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Box
                                    sx={{
                                        marginTop: "-30px",
                                        marginBottom: "-13px",
                                        '& svg': {
                                            width: 100,
                                            height: 100,
                                        },
                                    }}
                                >
                                    <KeyIcon sx={{ color: 'primary.main' }} />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        fontWeight={600}
                                        fontSize={26}
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Box component="span" color="primary.main">C</Box>hange
                                        <Box component="span" color="primary.main"> P</Box>assword
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <HCForm onSubmit={handleChangePassword} resolver={zodResolver(changePasswordValidationSchema)} defaultValues={{ oldPassword: "", newPassword: "" }}>
                                    <Grid container spacing={2} mt={2} mb={2}>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <HCInput type="password" name="oldPassword" label="Old Password" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <HCInput type="password" name="newPassword" label="New Password" variant="outlined" size="small" fullWidth />
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
                                                    <KeySquareIcon size={18} />
                                                )
                                            }
                                            disabled={isLoading}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#2CB0ED',
                                                padding: { xs: "6px 16px", sm: "6px 50px" },
                                                fontSize: "15px",
                                                textTransform: "capitalize",
                                                margin: "10px 0 8px 0",
                                                '&:hover': {
                                                    backgroundColor: '#2196f3',
                                                    boxShadow: "none"
                                                },
                                            }}
                                        >
                                            {isLoading ? 'Changing Password...' : 'Change Password'}
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            type="submit"
                                            startIcon={<KeySquareIcon size={18} />}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#2CB0ED',
                                                padding: { xs: "6px 16px", sm: "6px 50px" },
                                                fontSize: "15px",
                                                textTransform: "capitalize",
                                                margin: "10px 0 8px 0",
                                                '&:hover': {
                                                    backgroundColor: '#2196f3',
                                                    boxShadow: "none"
                                                },
                                            }}
                                        >
                                            Change Password
                                        </Button>
                                    )}
                                </HCForm>
                            </Box>
                        </Box>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
"use client";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import { Alert, Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AlertCircle, Check, KeySquareIcon, RotateCcwKeyIcon } from "lucide-react";
import CheckIcon from '@mui/icons-material/Check';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/redux/api/authApi";

const forgotPasswordValidationSchema = z.object({
    email: z.string().email('Please enter a valid email address!'),
});

const ForgotPassword = () => {
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [forgotPassword, { isSuccess }] = useForgotPasswordMutation();

    const handleForgotPassword = async (data: FieldValues) => {
        setIsLoading(true);

        try {
            const res = await forgotPassword(data);
            if (!res?.data) {
                toast.error("Forgot password Failed", {
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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-[600px]">
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
                                        marginTop: "-20px",
                                        '& svg': {
                                            width: 100,
                                            height: 100,
                                        },
                                    }}
                                >
                                    <LockResetIcon sx={{ color: 'primary.main' }} />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h4"
                                        fontWeight={600}
                                        fontSize={25}
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Box component="span" color="primary.main">F</Box>orgot
                                        <Box component="span" color="primary.main"> P</Box>assword
                                    </Typography>
                                </Box>
                            </Stack>
                            {isSuccess && (
                                <Box mt={1.8}>
                                    <Alert
                                        icon={<CheckIcon fontSize='inherit' />}
                                        severity='success'
                                    >
                                        An Email with reset password link was sent to your email
                                    </Alert>
                                </Box>
                            )}
                            <Box>
                                {!isSuccess && (
                                    <HCForm onSubmit={handleForgotPassword} resolver={zodResolver(forgotPasswordValidationSchema)} defaultValues={{ email: "" }}>
                                        <Grid container spacing={2} mt={2} mb={1}>
                                            <Grid size={{ sm: 12, md: 12, xs: 12 }}>
                                                <HCInput type="email" name="email" label="Your Email" variant="outlined" size="small" fullWidth />
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
                                                {isLoading ? 'Forgot Password...' : 'Change Password'}
                                            </Button>
                                        ) : (
                                            <Button
                                                fullWidth
                                                type="submit"
                                                startIcon={<RotateCcwKeyIcon size={18} />}
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
                                                Forgot Password
                                            </Button>
                                        )}
                                    </HCForm>
                                )}
                            </Box>
                        </Box>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
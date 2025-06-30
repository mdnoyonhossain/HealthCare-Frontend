"use client";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AlertCircle, Check, KeySquareIcon, RotateCcwKeyIcon } from "lucide-react";
import KeyIcon from '@mui/icons-material/Key';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { authKey } from "@/constants/authKey";
import { deleteCookies } from "@/services/actions/deleteCookies";

const resetPasswordValidationSchema = z.object({
    password: z.string().min(6, 'New Password Must be at least 6 characters long'),
});

const ResetPassword = () => {
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const [resetPassword] = useResetPasswordMutation();

    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) return;
        localStorage.setItem(authKey, token);
    }, [token]);

    const handleForgotPassword = async (data: FieldValues) => {
        setIsLoading(true);
        const updatedData = { ...data, id: userId };

        try {
            const res = await resetPassword(updatedData);
            if (res?.data) {
                toast.success("Password has been successfully reset.", {
                    description: "Password has been successfully reset. Please use your new credentials to login.",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                localStorage.removeItem(authKey);
                deleteCookies([authKey, 'refreshToken']);

                setIsLoading(false);
                navigate.push('/login');
            }
            else if (!res?.data) {
                toast.error("Password Reset Failed", {
                    description: "Please try again.",
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
                                        marginTop: "-30px",
                                        marginBottom: "-15px",
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
                                        fontSize={28}
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Box component="span" color="primary.main">R</Box>eset
                                        <Box component="span" color="primary.main"> P</Box>assword
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <HCForm onSubmit={handleForgotPassword} resolver={zodResolver(resetPasswordValidationSchema)} defaultValues={{ password: "" }}>
                                    <Grid container spacing={2} mt={2} mb={1}>
                                        <Grid size={{ sm: 12, md: 12, xs: 12 }}>
                                            <HCInput type="password" name="password" label="New Password" variant="outlined" size="small" fullWidth />
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
                                            {isLoading ? 'Reset Password...' : 'Reset Password'}
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
                                            Reset Password
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

export default ResetPassword;
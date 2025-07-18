"use client";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import loginUser from "@/services/actions/loginUser";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { AlertCircle, Check, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userLoginValidationSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginPage = () => {
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data: FieldValues) => {
        setIsLoading(true);

        try {
            const res = await loginUser(data);
            if (res?.data) {
                toast.success("Login successful", {
                    description: `Welcome back! ${res?.message} Redirecting to your dashboard...`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                if (res?.data?.accessToken) {
                    storeUserInfo({ accessToken: res?.data?.accessToken })
                }

                setIsLoading(false);
            }
            else if (!res?.success) {
                toast.error("Login failed", {
                    description: "Invalid email or password. Please try again.",
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
                                <Box>
                                    <Typography
                                        component={Link}
                                        href="/"
                                        variant="h4"
                                        fontWeight={600}
                                        sx={{ textDecoration: "none" }}
                                    >
                                        <Box component="span" color="primary.main">H</Box>ealth
                                        <Box component="span" color="primary.main">C</Box>are
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="body2" color="text.secondary" mt={0.3} mb={0.5}>
                                        Enter your credentials to access your account
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <HCForm onSubmit={handleLogin} resolver={zodResolver(userLoginValidationSchema)} defaultValues={{ email: "", password: "" }}>
                                    <Grid container spacing={2} mt={2} mb={1}>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <HCInput type="email" name="email" label="Email" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <HCInput type="password" name="password" label="Password" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Link href="forgot-password">
                                        <Typography variant="body2" align="right" className="text-[#2CB0ED] hover:underline cursor-pointer" mb={1}>
                                            Forgot password?
                                        </Typography>
                                    </Link>
                                    {isLoading ? (
                                        <Button
                                            fullWidth
                                            type="submit"
                                            startIcon={
                                                isLoading ? (
                                                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <LogIn size={18} />
                                                )
                                            }
                                            disabled={isLoading}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#2CB0ED',
                                                padding: { xs: "6px 16px", sm: "6px 50px" },
                                                fontSize: "15px",
                                                margin: "10px 0 8px 0",
                                                '&:hover': {
                                                    backgroundColor: '#2196f3',
                                                    boxShadow: "none"
                                                },
                                            }}
                                        >
                                            {isLoading ? 'Logging in...' : 'Login'}
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            type="submit"
                                            startIcon={<LogIn size={18} />}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#2CB0ED',
                                                padding: { xs: "6px 16px", sm: "6px 50px" },
                                                fontSize: "15px",
                                                margin: "10px 0 8px 0",
                                                '&:hover': {
                                                    backgroundColor: '#2196f3',
                                                    boxShadow: "none"
                                                },
                                            }}
                                        >
                                            Login
                                        </Button>
                                    )}
                                    <Typography variant="body2" color="text.secondary" align="center" mt={0.3}>
                                        Don&apos;t have an account?{" "}
                                        <Link href="/register" className="text-[#2CB0ED] hover:underline">
                                            Create account
                                        </Link>
                                    </Typography>
                                </HCForm>
                            </Box>
                        </Box>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
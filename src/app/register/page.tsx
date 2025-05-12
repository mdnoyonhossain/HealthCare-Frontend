"use client"
import registerPatient from "@/services/actions/registerPatient";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { AlertCircle, Check, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TPatientRegisterData = {
    password: string;
    patient: {
        name: string;
        email: string;
        contactNumber: string;
        address: string;
    }
};

const RegisterPage = () => {
    const { register, handleSubmit } = useForm<TPatientRegisterData>();
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<TPatientRegisterData> = async (data) => {
        const patientData = modifyPayload(data);
        setIsLoading(true);

        try {
            const res = await registerPatient(patientData);
            if (res?.data?.id) {
                toast.success("Account created successfully", {
                    description: res?.message,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                navigate.push("/login");
            }
            else if (!res?.success) {
                toast.error("Account created failed", {
                    description: `This email is already registered. Please try logging in or use a different email address.`,
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
                description: err?.message || "Unable to create account at this time.",
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
                                        Sign up to access healthcare services
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Grid container spacing={2} my={2}>
                                        <Grid size={{ sm: 12, md: 12, xs: 12 }}>
                                            <TextField {...register("patient.name")} label="Name" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <TextField type="email" {...register("patient.email")} label="Email" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <TextField type="password" {...register("password")} label="Password" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <TextField type="tel" {...register("patient.contactNumber")} label="Contact Number" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <TextField type="text" {...register("patient.address")} label="Address" variant="outlined" size="small" fullWidth />
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
                                                    <UserPlus size={18} />
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
                                            {isLoading ? 'Creating account...' : 'Sign Up'}
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            type="submit"
                                            startIcon={<UserPlus size={18} />}
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
                                            Sign Up
                                        </Button>
                                    )}
                                    <Typography variant="body2" color="text.secondary" align="center" mt={0.3}>
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-[#2CB0ED] hover:underline">
                                            Login
                                        </Link>
                                    </Typography>
                                </form>
                            </Box>
                        </Box>
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
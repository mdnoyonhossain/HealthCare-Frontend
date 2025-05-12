"use client"
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

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

    const onSubmit: SubmitHandler<TPatientRegisterData> = (data) => {
        const patientData = modifyPayload(data);
        console.log(patientData);
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
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { LogIn } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
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
                                    <Typography variant="body2" color="text.secondary" mt={0.3}>
                                        Enter your credentials to access your account
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <form>
                                    <Grid container spacing={2} mt={2} mb={1}>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <TextField type="email" label="Email" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                        <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                                            <TextField type="password" label="Password" variant="outlined" size="small" fullWidth />
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body2" align="right" className="text-[#2CB0ED] hover:underline cursor-pointer" mb={1}>
                                        Forgot password?
                                    </Typography>
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
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Don&apos;t have an account?{" "}
                                        <Link href="/register" className="text-[#2CB0ED] hover:underline">
                                            Create account
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

export default LoginPage;
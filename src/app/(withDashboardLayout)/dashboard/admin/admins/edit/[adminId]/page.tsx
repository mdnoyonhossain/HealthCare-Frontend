"use client"
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import { Box, Button, Grid, Typography } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { AlertCircle, Check } from "lucide-react";
import { use, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useRouter } from "next/navigation";
import { useGetSingleAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";

type TAdminUpdateParams = {
    params: Promise<{
        adminId: string;
    }>;
};

const AdminUpdatePage = ({ params }: TAdminUpdateParams) => {
    const router = useRouter();
    const { adminId } = use(params);
    const [isLoading, setIsLoading] = useState(false);
    const [updateAdmin] = useUpdateAdminMutation();
    const { data: getSingleAdmin, isLoading: doctorLoading } = useGetSingleAdminQuery(adminId);

    if (doctorLoading) {
        return <SkeletonLoading />
    }

    const handleUpdateAdmin = async (data: FieldValues) => {
        data.id = adminId;
        setIsLoading(true);

        try {
            const res = await updateAdmin({ id: data.id, body: data }).unwrap();
            if (res?.id) {
                toast.success("Doctor Updated Successfully", {
                    description: `Dr. ${res?.name} has been updated`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                router.push("/dashboard/admin/admins");
            }
            else if (!res?.id) {
                toast.error("Failed to update doctor", {
                    description: "Something went wrong while updating the doctor's information. Please try again.",
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
        email: getSingleAdmin?.email || "",
        name: getSingleAdmin?.name || "",
        contactNumber: getSingleAdmin?.contactNumber || "",
    };

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Update Admin
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        Manage your admin info update
                    </Typography>
                </Box>
            </Box>
            <HCForm onSubmit={handleUpdateAdmin} defaultValues={getSingleAdmin && defaultValues}>
                <Grid container spacing={2} mt={3} mb={3}>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="name" label="Doctor Name" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="text" name="contactNumber" label="Contact Number" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 4, xs: 12 }}>
                        <HCInput type="email" name="email" disabled={true} label="Email Address" variant="outlined" size="small" fullWidth />
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
                                <AdminPanelSettingsIcon />
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
                        {isLoading ? 'Updating Admin...' : 'Admin'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<AdminPanelSettingsIcon />}
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
                        Update Admin
                    </Button>
                )}
            </HCForm>
        </Box>
    );
};

export default AdminUpdatePage;
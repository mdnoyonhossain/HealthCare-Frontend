import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCFullScreenModal from "@/components/Shared/HCModal/HCFullScreenModal";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button, Grid } from "@mui/material";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TAdminModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const createAdminValidationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    admin: z.object({
        email: z.string().email("Invalid email address"),
        name: z.string().min(1, "Name is required"),
        contactNumber: z.string().min(10, "Contact number is required")
    }),
});

const CreateAdminModal = ({ open, setOpen }: TAdminModal) => {
    const [isLoading, setIsLoading] = useState(false);
    const [createAdmin] = useCreateAdminMutation();

    const handleCreateAdmin = async (data: FieldValues) => {
        const adminData = modifyPayload(data);
        setIsLoading(true);

        try {
            const res = await createAdmin(adminData).unwrap();
            if (res?.id) {
                toast.success("Admin Created Successfully", {
                    description: `Mr. ${res?.name} has been registered.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                setOpen(false);
            }
            else if (!res?.id) {
                toast.error("Email Already Exists", {
                    description: "An account with this email already exists. Please use a different email.",
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
        password: "",
        admin: {
            email: "",
            name: "",
            contactNumber: ""
        },
    };

    return (
        <HCFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
            <HCForm onSubmit={handleCreateAdmin} resolver={zodResolver(createAdminValidationSchema)} defaultValues={defaultValues}>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 4, md: 6, xs: 12 }}>
                        <HCInput type="text" name="admin.name" label="Admin Name" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 6, xs: 12 }}>
                        <HCInput type="email" name="admin.email" label="Email Address" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 4, md: 6, xs: 12 }}>
                        <HCInput type="password" name="password" label="Password" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 4, md: 6, xs: 12 }}>
                        <HCInput type="text" name="admin.contactNumber" label="Contact Number" variant="outlined" size="small" fullWidth />
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
                            mt: 2,
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
                        {isLoading ? 'Creating Admin...' : 'Admin'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<AdminPanelSettingsIcon />}
                        sx={{
                            mt: 2,
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
                        Create Admin
                    </Button>
                )}
            </HCForm>
        </HCFullScreenModal>
    );
};

export default CreateAdminModal;
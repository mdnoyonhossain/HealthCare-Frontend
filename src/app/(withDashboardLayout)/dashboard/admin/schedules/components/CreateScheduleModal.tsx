"use client"
import HCDatePicker from "@/components/Forms/HCDatePicker";
import HCForm from "@/components/Forms/HCForm";
import HCTimePicker from "@/components/Forms/HCTimePicker";
import HCModal from "@/components/Shared/HCModal/HCModal"
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Button, Grid } from "@mui/material";
import dayjs from "dayjs";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TSchedulesModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateScheduleModal = ({ open, setOpen }: TSchedulesModal) => {
    const [isLoading, setIsLoading] = useState(false);
    const [createSchedule] = useCreateScheduleMutation();

    const handleCreateSchedule = async (values: FieldValues) => {
        setIsLoading(true);

        values.startDate = dateFormatter(values.startDate);
        values.endDate = dateFormatter(values.endDate);
        values.startTime = timeFormatter(values.startTime);
        values.endTime = timeFormatter(values.endTime);

        try {
            const res = await createSchedule(values).unwrap();
            if (res?.length) {
                toast.success("Schedule created successfully", {
                    description: "Schedule has been created successfully. You can now view it in the data table.",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                setOpen(false);
            }
            else if (!res?.length) {
                toast.error("Schedule created failed", {
                    description: "An unexpected error occurred while creating the schedule. Please try again.",
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
                description: err?.message || "Unable to create schedule at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    return (
        <HCModal open={open} setOpen={setOpen} title="Create Schedules">
            <HCForm onSubmit={handleCreateSchedule}>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCDatePicker name="startDate" label="Start Date" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCDatePicker name="endDate" label="End Date" variant="outlined" size="small" fullWidth />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={3} mb={2}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCTimePicker name="startTime" label="Start Time" variant="outlined" size="small" fullWidth />
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <HCTimePicker name="endTime" label="End Time" variant="outlined" size="small" fullWidth />
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
                                <EventAvailableIcon />
                            )
                        }
                        disabled={isLoading}
                        sx={{
                            mt: 0.5,
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
                        {isLoading ? 'Creating Schedule...' : 'Schedule'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        type="submit"
                        startIcon={<EventAvailableIcon />}
                        sx={{
                            mt: 0.5,
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
                        Create Schedule
                    </Button>
                )}
            </HCForm>
        </HCModal>
    );
};

export default CreateScheduleModal;
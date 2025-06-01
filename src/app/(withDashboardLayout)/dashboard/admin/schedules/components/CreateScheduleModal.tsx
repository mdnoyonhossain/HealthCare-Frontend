"use client"
import HCDatePicker from "@/components/Forms/HCDatePicker";
import HCForm from "@/components/Forms/HCForm";
import HCTimePicker from "@/components/Forms/HCTimePicker";
import HCModal from "@/components/Shared/HCModal/HCModal"
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";
import { zodResolver } from "@hookform/resolvers/zod";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Button, Grid } from "@mui/material";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { date, z } from "zod";

type TSchedulesModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const createScheduleValidationSchema = z.object({
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Start time must be in HH:mm format"),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "End time must be in HH:mm format"),
});

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
            const res = await createSchedule(values);
            if (res) {
                toast.success("Schedule created successfully", {
                    description: `Scheduled from ${values.startDate} ${values.startTime} to ${values.endDate} ${values.endTime}.`,
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                setOpen(false);
            }
            else if (!res) {
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
            <HCForm onSubmit={handleCreateSchedule} /**resolver={zodResolver(createScheduleValidationSchema)} defaultValues={{ startDate: "", endDate: "", startTime: "", endTime: "" }} */>
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
                            color: 'white',
                            backgroundColor: '#2CB0ED',
                            padding: { xs: "6px 16px", sm: "6px 50px" },
                            fontSize: "15px",
                            margin: "10px 0 8px 0",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                boxShadow: "none"
                            },
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
                            color: 'white',
                            backgroundColor: '#2CB0ED',
                            padding: { xs: "6px 16px", sm: "6px 50px" },
                            fontSize: "15px",
                            margin: "10px 0 8px 0",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#2196f3',
                                boxShadow: "none"
                            },
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
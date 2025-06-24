"use client"
import HCForm from "@/components/Forms/HCForm";
import HCModal from "@/components/Shared/HCModal/HCModal"
import { useGetAllSchedulesQuery } from "@/redux/api/scheduleApi";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "@mui/x-date-pickers";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorSchedule";

type TSchedulesModal = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateDoctorScheduleModal = ({ open, setOpen }: TSchedulesModal) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()).toISOString());
    const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);
    const [createDoctorSchedule] = useCreateDoctorScheduleMutation();

    const query: Record<string, any> = {};
    if (!!selectedDate) {
        query['startDate'] = dayjs(selectedDate).hour(0).minute(0).millisecond(0).toISOString();
        query['endDate'] = dayjs(selectedDate).hour(23).minute(59).millisecond(999).toISOString();
    }

    const { data: allSchedules } = useGetAllSchedulesQuery(query);
    const schedules = allSchedules?.schedules?.data

    const handleCreateDoctorSchedule = async () => {
        setIsLoading(true);

        try {
            const res = await createDoctorSchedule({ scheduleIds: selectedScheduleIds }).unwrap();
            if (res?.count) {
                toast.success("Doctor schedule created successfully", {
                    description: "The doctor's schedule has been created successfully",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });

                setIsLoading(false);
                setOpen(false);
            }
            else if (!res.count) {
                toast.error("Doctor schedule created failed", {
                    description: "We couldn't create the doctor's schedule. Please try again.",
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
                description: err?.message || "Unable to create doctor schedule at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });

            setIsLoading(false);
        }
    }

    return (
        <HCModal open={open} setOpen={setOpen} title="Create Doctor Schedules">
            <HCForm onSubmit={handleCreateDoctorSchedule}>
                <Grid container spacing={2} mt={2} mb={1}>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Available Schedule Date"
                                value={dayjs(selectedDate)}
                                onChange={(newValue) => setSelectedDate(dayjs(newValue).toISOString())}
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        sx: { width: '100%' },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ sm: 6, md: 6, xs: 12 }}>
                        <MultipleSelectFieldChip
                            schedules={schedules}
                            selectedScheduleIds={selectedScheduleIds}
                            setSelectedScheduleIds={setSelectedScheduleIds}
                        />
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
                            backgroundColor: '#008767',
                            padding: { xs: "6px 16px", sm: "6px 50px" },
                            fontSize: "15px",
                            margin: "10px 0 8px 0",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#008767',
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
                            backgroundColor: '#008767',
                            padding: { xs: "6px 16px", sm: "6px 50px" },
                            fontSize: "15px",
                            margin: "10px 0 8px 0",
                            textTransform: "capitalize",
                            '&:hover': {
                                backgroundColor: '#008767',
                                boxShadow: "none"
                            },
                        }}
                    >
                        Create Doctor Schedule
                    </Button>
                )}
            </HCForm>
        </HCModal>
    );
};

export default CreateDoctorScheduleModal;
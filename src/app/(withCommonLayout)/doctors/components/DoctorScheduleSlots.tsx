'use client';
import { useState } from 'react';
import { Box, Button, Stack, Typography, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { getTimeIn12HourFormat } from '@/app/(withDashboardLayout)/dashboard/doctor/schedules/components/MultipleSelectFieldChip';
import { useGetAllDoctorSchedulesQuery } from '@/redux/api/doctorSchedule';
import { TDoctorSchedule } from '@/types/doctorSchedules';
import { dateFormatter } from '@/utils/dateFormatter';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useCreateAppointmentMutation } from '@/redux/api/appointmentApi';
import { toast } from 'sonner';
import { AlertCircle, Check } from 'lucide-react';
import { useInitialPaymentMutation } from '@/redux/api/paymentApi';

dayjs.extend(utc);

const DoctorScheduleSlots = ({ id }: { id: string }) => {
    const [todayScheduleId, setTodayScheduleId] = useState('');
    const [tomorrowScheduleId, setTomorrowScheduleId] = useState('');
    const router = useRouter();

    const today = dayjs().startOf('day').toDate();
    const tomorrow = dayjs().add(1, 'day').startOf('day').toDate();

    const getQuery = (date: Date) => ({
        doctorId: id,
        startDate: dayjs(date).utc().startOf('day').toISOString(),
        endDate: dayjs(date).utc().endOf('day').toISOString(),
    });

    const { data, isLoading } = useGetAllDoctorSchedulesQuery(getQuery(today));
    const { data: nextData, isLoading: isNextLoading } = useGetAllDoctorSchedulesQuery(getQuery(tomorrow));
    const [createAppointment] = useCreateAppointmentMutation();
    const [initialPayment] = useInitialPaymentMutation();

    const todaySlots = data?.doctorSchedules?.data?.filter((d: TDoctorSchedule) => !d.isBooked) || [];
    const tomorrowSlots = nextData?.doctorSchedules?.data?.filter((d: TDoctorSchedule) => !d.isBooked) || [];

    const renderSlotButtons = (slots: TDoctorSchedule[], isToday: boolean) => {
        const selectedId = isToday ? todayScheduleId : tomorrowScheduleId;
        const setSelectedId = isToday ? setTodayScheduleId : setTomorrowScheduleId;

        return (
            <Stack
                direction="row"
                flexWrap="wrap"
                gap={2}
                mt={2}
                justifyContent={{ xs: 'center', sm: 'flex-start' }} // center on mobile, left on bigger
            >
                {(isLoading || isNextLoading) ? (
                    <Typography>Loading...</Typography>
                ) : slots?.length ? (
                    slots?.map(({ schedule, scheduleId: id }) => {
                        const timeSlot = `${getTimeIn12HourFormat(schedule?.startDateTime)} - ${getTimeIn12HourFormat(schedule?.endDateTime)}`;
                        const isSelected = id === selectedId;

                        return (
                            <Button
                                key={id}
                                onClick={() => setSelectedId(id)}
                                variant={isSelected ? 'contained' : 'outlined'}
                                color="primary"
                                startIcon={<AccessTimeIcon />}
                                sx={{
                                    px: { xs: 2, sm: 3 },
                                    py: { xs: 0.8, sm: 1.2 },
                                    borderRadius: '25px',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    minWidth: { xs: '120px', sm: 'auto' },
                                    backgroundColor: isSelected ? 'primary.main' : 'rgba(255,255,255,0.06)',
                                    color: isSelected ? '#fff' : 'text.primary',
                                    borderColor: isSelected ? 'primary.dark' : 'grey.400',
                                    boxShadow: isSelected ? 3 : 0,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        backgroundColor: isSelected ? 'primary.dark' : 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                {timeSlot}
                            </Button>
                        );
                    })
                ) : (
                    <Typography color="error" fontSize={14}>
                        No available slots {isToday ? 'today' : 'tomorrow'}.
                    </Typography>
                )}
            </Stack>
        );
    };

    const handleBookAppointment = async () => {
        try {
            if (id && todayScheduleId) {
                const res = await createAppointment({ doctorId: id, scheduleId: todayScheduleId }).unwrap();
                if (res?.id) {
                    toast.success("Appointment booked successfully.", {
                        description: res?.message,
                        duration: 5000,
                        icon: <Check className="h-4 w-4 text-green-500" />,
                        style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                    });

                    const response = await initialPayment(res?.id).unwrap();
                    if (response?.paymentUrl) {
                        router.push(response?.paymentUrl);
                    }
                }
                else if (!res?.id) {
                    toast.error("Appointment booked failed", {
                        description: `Expected a record, found none.`,
                        position: "top-center",
                        duration: 6000,
                        icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                        style: { background: '#FDF1F1', border: "1px solid #FECACA" }
                    });
                }
            }
        }
        catch (err: any) {
            toast.error("Something went wrong", {
                description: err?.message || "Unable to appointment at this time.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });
        }
        // if (todayScheduleId) {
        //     console.log('Booking today with scheduleId:', { scheduleId: todayScheduleId, doctorId: id });
        // }
        // if (tomorrowScheduleId) {
        //     console.log('Booking tomorrow with scheduleId:', tomorrowScheduleId);
        // }
        // if (!todayScheduleId && !tomorrowScheduleId) {
        //     alert('Please select a slot to book.');
        // }
    };

    return (
        <Box sx={{ my: { xs: 3, md: 5 }, px: { xs: 1, sm: 2, md: 3 } }}>
            <Box
                sx={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: 4,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 3, sm: 4, md: 4 },
                    border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                <Typography
                    variant="h4"
                    color="primary.main"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        textAlign: 'left',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            display: 'block',
                            width: '160px',
                            height: '4px',
                            backgroundColor: 'primary.main',
                            borderRadius: '2px',
                            marginTop: '8px',
                        },
                    }}
                >
                    Doctor Available Schedules
                </Typography>


                {/* Today */}
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
                >
                    Today: {dateFormatter(today.toISOString())} ({dayjs(today).format('dddd')})
                </Typography>
                {renderSlotButtons(todaySlots, true)}

                <Divider sx={{ my: { xs: 3, sm: 4 }, borderStyle: 'dashed', borderColor: 'grey.400' }} />

                {/* Tomorrow */}
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}
                >
                    Tomorrow: {dateFormatter(tomorrow.toISOString())} ({dayjs(tomorrow).format('dddd')})
                </Typography>
                {renderSlotButtons(tomorrowSlots, false)}
                <Button
                    onClick={handleBookAppointment}
                    variant="contained"
                    size="large"
                    disabled={!todayScheduleId && !tomorrowScheduleId}
                    sx={{
                        mt: { xs: 4, sm: 5 },
                        mx: 'auto',
                        display: 'block',
                        borderRadius: '999px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: { xs: 4, sm: 5 },
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        backgroundColor: "#008767",
                        color: '#fff',
                        boxShadow: '0 4px 20px rgba(33,203,243,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: "#006d57",
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                            '& .icon': {
                                transform: 'rotate(15deg) scale(1.1)',
                                transition: 'all 0.3s ease',
                            },
                        },
                        '&:disabled': {
                            backgroundImage: 'none',
                            backgroundColor: 'grey.400',
                            boxShadow: 'none',
                            color: 'grey.700',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EventAvailableIcon className="icon" />
                        <span>Confirm Appointment</span>
                    </Box>
                </Button>
            </Box>
        </Box>
    );
};

export default DoctorScheduleSlots;
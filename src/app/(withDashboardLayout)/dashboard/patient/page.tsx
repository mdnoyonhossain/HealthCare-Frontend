"use client";
import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useGetMetaDataQuery } from '@/redux/api/metaApi';
import SkeletonLoading from '@/components/Loading/SkeletonLoading';

const PatientPage = () => {
    const { data } = useGetMetaDataQuery({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!data) return <SkeletonLoading />;

    const stats = [
        { label: 'Appointments', value: data?.appointmentCount, color: '#42a5f5' },
        { label: 'Prescriptions', value: data?.prescriptionCount, color: '#66bb6a' },
        { label: 'Reviews', value: data?.reviewCount, color: '#ffa726' }
    ];

    const pieChartData = data?.formatedAppointmentStatusDistribution?.map((item: any, index: number) => ({
        id: index,
        value: item?.count,
        label: item?.status
    }));

    return (
        <Box
            sx={{
                bgcolor: '#f5f7fa',
                minHeight: '100vh',
                px: { xs: 2, sm: 3, md: 6 },
                py: 4
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    bgcolor: 'white',
                    borderRadius: 4,
                    px: { xs: 2, md: 6 },
                    py: { xs: 3, md: 4 },
                    mb: 5,
                    background: 'linear-gradient(to right, #e3f2fd, #fce4ec)',
                    boxShadow: '0 0 12px rgba(0,0,0,0.05)',
                    textAlign: { xs: 'center', md: 'left' }
                }}
            >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome to Patient Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Track your appointments, prescriptions, and reviews at a glance.
                </Typography>
            </Paper>

            <Grid container spacing={3} mb={6}>
                {stats?.map((item, i) => (
                    <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={i}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                bgcolor: item?.color,
                                color: 'white',
                                textAlign: 'center',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.03)'
                                }
                            }}
                        >
                            <Typography variant="subtitle1">{item?.label}</Typography>
                            <Typography variant="h5" fontWeight="bold">
                                {item?.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4}>
                <Grid sx={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            bgcolor: '#fbe9e7',
                            boxShadow: '0px 4px 20px rgba(0,0,0,0.04)',
                            height: '100%',
                            minHeight: 350,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography variant="h6" mb={2} fontWeight="600">
                            Appointment Status
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <PieChart
                                series={[{
                                    data: pieChartData.map((item: any) => ({
                                        ...item,
                                        color: item.label === 'SCHEDULED' ? '#d32f2f' : '#f57c00'
                                    })),
                                    arcLabel: (item) => `${item?.value}`,
                                }]}
                                height={isMobile ? 250 : 300}
                                sx={{
                                    [`& .${pieArcLabelClasses?.root}`]: {
                                        fill: '#333',
                                        fontSize: 14,
                                    },
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PatientPage;
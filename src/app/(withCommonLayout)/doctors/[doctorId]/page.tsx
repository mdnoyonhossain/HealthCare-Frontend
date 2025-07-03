import { Box, Chip, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import defaultDoctorImg from "@/assets/images/defautlDoctor.jpg";
import { MedicalServices, Phone, School, StarRate, Work, WorkHistory } from '@mui/icons-material';
import DoctorScheduleSlots from '../components/DoctorScheduleSlots';

type PropTypes = {
    params: {
        doctorId: string;
    };
};

const CardBox = {
    background: 'linear-gradient(135deg, #ffffffcc, #e3f2fdcc)',
    backdropFilter: 'blur(10px)',
    borderLeft: '5px solid #1976d2',
    p: 3,
    borderRadius: 3,
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    transition: '0.3s',
    height: '100%',
    '&:hover': {
        boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
        transform: 'translateY(-2px)',
    },
};

const DoctorsProfilePage = async ({ params }: PropTypes) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor/${params?.doctorId}`);
    const { data: doctor } = await res.json();

    const specialties = doctor?.doctorSpecialties?.map((ds: any) => ds?.specialties?.title) ?? [];

    return (
        <section className="sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: '#f0f2f5' }}>
                    <Stack sx={{ bgcolor: 'white', p: { xs: 2, md: 4 }, borderRadius: 3 }} gap={4}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            gap={3}
                            alignItems={{ xs: 'center', md: 'flex-start' }}
                        >
                            <Box
                                sx={{
                                    width: { xs: '100%', sm: 250, md: 281 },
                                    height: { xs: 'auto', md: 281 },
                                    bgcolor: '#808080',
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                    position: 'relative',
                                }}
                            >
                                <Image
                                    src={doctor?.profilePhoto || defaultDoctorImg}
                                    alt="doctor image"
                                    width={281}
                                    height={281}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                            <Stack flex={1} width="100%">
                                <Box>
                                    <Typography variant="h6" fontWeight={600}>
                                        {doctor?.name}
                                    </Typography>
                                    <Typography sx={{ my: '2px', color: 'secondary.main' }}>
                                        {doctor?.designaton}
                                    </Typography>

                                    <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap" mt={1}>
                                        <Typography noWrap>Specialties in</Typography>
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {specialties.map((sp: any) => (
                                                <Chip
                                                    key={sp}
                                                    label={sp}
                                                    color="primary"
                                                    sx={{
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        borderRadius: 2,
                                                        paddingX: 1.2,
                                                        fontSize: '0.85rem',
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Stack>
                                </Box>

                                <Divider sx={{ my: { xs: 3, sm: 2 }, borderStyle: 'dashed', borderColor: 'grey.400' }} />

                                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                                    <Work color="primary" fontSize="small" />
                                    <Typography sx={{ fontWeight: 600 }}>Working at</Typography>
                                </Stack>
                                <Typography sx={{ ml: 3 }}>{doctor?.currentWorkingPlace}</Typography>

                                <Divider sx={{ my: { xs: 3, sm: 2 }, borderStyle: 'dashed', borderColor: 'grey.400' }} />

                                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                                    <MedicalServices color="primary" fontSize="small" />
                                    <Typography
                                        variant="h6"
                                        sx={{ color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}
                                    >
                                        ৳ {doctor?.appointmentFee}
                                        <Typography
                                            variant="caption"
                                            sx={{ ml: 1, color: 'text.secondary' }}
                                            component="span"
                                        >
                                            (incl. VAT)
                                        </Typography>
                                    </Typography>
                                </Stack>
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
                                    Per consultation
                                </Typography>
                            </Stack>
                        </Stack>
                        <Grid container spacing={3}>
                            <Grid size={{ sm: 6, md: 3, xs: 12 }}>
                                <Paper sx={CardBox}>
                                    <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                        <WorkHistory color="primary" fontSize="small" />
                                        Total Experience
                                    </Typography>
                                    <Typography mt={1} fontWeight={500}>
                                        {doctor?.experience ?? 'N/A'}+ Years
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid size={{ sm: 6, md: 3, xs: 12 }}>
                                <Paper sx={CardBox}>
                                    <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                        <School color="primary" fontSize="small" />
                                        Qualification
                                    </Typography>
                                    <Typography mt={1} fontWeight={500}>
                                        {doctor?.qualification ?? 'N/A'}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid size={{ sm: 6, md: 3, xs: 12 }}>
                                <Paper sx={CardBox}>
                                    <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                        <StarRate color="primary" fontSize="small" />
                                        Average Rating
                                    </Typography>
                                    <Typography mt={1} fontWeight={500}>
                                        {doctor?.averageRating ?? 'N/A'}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid size={{ sm: 6, md: 3, xs: 12 }}>
                                <Paper sx={CardBox}>
                                    <Typography variant="subtitle1" display="flex" alignItems="center" gap={1}>
                                        <Phone color="primary" fontSize="small" />
                                        Contact Number
                                    </Typography>
                                    <Typography mt={1} fontWeight={500}>
                                        {doctor?.contactNumber ?? 'N/A'}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
                <DoctorScheduleSlots id={doctor?.id} />
            </div>
        </section>
    );
};

export default DoctorsProfilePage;

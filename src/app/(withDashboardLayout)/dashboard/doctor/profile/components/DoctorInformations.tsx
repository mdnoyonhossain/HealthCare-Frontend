import { Box, Stack, styled, Typography } from '@mui/material';
import { CheckCircle, Cancel, WarningAmber, Update, CalendarMonth, Phone, LocationOn, LocalHospital, School, AssignmentInd, Star, Work, BusinessCenter, VerifiedUser, Person, WorkOutline, Wc, Email } from "@mui/icons-material";

export const StyledInformationBox = styled(Box)(({ theme }) => ({
    background: '#E1F1F9',
    borderRadius: theme.spacing(1),
    flex: '1 1 300px',
    padding: '12px 16px',
    minWidth: 250,
    '& p': {
        fontWeight: 600,
        wordBreak: 'break-word',
    },
}));

const DoctorInformation = ({ data }: any) => {
    return (
        <>
            <Typography variant='h6' color='primary.main' mb={2}>
                Personal Information
            </Typography>

            <Stack
                direction='row'
                flexWrap='wrap'
                gap={2}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Role
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <VerifiedUser fontSize="small" color="primary" />
                        <Typography color="text.primary">{data?.role || 'N/A'}</Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Name
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Person fontSize="small" color="action" />
                        <Typography color="text.primary">{data?.name || 'N/A'}</Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Designation
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <WorkOutline fontSize="small" color="success" />
                        <Typography color="text.primary">{data?.designaton || 'N/A'}</Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Gender
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Wc fontSize="small" color="secondary" />
                        <Typography color="text.primary">{data?.gender || 'N/A'}</Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Email
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Email fontSize="small" color="error" />
                        <Typography color="text.primary">{data?.email || 'N/A'}</Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Current Status
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CheckCircle color="success" fontSize="small" />
                        <Typography color="text.primary">{data?.status || 'N/A'}</Typography>
                    </Box>
                </StyledInformationBox>
            </Stack>

            <Typography variant='h6' color='primary.main' mt={4} mb={2}>
                Professional Information
            </Typography>

            <Stack
                direction='row'
                flexWrap='wrap'
                gap={2}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Appointment Fee
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocalHospital fontSize="small" color="success" />
                        <Typography color="text.primary">
                            {data?.appointmentFee ? `$${data.appointmentFee}` : 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Qualification
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <School fontSize="small" color="primary" />
                        <Typography color="text.primary">
                            {data?.qualification || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Registration Number
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AssignmentInd fontSize="small" color="action" />
                        <Typography color="text.primary">
                            {data?.registrationNumber || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Joined
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonth fontSize="small" color="primary" />
                        <Typography color="text.primary">
                            {data?.createdAt
                                ? new Date(data.createdAt).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: '2-digit',
                                })
                                : 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Average Rating
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Star fontSize="small" color="warning" />
                        <Typography color="text.primary">
                            {data?.averageRating || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Experience
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Work fontSize="small" color="info" />
                        <Typography color="text.primary">
                            {data?.experience || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Current Working Place
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <BusinessCenter fontSize="small" color="secondary" />
                        <Typography color="text.primary">
                            {data?.currentWorkingPlace || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>
            </Stack>

            <Typography variant='h6' color='primary.main' mt={4} mb={2}>
                Contact Information
            </Typography>

            <Stack
                direction='row'
                flexWrap='wrap'
                gap={2}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Contact Number
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Phone color="primary" fontSize="small" />
                        <Typography color="text.primary">
                            {data?.contactNumber || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Address
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <LocationOn color="action" fontSize="small" />
                        <Typography color="text.primary">
                            {data?.address || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>
            </Stack>
        </>
    );
};

export default DoctorInformation;
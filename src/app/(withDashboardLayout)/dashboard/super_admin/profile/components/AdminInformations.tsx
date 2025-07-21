import { Box, Stack, styled, Typography } from '@mui/material';
import { CheckCircle, CalendarMonth, Phone, VerifiedUser, Person, Email, WarningAmber, Cancel, Update } from "@mui/icons-material";

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

const AdminInformation = ({ data }: any) => {
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
                        Contact Number
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Phone color="primary" fontSize="small" />
                        <Typography color="text.primary">
                            {data?.contactNumber || 'N/A'}
                        </Typography>
                    </Box>
                </StyledInformationBox>
            </Stack>

            <Typography variant='h6' color='primary.main' mt={4} mb={2}>
                Account Information
            </Typography>

            <Stack
                direction='row'
                flexWrap='wrap'
                gap={2}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Joined
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonth fontSize="small" color="primary" />
                        <Typography>
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
                        Last Updated
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Update fontSize="small" color="action" />
                        <Typography>
                            {data?.updatedAt
                                ? new Date(data.updatedAt).toLocaleDateString('en-US', {
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
                        Account Status
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        {data?.isDeleted ? (
                            <>
                                <Cancel color="error" fontSize="small" />
                                <Typography color="error.main">Deleted</Typography>
                            </>
                        ) : (
                            <>
                                <CheckCircle color="success" fontSize="small" />
                                <Typography color="success.main">Active</Typography>
                            </>
                        )}
                    </Box>
                </StyledInformationBox>

                <StyledInformationBox>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Password Status
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        {data?.needPasswordChange ? (
                            <>
                                <WarningAmber color="warning" fontSize="small" />
                                <Typography color="warning.main">Change Required</Typography>
                            </>
                        ) : (
                            <>
                                <CheckCircle color="primary" fontSize="small" />
                                <Typography color="primary.main">Up to Date</Typography>
                            </>
                        )}
                    </Box>
                </StyledInformationBox>
            </Stack>
        </>
    );
};

export default AdminInformation;
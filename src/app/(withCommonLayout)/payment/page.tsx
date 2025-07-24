'use client';
import { useSearchParams } from 'next/navigation';
import { Button, Container, Stack, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import Link from 'next/link';

const PaymentStatusPage = () => {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');

    let icon;
    let title;
    let color;

    switch (status) {
        case 'success':
            icon = <CheckCircleIcon sx={{ fontSize: 100, color: 'success.main' }} />;
            title = 'Payment Successful';
            color = 'success.main';
            break;
        case 'cancel':
            icon = <CancelIcon sx={{ fontSize: 100, color: 'error.main' }} />;
            title = 'Payment Cancelled';
            color = 'error.main';
            break;
        case 'failed':
            icon = <ErrorIcon sx={{ fontSize: 100, color: 'error.main' }} />;
            title = 'Payment Failed';
            color = 'error.main';
            break;
        default:
            icon = <ErrorIcon sx={{ fontSize: 100, color: 'warning.main' }} />;
            title = 'Unknown Status';
            color = 'warning.main';
    }

    return (
        <Container maxWidth='sm'>
            <Paper
                elevation={3}
                sx={{
                    mt: { xs: 6, md: 12 },
                    py: 6,
                    px: 4,
                    textAlign: 'center',
                    borderRadius: 4,
                }}
            >
                <Stack spacing={2} alignItems='center'>
                    {icon}
                    <Typography variant='h4' fontWeight={600} color={color}>
                        {title}
                    </Typography>
                    <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                        {status === 'success' ? 'Your payment has been processed successfully.' : 'There was an issue processing your payment.'}
                    </Typography>

                    <Button
                        component={Link}
                        href={status === 'success' ? '/dashboard/patient/appointments' : '/doctors'}
                        variant='contained'
                        color={status === 'success' ? 'success' : 'primary'}
                        sx={{ px: 4, py: 1, borderRadius: '50px', textTransform: 'none' }}
                    >
                        {status === 'success' ? 'Go to Dashboard' : 'Try Again'}
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default PaymentStatusPage;
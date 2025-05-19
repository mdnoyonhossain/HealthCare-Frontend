"use client"
import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { usePathname, useRouter } from 'next/navigation';
import SkeletonLoading from '@/components/Loading/SkeletonLoading';
import { Box, Typography } from '@mui/material';

const NAVIGATION: Navigation = [
    { kind: 'header', title: 'Main items' },
    { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Analytics' },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
            { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
        ],
    },
    { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];

const dashboardHCTheme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: { colorSchemeSelector: 'class' },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
});

const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const nextRouter = useRouter();

    const router = React.useMemo(() => ({
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => nextRouter.push(path.toString()),
    }), [pathname, nextRouter]);

    const [isHydrated, setIsHydrated] = React.useState(false);

    React.useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={dashboardHCTheme}
            branding={{
                logo: (
                    <Typography
                        variant="h4"
                        fontWeight={600}
                        sx={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                    >
                        <Box component="span" color="#2CB0ED">H</Box>ealth
                        <Box component="span" color="#2CB0ED">C</Box>are
                    </Typography>
                ),
                title: '',
                homeUrl: '/',
            }}
        >
            <DashboardLayout>
                <PageContainer>
                    {isHydrated ? children : <SkeletonLoading />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};

export default DashboardDrawer;
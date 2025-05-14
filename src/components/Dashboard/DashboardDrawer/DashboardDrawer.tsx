"use client"
import * as React from 'react';
import { createTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const demoTheme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath: string): Router {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string | URL) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
    const router = useDemoRouter('/dashboard');

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={{
                logo: (
                    <Typography
                        component={Link}
                        href="/"
                        variant="h4"
                        fontWeight={600}
                        sx={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                    >
                        <Box component="span" color="#2CB0ED">H</Box>ealth
                        <Box component="span" color="#2CB0ED">C</Box>are
                    </Typography>
                ),
                title: '',
                homeUrl: '',
            }}
        >
            <DashboardLayout>
                <PageContainer>
                    {children}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};

export default DashboardDrawer;
"use client"
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider, Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { usePathname, useRouter } from 'next/navigation';
import SkeletonLoading from '@/components/Loading/SkeletonLoading';
import { Box, Typography } from '@mui/material';
import getNavigationByRole from '@/utils/getNavigationByRole';
import { TUserRole } from '@/types';
import { getUserInfo } from '@/services/auth.service';

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
    const [userRole, setUserRole] = React.useState("");

    React.useEffect(() => {
        setIsHydrated(true);
        const { role } = getUserInfo();
        setUserRole(role);
    }, []);

    const NAVIGATION: Navigation = getNavigationByRole(userRole as TUserRole);

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
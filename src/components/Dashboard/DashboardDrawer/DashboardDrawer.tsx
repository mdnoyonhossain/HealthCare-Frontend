"use client";
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { AppProvider, Navigation, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { usePathname, useRouter } from 'next/navigation';
import SkeletonLoading from '@/components/Loading/SkeletonLoading';
import { Box, Typography } from '@mui/material';
import getNavigationByRole from '@/utils/getNavigationByRole';
import { TUserRole } from '@/types';
import { getUserInfo } from '@/services/auth.service';
import { authKey } from '@/constants/authKey';
import { deleteCookies } from '@/services/actions/deleteCookies';

const dashboardHCTheme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#2CB0ED',
                    contrastText: '#fff',
                },
                text: {
                    primary: '#333',
                    secondary: '#555',
                },
            },
        },
    },
    cssVariables: { colorSchemeSelector: 'class' },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FAFAFA',
                },
            },
        },
        MuiListSubheader: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FAFAFA',
                    color: '#333',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                },
            },
        },
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
    const [userRole, setUserRole] = React.useState<TUserRole | null>(null);
    const [session, setSession] = React.useState<Session | null>(null);

    React.useEffect(() => {
        setIsHydrated(true);
        const user = getUserInfo();
        if (user?.role) {
            setUserRole(user.role);
            setSession({
                user: {
                    name: user.role || "Unknown",
                    email: user.email || "unknown@email.com",
                    image: user.image || "",
                },
            });
        }
    }, []);

    const authentication = React.useMemo(() => ({
        signIn: () => { },
        signOut: () => {
            localStorage.removeItem(authKey);
            deleteCookies([authKey, 'refreshToken']);
            nextRouter.refresh();
            nextRouter.push('/');
        },
    }), []);

    if (!userRole) {
        return <SkeletonLoading />;
    }

    const NAVIGATION: Navigation = getNavigationByRole(userRole);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
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
                <PageContainer
                    breadcrumbs={[]}
                    title=""
                    sx={{ backgroundColor: "#FCFDFF", minHeight: '100vh' }}
                >
                    {isHydrated ? children : <SkeletonLoading />}
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
};

export default DashboardDrawer;
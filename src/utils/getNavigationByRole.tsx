import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import { Navigation } from '@toolpad/core/AppProvider';
import { TUserRole } from '@/types';

const getNavigationByRole = (role: TUserRole): Navigation => {
    const commonItems: Navigation = [
        { kind: 'header', title: 'Main items' },
        { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
    ];

    switch (role) {
        case 'SUPER_ADMIN':
            return [
                ...commonItems,
                { segment: 'orders', title: 'Orders', icon: <ShoppingCartIcon /> },
                { segment: 'users', title: 'Users', icon: <PeopleIcon /> },
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

        case 'ADMIN':
            return [
                ...commonItems,
                { segment: 'appointments', title: 'Appointments', icon: <DescriptionIcon /> },
                { segment: 'doctors', title: 'Doctors', icon: <LocalHospitalIcon /> },
            ];

        case 'DOCTOR':
            return [
                ...commonItems,
                { segment: 'patients', title: 'My Patients', icon: <PersonIcon /> },
                { segment: 'appointments', title: 'Appointments', icon: <DescriptionIcon /> },
            ];

        case 'PATIENT':
            return [
                ...commonItems,
                { segment: 'my-appointments', title: 'My Appointments', icon: <DescriptionIcon /> },
                { segment: 'doctors', title: 'Doctors', icon: <LocalHospitalIcon /> },
            ];

        default:
            return commonItems;
    }
}

export default getNavigationByRole;
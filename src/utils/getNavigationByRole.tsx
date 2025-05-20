import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Navigation } from '@toolpad/core/AppProvider';
import { TUserRole } from '@/types';
import { USER_ROLE } from '@/constants/role';

const getNavigationByRole = (role: TUserRole): Navigation => {
    const commonItems: Navigation = [
        { kind: 'header', title: 'Main items' },
        { segment: `dashboard/${role}`, title: 'Dashboard', icon: <DashboardIcon /> },
    ];

    switch (role) {
        case USER_ROLE.SUPER_ADMIN:
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

        case USER_ROLE.ADMIN:
            return [
                ...commonItems,

                { kind: 'header', title: 'Manage' },
                { segment: `dashboard/${role}/specialties`, title: 'Specialties', icon: <MedicalInformationIcon /> },
                { segment: `dashboard/${role}/doctors`, title: 'Doctors', icon: <MedicalServicesIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Scheduling' },
                { segment: `dashboard/${role}/schedules`, title: 'Schedules', icon: <EventAvailableIcon /> },
                { segment: `dashboard/${role}/appointments`, title: 'Appointments', icon: <CalendarMonthIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Feedback' },
                { segment: `dashboard/${role}/reviews`, title: 'Reviews', icon: <RateReviewIcon /> },
            ];

        case USER_ROLE.DOCTOR:
            return [
                ...commonItems,

                { kind: 'header', title: 'Scheduling' },
                { segment: `dashboard/${role}/schedules`, title: 'Schedules', icon: <EventAvailableIcon /> },
                { segment: `dashboard/${role}/appointments`, title: 'Appointments', icon: <CalendarMonthIcon /> }
            ];

        case USER_ROLE.PATIENT:
            return [
                ...commonItems,

                { kind: 'header', title: 'Health Records' },
                { segment: `dashboard/${role}/appointments`, title: 'My Appointments', icon: <CalendarMonthIcon /> },
                { segment: `dashboard/${role}/prescriptions`, title: 'Prescriptions', icon: <DescriptionIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Billing' },
                { segment: `dashboard/${role}/payment-history`, title: 'Payment History', icon: <ReceiptLongIcon /> }, // You can use ReceiptLongIcon for better context
            ];

        default:
            return commonItems;
    }
}

export default getNavigationByRole;
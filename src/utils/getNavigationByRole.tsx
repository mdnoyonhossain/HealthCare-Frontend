import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RateReviewIcon from '@mui/icons-material/RateReview';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ElderlyIcon from '@mui/icons-material/Elderly';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Navigation } from '@toolpad/core/AppProvider';
import { TUserRole } from '@/types';
import { USER_ROLE } from '@/constants/role';
import { KeySquareIcon } from 'lucide-react';

const getNavigationByRole = (role: TUserRole): Navigation => {
    const commonItems: Navigation = [
        { kind: 'header', title: 'Main items' },
        { segment: `dashboard/${role}`, title: 'Dashboard', icon: <DashboardIcon /> },
        { segment: `dashboard/${role}/profile`, title: 'Profile', icon: <AccountBoxIcon /> },
        { segment: `dashboard/change-password`, title: 'Security', icon: <KeySquareIcon /> },
    ];

    switch (role) {
        case USER_ROLE.SUPER_ADMIN:
            return [
                ...commonItems,
                { kind: 'header', title: 'User Manage' },
                { segment: `dashboard/${role}/admins`, title: 'Admins', icon: <AdminPanelSettingsIcon /> },
                { segment: `dashboard/${role}/doctors`, title: 'Doctors', icon: <MedicalServicesIcon /> },
                { segment: `dashboard/${role}/patients`, title: 'Patients', icon: <ElderlyIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Specialties' },
                { segment: `dashboard/${role}/specialties`, title: 'Specialties', icon: <MedicalInformationIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Scheduling' },
                { segment: `dashboard/${role}/schedules`, title: 'Schedules', icon: <EventAvailableIcon /> },
                { segment: `dashboard/${role}/appointments`, title: 'Appointments', icon: <CalendarMonthIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Feedback' },
                { segment: `dashboard/${role}/reviews`, title: 'Reviews', icon: <RateReviewIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Prescription' },
                { segment: `dashboard/${role}/prescriptions`, title: 'Prescriptions', icon: <DescriptionIcon /> },
            ];

        case USER_ROLE.ADMIN:
            return [
                ...commonItems,

                { kind: 'header', title: 'Manage' },
                { segment: `dashboard/${role}/admins`, title: 'Admins', icon: <AdminPanelSettingsIcon /> },
                { segment: `dashboard/${role}/doctors`, title: 'Doctors', icon: <MedicalServicesIcon /> },
                { segment: `dashboard/${role}/patients`, title: 'Patients', icon: <ElderlyIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Specialties' },
                { segment: `dashboard/${role}/specialties`, title: 'Specialties', icon: <MedicalInformationIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Scheduling' },
                { segment: `dashboard/${role}/schedules`, title: 'Schedules', icon: <EventAvailableIcon /> },
                { segment: `dashboard/${role}/appointments`, title: 'Appointments', icon: <CalendarMonthIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Feedback' },
                { segment: `dashboard/${role}/reviews`, title: 'Reviews', icon: <RateReviewIcon /> },

                { kind: 'divider' },

                { kind: 'header', title: 'Prescription' },
                { segment: `dashboard/${role}/prescriptions`, title: 'Prescriptions', icon: <DescriptionIcon /> },
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
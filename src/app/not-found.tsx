"use client"
import { Button } from "@mui/material";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="min-h-[100vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-[60%] w-full text-center space-y-6 p-8 rounded-lg bg-white shadow-sm">
                <div className="mx-auto w-16 h-16 bg-red-50 flex items-center justify-center rounded-full">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h1 className="text-5xl font-bold text-gray-900">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
                <p className="text-gray-600">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => router.back()}
                    >
                        Go Back
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<HomeIcon />}
                        LinkComponent={Link}
                        href="/"
                    >
                        Return to Home
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<ContactSupportIcon />}
                        LinkComponent={Link}
                        href="/contact"
                    >
                        Contact Support
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
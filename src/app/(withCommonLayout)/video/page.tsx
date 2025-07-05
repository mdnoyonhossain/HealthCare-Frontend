import VideoCall from "@/components/UI/VideoCall/VideoCall";
import { CallEnd } from "@mui/icons-material";
import { Box, Fab, Typography } from "@mui/material";

type TAppointmentIdSearchParams = {
    searchParams: {
        videoCallingId: string;
        role: "doctor" | "patient";
    };
};

const VideoCalling = ({ searchParams }: TAppointmentIdSearchParams) => {
    const { videoCallingId, role } = searchParams;

    if (!videoCallingId || !role) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                textAlign="center"
                bgcolor="#f5f5f5"
                px={2}
            >
                <CallEnd sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    Oops! Missing Information
                </Typography>
                <Typography variant="body1" color="text.secondary" maxWidth="400px" mt={1}>
                    The video calling session could not start because the <strong>videoCallingId</strong> or <strong>role</strong> is missing.
                </Typography>
                <Fab
                    variant="extended"
                    color="primary"
                    href="/"
                    sx={{ mt: 4, textTransform: "none" }}
                >
                    Go Back Home
                </Fab>
            </Box>
        );
    }

    return (
        <VideoCall
            appId={process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID!}
            channelName={videoCallingId}
            role={role}
        />
    );
};

export default VideoCalling;

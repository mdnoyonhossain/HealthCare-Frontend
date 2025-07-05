"use client";
import React, { useEffect, useState } from "react";
import AgoraRTC, { AgoraRTCProvider, useJoin, useLocalMicrophoneTrack, useLocalCameraTrack, usePublish, useRemoteUsers } from "agora-rtc-react";
import { Box, Grid, IconButton, Typography, Fab, useMediaQuery, useTheme } from "@mui/material";
import { Mic, MicOff, Videocam, VideocamOff, CallEnd } from "@mui/icons-material";
import { getUserInfo } from "@/services/auth.service";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoBox = ({ label, track, muted = false }: { label: string; track: any; muted?: boolean }) => (
    <Box
        sx={{
            position: "relative",
            bgcolor: "#000",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
            width: "100%",
            aspectRatio: "16/9",
            minHeight: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Typography
            variant="caption"
            sx={{
                position: "absolute",
                top: 8,
                left: 8,
                zIndex: 10,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "#fff",
                px: 1,
                borderRadius: 1,
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
            }}
        >
            {label}
        </Typography>
        {track ? (
            <video
                ref={(el) => {
                    if (el && track) {
                        track.play(el);
                    }
                }}
                autoPlay
                muted={muted}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        ) : (
            <Box
                sx={{
                    color: "#fff",
                    fontSize: { xs: "1rem", md: "1.2rem" },
                    userSelect: "none",
                }}
            >
                No Video
            </Box>
        )}
    </Box>
);

const Videos = ({ channelName, role }: { channelName: string; role: "doctor" | "patient" }) => {
    const { localMicrophoneTrack } = useLocalMicrophoneTrack();
    const { localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();

    usePublish([localMicrophoneTrack, localCameraTrack]);

    useJoin({
        appid: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID!,
        channel: channelName,
        token: null,
    });

    const remoteUser = remoteUsers.length > 0 ? remoteUsers[0] : null;
    const isDoctor = role === "doctor";

    return (
        <Grid
            container
            spacing={2}
            padding={2}
            sx={{
                maxWidth: "1200px",
                margin: "0 auto",
                flexWrap: "nowrap",
                overflowX: "auto",
            }}
        >
            <Grid sx={{ xs: 12, sm: 6, md: 6 }}>
                {isDoctor ? (
                    <VideoBox label="Doctor (You)" track={localCameraTrack} muted />
                ) : (
                    <VideoBox
                        label={`Doctor (${remoteUser?.uid ?? "Waiting"})`}
                        track={remoteUser?.videoTrack || null}
                    />
                )}
            </Grid>
            <Grid sx={{ xs: 12, sm: 6, md: 6 }}>
                {!isDoctor ? (
                    <VideoBox label="Patient (You)" track={localCameraTrack} muted />
                ) : (
                    <VideoBox
                        label={`Patient (${remoteUser?.uid ?? "Waiting"})`}
                        track={remoteUser?.videoTrack || null}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default function VideoCall({ appId, channelName, role }: { appId: string; channelName: string; role: "doctor" | "patient" }) {
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const toggleMic = () => {
        const track = client.localTracks.find((t) =>
            t.getTrackLabel?.()?.includes("microphone")
        );
        if (track) {
            micOn ? track.setEnabled(false) : track.setEnabled(true);
            setMicOn(!micOn);
        }
    };

    const toggleCam = () => {
        const track = client.localTracks.find((t) =>
            t.getTrackLabel?.()?.includes("camera")
        );
        if (track) {
            camOn ? track.setEnabled(false) : track.setEnabled(true);
            setCamOn(!camOn);
        }
    };

    const [userRole, setUserRole] = useState<{ email?: string, role?: string } | null>(null);
    useEffect(() => {
        const { role } = getUserInfo();
        if (role) {
            setUserRole(role);
        }
    }, []);

    return (
        <AgoraRTCProvider client={client}>
            <Box
                sx={{
                    position: "relative",
                    minHeight: "100vh",
                    bgcolor: "#121212",
                    pb: isMobile ? 8 : 0,
                }}
            >
                <Videos channelName={channelName} role={role} />
                <Box
                    sx={{
                        position: "fixed",
                        bottom: isMobile ? 12 : 24,
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: isMobile ? 1 : 2,
                        bgcolor: "rgba(0,0,0,0.6)",
                        p: 1,
                        borderRadius: "32px",
                        backdropFilter: "blur(6px)",
                        zIndex: 1000,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <IconButton onClick={toggleMic} sx={{ color: micOn ? "#fff" : "red" }}>
                        {micOn ? <Mic /> : <MicOff />}
                    </IconButton>
                    <IconButton onClick={toggleCam} sx={{ color: camOn ? "#fff" : "red" }}>
                        {camOn ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                    <Fab
                        color="error"
                        size={isMobile ? "medium" : "large"}
                        href={`/dashboard/${userRole}/appointments`}
                        title="End Call"
                    >
                        <CallEnd />
                    </Fab>
                </Box>
            </Box>
        </AgoraRTCProvider>
    );
}
import { TDoctor } from "@/types/doctor";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import defaultDoctorImg from "@/assets/images/defautlDoctor.jpg";
import { EventAvailable, Visibility } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }: { doctor: TDoctor }) => {
    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            sx={{ flexWrap: "wrap", mb: 1 }}
        >
            <Stack
                direction={{ xs: "column", sm: "row" }}
                flex={1}
                gap={3}
                sx={{
                    bgcolor: "white",
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    boxShadow: 1,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", sm: 190 },
                        height: { xs: 250, sm: 190 },
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#f0f0f0",
                        flexShrink: 0,
                        mx: { xs: "auto", sm: 0 },
                    }}
                >
                    <Image
                        src={doctor?.profilePhoto || defaultDoctorImg}
                        alt="doctor image"
                        width={190}
                        height={190}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Box>

                <Stack flex={1} justifyContent="space-between">
                    <Box>
                        <Typography variant="h6" fontWeight={600}>
                            {doctor?.name}
                        </Typography>
                        <Typography sx={{ my: 0.5, color: "secondary.main" }}>
                            {doctor?.designaton}
                        </Typography>
                        {doctor?.doctorSpecialties?.length > 0 && (
                            <Box
                                mt={1}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    overflow: "hidden",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, color: "text.secondary", whiteSpace: "nowrap" }}
                                >
                                    Specialties:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 500,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        flex: 1,
                                    }}
                                >
                                    {doctor?.doctorSpecialties
                                        .map((s) => s?.specialties?.title)
                                        .filter(Boolean)
                                        .join(", ")}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Divider sx={{ my: { xs: 1, sm: 2 }, borderStyle: 'dashed', borderColor: 'grey.400' }} />
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        gap={1}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{ color: "primary.main", fontWeight: 600 }}
                            >
                                ৳ {doctor?.appointmentFee}
                                <Typography
                                    variant="caption"
                                    sx={{ ml: 1, color: "text.secondary" }}
                                    component="span"
                                >
                                    (incl. VAT)
                                </Typography>
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Per consultation
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            endIcon={
                                <EventAvailable
                                    className="icon"
                                    sx={{ transition: "transform 0.4s ease", fontSize: 16 }}
                                />
                            }
                            sx={{
                                fontWeight: "bold",
                                fontSize: "15px",
                                backgroundColor: "#008767",
                                color: "#fff",
                                textTransform: "none",
                                transition: "all 0.4s ease",
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#008767",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                    ".icon": {
                                        transform: "translateX(5px)",
                                    },
                                },
                            }}
                            component={Link}
                            href={`/checkout/${doctor?.id}`}
                        >
                            Book Now
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                sx={{
                    bgcolor: "white",
                    width: { xs: "100%", md: 400 },
                    p: { xs: 2, sm: 3 },
                    borderRadius: 2,
                    boxShadow: 1,
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Working in
                    </Typography>
                    <Typography sx={{ fontWeight: 600, mt: 0.5 }}>
                        {doctor?.currentWorkingPlace}
                    </Typography>
                </Box>
                <Divider sx={{ my: { xs: 1, sm: 2 }, borderStyle: 'dashed', borderColor: 'grey.400' }} />
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    gap={1}
                >
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Total Experience
                        </Typography>
                        <Typography variant="h6" fontWeight={600}>
                            {doctor?.experience}+ Years
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        endIcon={
                            <Visibility
                                className="icon"
                                sx={{ transition: "transform 0.4s ease", fontSize: 18 }}
                            />
                        }
                        component={Link}
                        href={`/doctors/${doctor?.id}`}
                        sx={{
                            px: 2.5,
                            py: 1,
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#008767",
                            borderColor: "#008767",
                            textTransform: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "#008767",
                                color: "#fff",
                                borderColor: "#008767",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                ".icon": {
                                    transform: "rotate(360deg)",
                                },
                            },
                        }}
                    >
                        View Details
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default DoctorCard;
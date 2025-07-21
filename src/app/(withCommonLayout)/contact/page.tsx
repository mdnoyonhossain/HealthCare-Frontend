"use client";
import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(
            `Message sent!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
        );
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ width: "100%" }}
        >
            <Stack spacing={3} sx={{ width: "100%" }}>
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    required
                    value={formData.message}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ fontWeight: "bold", width: "100%" }}
                >
                    Send Message
                </Button>
            </Stack>
        </Box>
    );
};

const Contact = () => {
    return (
        <Box
            sx={{
                background: "linear-gradient(to bottom, #ebf8ff, #ffffff)",
                minHeight: "100vh",
                py: { xs: 4, sm: 6, md: 8 }, // responsive padding top-bottom
                px: { xs: 2, sm: 3, md: 4 }, // responsive padding left-right
            }}
        >
            {/* Hero Section */}
            <Box
                sx={{
                    textAlign: "center",
                    maxWidth: 700,
                    mx: "auto",
                    mb: { xs: 4, sm: 5, md: 6 }, // responsive margin bottom
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "2.5rem",
                            md: "3rem",
                            lg: "3.5rem",
                        },
                    }}
                >
                    Get In Touch
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "1rem", sm: "1.125rem" }, mx: "auto" }}
                >
                    We're here to help with any questions about our services, appointments,
                    or medical inquiries. Our friendly team is looking forward to hearing
                    from you.
                </Typography>
            </Box>

            {/* Contact Details Section */}
            <Box
                sx={{
                    py: { xs: 3, sm: 5, md: 6 },
                    backgroundColor: "background.paper",
                    maxWidth: 1200,
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 2,
                }}
            >
                <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
                    {/* Contact Form */}
                    <Grid sx={{ xs: 12, md: 8 }}>
                        <Card variant="outlined" sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="h5" fontWeight={600} mb={3}>
                                    Send Us a Message
                                </Typography>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Contact Information */}
                    <Grid
                        sx={{ xs: 12, md: 4 }}
                        container
                        direction="column"
                        spacing={{ xs: 2, sm: 3 }}
                    >
                        <Grid>
                            <Card variant="outlined" sx={{ boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" fontWeight={600} mb={2}>
                                        Contact Information
                                    </Typography>
                                    <Stack spacing={2}>
                                        {[
                                            {
                                                icon: <Phone size={24} color="#1976d2" />,
                                                title: "Phone",
                                                lines: ["(123) 456-7890", "(098) 765-4321 (Emergency)"],
                                            },
                                            {
                                                icon: <Mail size={24} color="#1976d2" />,
                                                title: "Email",
                                                lines: [
                                                    "info@healthcareclinic.com",
                                                    "appointments@healthcareclinic.com",
                                                ],
                                            },
                                            {
                                                icon: <MapPin size={24} color="#1976d2" />,
                                                title: "Location",
                                                lines: ["123 Health Street", "Medical District, City 12345"],
                                            },
                                        ].map(({ icon, title, lines }) => (
                                            <Stack
                                                key={title}
                                                direction="row"
                                                spacing={2}
                                                alignItems="center"
                                            >
                                                <Box
                                                    sx={{
                                                        bgcolor: "primary.light",
                                                        p: 1.5,
                                                        borderRadius: "50%",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        minWidth: 40,
                                                        minHeight: 40,
                                                    }}
                                                >
                                                    {icon}
                                                </Box>
                                                <Box>
                                                    <Typography fontWeight="medium">{title}</Typography>
                                                    {lines.map((line, i) => (
                                                        <Typography key={i} color="text.secondary" fontSize="0.9rem">
                                                            {line}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid>
                            <Card variant="outlined" sx={{ boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h5" fontWeight={600} mb={2}>
                                        Hours
                                    </Typography>
                                    <Stack spacing={1}>
                                        {[
                                            { day: "Monday - Friday", hours: "8:00 AM - 7:00 PM" },
                                            { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
                                            { day: "Sunday", hours: "10:00 AM - 2:00 PM" },
                                        ].map(({ day, hours }) => (
                                            <Stack
                                                key={day}
                                                direction="row"
                                                justifyContent="space-between"
                                                sx={{ fontSize: "0.95rem" }}
                                            >
                                                <Typography fontWeight="medium">{day}</Typography>
                                                <Typography>{hours}</Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Contact;

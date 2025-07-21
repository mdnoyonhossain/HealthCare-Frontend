"use client";
import { useEffect } from "react";
import { FileText, Users, Book, Image, ArrowRight } from "lucide-react";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from "@mui/lab";
import { Typography, Paper, Button } from "@mui/material";
import WorkOutline from "@mui/icons-material/WorkOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Link from "next/link";

const AboutPage = () => {
    useEffect(() => {
        document.title = "MediCare - About Us";
    }, []);

    return (
        <div className="min-h-screen text-gray-800">
            <div className="bg-gradient-to-b from-blue-100 to-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                        Our <span className="text-primary">Story</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        Dedicated to excellence in healthcare for over 25 years, providing
                        compassionate and personalized medical services.
                    </p>
                </div>
            </div>

            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
                        <div className="space-y-6">
                            {[
                                {
                                    title: "Our Mission",
                                    icon: <FileText className="h-5 w-5 text-primary" />,
                                    desc: `To provide exceptional healthcare services that improve the quality of life for our patients and their families through compassionate care, innovative treatments, and a commitment to excellence.`,
                                },
                                {
                                    title: "Our Vision",
                                    icon: <Book className="h-5 w-5 text-primary" />,
                                    desc: `To be the leading healthcare provider in the region, recognized for our commitment to patient-centered care, medical innovation, and community health improvement.`,
                                },
                                {
                                    title: "Our Values",
                                    icon: <Users className="h-5 w-5 text-primary" />,
                                    desc: `Compassion, Excellence, Integrity, Collaboration, and Innovation guide everything we do as we strive to provide the best possible care and outcomes for our patients.`,
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="bg-primary/10 p-3 rounded-full">{item.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
                                alt="Hospital"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <span className="bg-primary px-3 py-1 rounded-full text-sm">
                                    Est. 1998
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
                        Our Journey
                    </Typography>
                    <Typography variant="body1" color="textSecondary" mb={4}>
                        Over two decades of service and dedication to healthcare excellence.
                    </Typography>
                </div>

                <Timeline position="alternate" sx={{ maxWidth: 600, margin: "0 auto" }}>
                    {[
                        {
                            year: "1998",
                            title: "Foundation",
                            desc: "MediCare was founded with a vision to provide accessible and quality healthcare to all.",
                        },
                        {
                            year: "2005",
                            title: "Expansion",
                            desc: "Expanded our facilities and added specialized departments to serve more patients with diverse needs.",
                        },
                        {
                            year: "2015",
                            title: "Innovation",
                            desc: "Implemented cutting-edge technology and medical practices to enhance patient care and outcomes.",
                        },
                        {
                            year: "2023",
                            title: "Community Focus",
                            desc: "Launched multiple community health programs and initiatives to promote wellness and preventive care.",
                        },
                    ].map((event, idx) => (
                        <TimelineItem key={idx}>
                            <TimelineOppositeContent
                                sx={{ flex: 0.2, m: "auto 0" }}
                                align={idx % 2 === 0 ? "right" : "left"}
                                variant="body2"
                                color="textSecondary"
                            >
                                {event.year}
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <WorkOutline />
                                </TimelineDot>
                                {idx !== 3 && <TimelineConnector />}
                            </TimelineSeparator>

                            <TimelineContent sx={{ py: "12px", px: 2 }}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6" component="span" fontWeight="bold">
                                        {event.title}
                                    </Typography>
                                    <Typography>{event.desc}</Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </section>
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50">
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold">Awards & Recognition</h2>
                    <p className="mt-4 text-gray-600">
                        Our commitment to excellence has been recognized by leading healthcare
                        organizations.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {[
                        {
                            title: "Excellence in Patient Care",
                            org: "National Healthcare Association",
                            year: "2022",
                            icon: <FavoriteIcon className="w-8 h-8 text-primary" />,
                        },
                        {
                            title: "Top Medical Facility",
                            org: "Regional Healthcare Review",
                            year: "2021",
                            icon: <EmojiEventsIcon className="w-8 h-8 text-primary" />,
                        },
                        {
                            title: "Community Service Award",
                            org: "City Health Department",
                            year: "2020",
                            icon: <GroupIcon className="w-8 h-8 text-primary" />,
                        },
                        {
                            title: "Innovation in Healthcare",
                            org: "Medical Technology Association",
                            year: "2019",
                            icon: <LightbulbIcon className="w-8 h-8 text-primary" />,
                        },
                    ].map((award, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow-sm text-center hover:shadow-md transition duration-300"
                        >
                            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-primary/10 rounded-full">
                                {award.icon}
                            </div>
                            <h3 className="font-semibold mb-2">{award.title}</h3>
                            <p className="text-sm text-gray-600">{award.org}</p>
                            <p className="text-xs text-gray-500 mt-1">{award.year}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-blue-100">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience Our Care?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We're committed to providing you and your family with exceptional care
                        in a compassionate and friendly environment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="outlined"
                            size="large"
                            LinkComponent={Link}
                            href="/doctors"
                            sx={{
                                px: 5,
                                py: 1.5,
                                fontWeight: "bold",
                                fontSize: "15px",
                                textTransform: "none",
                                transition: "all 0.4s ease",
                                "&:hover": {
                                    backgroundColor: "#007960",
                                    color: "#fff",
                                    borderColor: "#007960",
                                    boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
                                    ".icon": {
                                        transform: "translateX(5px)",
                                    },
                                },
                            }}
                        >
                            Book an Appointment
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            LinkComponent={Link}
                            href="/contact"
                            endIcon={
                                <ArrowRight
                                    className="icon transition-transform duration-300"
                                    style={{ transition: "transform 0.4s ease" }}
                                />
                            }
                            sx={{
                                px: 5,
                                py: 1.5,
                                fontWeight: "bold",
                                fontSize: "15px",
                                textTransform: "none",
                                transition: "all 0.4s ease",
                                backgroundColor: "#007960",
                                color: "#fff",
                                borderColor: "#007960",
                                "&:hover": {
                                    backgroundColor: "#007960",
                                    color: "#fff",
                                    borderColor: "#007960",
                                    ".icon": {
                                        transform: "translateX(5px)",
                                    },
                                },
                            }}
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

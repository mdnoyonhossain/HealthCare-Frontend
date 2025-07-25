import Link from "next/link";
import { Pill } from "lucide-react";
import { Button } from "@mui/material";
import './heroSection.css';

const HeroSection = () => {
    return (
        <div className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="pt-20 pb-24 md:pt-32 md:pb-32">
                    <div className="text-center md:text-left md:flex md:items-center md:justify-between">
                        <div className="md:max-w-2xl mb-12 md:mb-0">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl fade-in-up">
                                <span className="block">Your Health,</span>
                                <span className="block text-primary" style={{ color: "#2CB0ED" }}>Our Priority</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl fade-in-up delay-100">
                                Experience compassionate healthcare delivered by a team of experienced professionals. We are committed to your well-being and providing personalized care for you and your family.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                <Button
                                    sx={{
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#2CB0ED',
                                            boxShadow: "none"
                                        },
                                    }}
                                    className="font-medium fade-in-up delay-200"
                                >
                                    <Link href="/doctors">Book Consultation</Link>
                                </Button>
                                <Button variant="outlined" className="font-medium fade-in-up delay-200">
                                    <Link href="/about">About Us</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="hidden md:block md:w-1/3 animate-float">
                            <div className="p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
                                <div className="bg-blue-50 p-6 rounded-xl flex flex-col items-center">
                                    <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ background: "#2CB0ED" }}>
                                        <Pill className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mt-6 text-lg font-medium text-gray-900">
                                        Healthcare Redefined
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        24/7 Support and modern facilities for your healthcare needs
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

"use client"
import { Search, User, Calendar, Heart } from "lucide-react";
import Image from "next/image";
import howItWorkImg from "@/assets/how-it-works-img.png";
import { motion } from "framer-motion";

const HowItWork = () => {
    const steps = [
        {
            icon: <Search className="h-10 w-10 text-blue-500" />,
            title: "Search Doctor",
            description: "Find specialists that match your medical needs with our advanced search system."
        },
        {
            icon: <User className="h-10 w-10 text-blue-500" />,
            title: "Check Doctor Profile",
            description: "Review qualifications, experience, and patient feedback before making your choice."
        },
        {
            icon: <Calendar className="h-10 w-10 text-blue-500" />,
            title: "Schedule Appointment",
            description: "Book your appointment online in just a few clicks at your preferred time."
        },
        {
            icon: <Heart className="h-10 w-10 text-blue-500" />,
            title: "Get Your Solution",
            description: "Receive personalized care and treatment plans from our expert physicians."
        }
    ];

    return (
        <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-left mb-8">
                    <motion.h3
                        className="text-blue-500 font-medium mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        How it Works
                    </motion.h3>
                    <motion.h2
                        className="text-4xl font-bold text-gray-900"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        4 Easy Steps to Get Your Solution
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-gray-600 text-lg max-w-2xl "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Access to expert physicians and surgeons, advanced technologies
                        and top-quality surgery facilities right here.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                    <motion.div
                        className="hidden md:flex items-center justify-center lg:justify-start relative order-2 lg:order-1"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute w-64 h-84 md:w-80 md:h-80 bg-blue-100 rounded-full -z-10"></div>
                        <Image
                            src={howItWorkImg}
                            alt="How it Works"
                            className="relative z-10 max-w-xs md:max-w-md"
                        />
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-1 lg:order-2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="mb-4 bg-blue-50 inline-flex p-3 rounded-lg">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HowItWork;
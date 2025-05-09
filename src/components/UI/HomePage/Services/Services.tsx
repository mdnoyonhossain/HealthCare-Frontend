"use client";
import { motion } from "framer-motion";
import { Hospital, BriefcaseMedical, Thermometer, Ambulance, Pill, Bed } from "lucide-react";
import ServiceCard from "./ServiceCard";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const Services = () => {
    const serviceList = [
        {
            icon: Thermometer,
            title: "General Medicine",
            description: "Comprehensive care for adults focusing on prevention, diagnosis, and treatment of diseases.",
        },
        {
            icon: BriefcaseMedical,
            title: "Specialized Care",
            description: "Expert treatment in cardiology, neurology, orthopedics, and other specialties.",
        },
        {
            icon: Pill,
            title: "Pharmacy Services",
            description: "Convenient access to prescriptions and medications with expert pharmacist guidance.",
        },
        {
            icon: Bed,
            title: "Inpatient Services",
            description: "24/7 care with comfortable accommodations for patients requiring overnight stays.",
        },
        {
            icon: Ambulance,
            title: "Emergency Care",
            description: "Immediate attention for urgent medical conditions with state-of-the-art equipment.",
        },
        {
            icon: Hospital,
            title: "Preventive Health",
            description: "Regular check-ups and screenings to maintain wellness and prevent disease.",
        },
    ];

    return (
        <section className="px-4 py-10 sm:px-6 lg:px-8" style={{ background: "#f2f7f2" }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-gray-900">Our Healthcare Services</h2>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Delivering trusted, patient-centered healthcare solutions tailored to support the well-being of individuals and families alike.
                    </p>
                </motion.div>
                <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible">
                    {serviceList.map((service, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[280px] flex-shrink-0 md:min-w-0"
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            whileHover={{ scale: 1.05, y: -5 }}
                            variants={cardVariants}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <ServiceCard
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
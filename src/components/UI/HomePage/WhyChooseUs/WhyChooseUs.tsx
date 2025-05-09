"use client"
import assets from "@/assets";
import chooseUsImg from "@/assets/choose-us.png";
import Image from "next/image";
import { motion } from "framer-motion";

const servicesData = [
    {
        imageSrc: assets.svgs.award,
        title: "Award-Winning Care",
        description:
            "Our hospital has received multiple national and international awards for excellence in clinical care, patient satisfaction, and innovative medical practices.",
    },
    {
        imageSrc: assets.svgs.care,
        title: "Best Quality Pregnancy Care",
        description:
            "We offer comprehensive prenatal and postnatal care, supported by expert obstetricians, advanced diagnostics, and personalized birth planning for a safe and joyful pregnancy journey.",
    },
    {
        imageSrc: assets.svgs.equipment,
        title: "Complete Medical Equipment",
        description:
            "Equipped with state-of-the-art technology and modern medical tools, we ensure accurate diagnostics, effective treatments, and enhanced patient safety across all departments.",
    },
    {
        imageSrc: assets.svgs.call,
        title: "Dedicated Emergency Care",
        description:
            "Our 24/7 emergency department is staffed by experienced professionals and equipped to handle critical situations promptly, ensuring immediate and effective care during medical emergencies.",
    },
];

const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6 },
    }),
};

const WhyChooseUs = () => {
    return (
        <section className="bg-gray-50 px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-bold text-gray-900">
                        Why Choose Our Healthcare Services
                    </h2>
                    <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
                        We deliver exceptional, patient-focused care through experienced professionals, advanced medical technology, and a commitment to your well-being—trusted by thousands.
                    </p>
                </motion.div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {servicesData.map((service, index) => (
                            <motion.div
                                key={index}
                                className={`flex items-start gap-4 bg-[#E5FAE5] p-5 rounded-[10px] shadow-md hover:shadow-xl transition hover:scale-[1.02] ${index % 2 === 0 ? "rounded-tl-[100px]" : "rounded-tr-[100px]"
                                    }`}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUpVariant}
                            >
                                <div className="bg-white p-4 rounded-[10px] flex-shrink-0">
                                    <Image
                                        src={service.imageSrc}
                                        alt={service.title}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={chooseUsImg}
                            alt="choose us"
                            className="w-full max-w-lg rounded-xl shadow-lg"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;

import { Hospital, BriefcaseMedical, Thermometer, Ambulance, Pill, Bed } from "lucide-react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    return (
        <section className="px-4 py-10 sm:px-6 lg:px-8" style={{ background: "#f2f7f2" }}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        We provide comprehensive healthcare services to meet the needs of you and your family.
                    </p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible">
                    <div className="min-w-[280px] flex-shrink-0 md:min-w-0">
                        <ServiceCard
                            icon={Thermometer}
                            title="General Medicine"
                            description="Comprehensive care for adults focusing on prevention, diagnosis, and treatment of diseases."
                        />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 md:min-w-0">
                        <ServiceCard
                            icon={BriefcaseMedical}
                            title="Specialized Care"
                            description="Expert treatment in cardiology, neurology, orthopedics, and other specialties."
                        />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 md:min-w-0">
                        <ServiceCard
                            icon={Pill}
                            title="Pharmacy Services"
                            description="Convenient access to prescriptions and medications with expert pharmacist guidance."
                        />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 md:min-w-0">
                        <ServiceCard
                            icon={Bed}
                            title="Inpatient Services"
                            description="24/7 care with comfortable accommodations for patients requiring overnight stays."
                        />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 md:min-w-0">
                        <ServiceCard
                            icon={Ambulance}
                            title="Emergency Care"
                            description="Immediate attention for urgent medical conditions with state-of-the-art equipment."
                        />
                    </div>
                    <div className="min-w-[280px] flex-shrink-0 md:min-w-0">
                        <ServiceCard
                            icon={Hospital}
                            title="Preventive Health"
                            description="Regular check-ups and screenings to maintain wellness and prevent disease."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
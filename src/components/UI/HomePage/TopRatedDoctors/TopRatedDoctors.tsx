import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import defaultDoctorImg from "@/assets/images/defautlDoctor.jpg";
import { TDoctor } from "./doctor.interface";
import { ArrowRight, MapPin } from "lucide-react";

const TopRatedDoctors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?page=1&limit=3`);
    const doctorsData = await res.json();
    const doctors = doctorsData?.data || [];

    return (
        <section className="bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Meet Our Top-Rated Medical Specialists</h2>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Gain access to leading physicians and surgeons equipped with cutting-edge technologies and world-class surgical facilities—all in one place.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors?.map((doctor: TDoctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white p-3 rounded-md shadow hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
                        >
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src={doctor.profilePhoto || defaultDoctorImg}
                                    alt={doctor.name}
                                    fill
                                    className="rounded-sm object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                                <p className="text-[#2CB0ED] mt-1">{doctor.qualification} - {doctor.designaton}</p>
                                <p className="mt-2 text-sm text-gray-500 flex items-center gap-x-1">
                                    <MapPin size={20} strokeWidth={0.75} />
                                    {doctor.address}
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                                    <Button
                                        sx={{
                                            color: 'white',
                                            backgroundColor: '#2CB0ED',
                                            padding: "7px 50px",
                                            fontSize: "16px",
                                            '&:hover': {
                                                backgroundColor: '#2CB0ED',
                                                boxShadow: "none"
                                            },
                                        }}
                                        LinkComponent={Link}
                                        href="/book"
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        sx={{ fontSize: "16px" }}
                                        LinkComponent={Link}
                                        href="/doctors"
                                        variant="outlined"
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button
                        LinkComponent={Link}
                        href="/doctors"
                        variant="outlined"
                        className="group border border-gray-400 px-6 py-2 rounded-md text-black font-semibold text-[17px] hover:border-blue-500 transition"
                    >
                        <span className="flex items-center gap-2">
                            View Doctors
                            <ArrowRight
                                className="transition-transform duration-300 group-hover:translate-x-1"
                                size={18}
                            />
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TopRatedDoctors;
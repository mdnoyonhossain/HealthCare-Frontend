import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import defaultDoctorImg from "@/assets/images/defautlDoctor.jpg";
import { TDoctor } from "./doctor.interface";
import { ArrowRight, MapPin } from "lucide-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
                            className="bg-white p-3 rounded-md shadow hover:shadow-lg "
                        >
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src={doctor?.profilePhoto || defaultDoctorImg}
                                    alt={doctor?.name}
                                    fill
                                    className="rounded-sm object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-gray-900">{doctor?.name}</h3>
                                <p className="text-[#2CB0ED] mt-1">{doctor?.qualification} - {doctor?.designaton}</p>
                                <p className="mt-2 text-sm text-gray-500 flex items-center gap-x-1">
                                    <MapPin size={20} strokeWidth={0.75} />
                                    {doctor?.address}
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                                    <Button
                                        variant="contained"
                                        LinkComponent={Link}
                                        href={`/doctors/${doctor?.id}`}
                                        endIcon={<CalendarTodayIcon sx={{ transition: "transform 0.4s ease" }} />}
                                        sx={{
                                            mt: 2,
                                            px: 3,
                                            py: 1.5,
                                            fontWeight: "bold",
                                            fontSize: "15px",
                                            backgroundColor: "#2CB0ED",
                                            color: "#fff",
                                            textTransform: "none",
                                            transition: "all 0.4s ease",
                                            boxShadow: "none",
                                            "&:hover": {
                                                backgroundColor: "#2CB0ED",
                                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                                "& .MuiSvgIcon-root": {
                                                    transform: "rotate(360deg)",
                                                },
                                            },
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        variant="contained"
                                        LinkComponent={Link}
                                        href={`/doctors/${doctor?.id}`}
                                        endIcon={<AccountCircleIcon sx={{ transition: "transform 0.4s ease" }} />}
                                        sx={{
                                            mt: 2,
                                            px: 3,
                                            py: 1.5,
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
                                                "& .MuiSvgIcon-root": {
                                                    transform: "rotate(360deg)",
                                                },
                                            },
                                        }}
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
                        endIcon={
                            <ArrowRight
                                className="icon transition-transform duration-300"
                                style={{ transition: "transform 0.4s ease" }}
                            />
                        }
                        sx={{
                            px: 3,
                            py: 1.5,
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: "#000",
                            borderColor: "#ccc",
                            textTransform: "none",
                            transition: "all 0.4s ease",
                            "&:hover": {
                                borderColor: "#008767",
                                ".icon": {
                                    transform: "translateX(5px)",
                                },
                            },
                        }}
                    >
                        View Doctors
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TopRatedDoctors;
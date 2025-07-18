import { ArrowRight } from "lucide-react";
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

type TSpecialties = {
    id: string;
    title: string;
    icon: string;
};

const Specialties = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/specialties`,
        {
            next: {
                revalidate: 30,
            },
        }
    );
    const specialties = await res.json();

    return (
        <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Explore Treatments Across Specialties
                </h2>
                <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover our comprehensive range of medical specialties offered by
                    our expert healthcare professionals.
                </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {specialties?.data?.slice(0, 5)?.map((specialty: TSpecialties) => (
                    <Link
                        key={specialty?.id}
                        href={`/doctors?specialties=${specialty?.title}`}
                        passHref
                    >
                        <Box
                            className="bg-white shadow-md hover:shadow-lg transition duration-300 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer hover:scale-[1.03]"
                            sx={{
                                border: '1px solid #e0e0e0',
                                '&:hover': {
                                    borderColor: '#2CB0ED',
                                },
                            }}
                        >
                            <div className="w-20 h-20 flex items-center justify-center bg-[#E5FAE5] rounded-full mb-4">
                                <Image
                                    src={specialty.icon}
                                    width={50}
                                    height={50}
                                    alt={`${specialty.title} icon`}
                                    className="object-contain"
                                />
                            </div>
                            <Typography variant="h6" fontWeight={600} fontSize={18}>
                                {specialty.title}
                            </Typography>
                        </Box>
                    </Link>
                ))}
            </div>
            <div className="text-center mt-10">
                <Button
                    LinkComponent={Link}
                    href="/specialties"
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
                    View Specialties
                </Button>
            </div>
        </section>
    );
};

export default Specialties;
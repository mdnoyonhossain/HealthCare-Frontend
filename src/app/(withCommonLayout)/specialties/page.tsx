import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

type TSpecialties = {
    id: string;
    title: string;
    icon: string;
};

const SpecialtiesPage = async () => {
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

            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {specialties?.data?.map((specialty: TSpecialties) => (
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
        </section>
    );
};

export default SpecialtiesPage;
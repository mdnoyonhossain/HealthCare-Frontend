import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import SpecialtiesScroll from "@/components/UI/Doctor/SpecialtiesScroll";
import { TDoctor } from "@/types/doctor";
import { Box, Divider } from "@mui/material";

type TSearchSpecialties = {
    searchParams: {
        specialties: string
    }
}

const Doctors = async ({ searchParams }: TSearchSpecialties) => {
    let res;
    if (searchParams?.specialties) {
        res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?specialties=${searchParams?.specialties}`);
    } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor`);
    }
    const doctorsData = await res.json();

    return (
        <section className="sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Divider sx={{ my: { xs: 1, sm: 2, md: 3 }, border: "1px", borderStyle: 'dashed', borderColor: 'grey.400' }} />
                <SpecialtiesScroll specialties={searchParams?.specialties} />
                <Box className="bg-gray-50" sx={{ mt: 4, p: 3 }}>
                    {
                        doctorsData?.data?.map((doctor: TDoctor, index: number) => (
                            <Box key={doctor?.id}>
                                <DoctorCard doctor={doctor} />
                            </Box>
                        ))
                    }
                </Box>
            </div>
        </section>
    );
};

export default Doctors;
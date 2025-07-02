import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import SpecialtiesScroll from "@/components/UI/Doctor/SpecialtiesScroll";
import { TDoctor } from "@/types/doctor";
import { Box } from "@mui/material";

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
                <Box
                    sx={{
                        borderBottom: "2px dashed",
                        borderColor: "grey.400",
                        my: 3
                    }}
                />
                <SpecialtiesScroll specialties={searchParams.specialties} />
                <Box className="bg-gray-50" sx={{ mt: 4, p: 3 }}>
                    {
                        doctorsData?.data?.map((doctor: TDoctor, index: number) => (
                            <Box key={doctor.id}>
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
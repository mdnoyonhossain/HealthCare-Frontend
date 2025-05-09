import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Services from "@/components/UI/HomePage/Services/Services";
import Specialties from "@/components/UI/HomePage/Specialties/Specialties";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialties />
            <Services />
            <TopRatedDoctors />
        </>
    );
};

export default HomePage;
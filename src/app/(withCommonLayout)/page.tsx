import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Services from "@/components/UI/HomePage/Services/Services";
import Specialties from "@/components/UI/HomePage/Specialties/Specialties";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialties />
            <Services />
        </>
    );
};

export default HomePage;
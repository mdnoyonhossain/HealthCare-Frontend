import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Services from "@/components/UI/HomePage/Services/Services";
import Specialties from "@/components/UI/HomePage/Specialties/Specialties";
import TopRatedDoctors from "@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors";
import WhyChooseUs from "../../components/UI/HomePage/WhyChooseUs/WhyChooseUs";
import HowItWork from "@/components/UI/HomePage/HowItWork/HowItWork";

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <Specialties />
            <Services />
            <TopRatedDoctors />
            <WhyChooseUs />
            <HowItWork />
        </>
    );
};

export default HomePage;
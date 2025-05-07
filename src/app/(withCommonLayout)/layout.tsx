import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="bg-blue-50">
                <Navbar />
            </div>
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default CommonLayout;
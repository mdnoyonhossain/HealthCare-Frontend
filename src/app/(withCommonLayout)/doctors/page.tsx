import { Box } from "@mui/material";

const Doctors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor`);
    const doctorsData = await res.json();

    console.log(doctorsData);

    return (
        <section className="bg-gray-50 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Box
                    sx={{
                        borderBottom: "2px dashed",
                        borderColor: "black",
                        my: 3
                    }}
                />
                {/* <Box sx={{ mt: 2, p: 3, bgcolor: "#F9FAFB" }}></Box> */}
            </div>
        </section>
    );
};

export default Doctors;
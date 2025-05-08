import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { TSpecialties } from "./Specialties.interface";
import Link from "next/link";

const Specialties = async () => {
    const res = await fetch("http://localhost:5000/api/v1/specialties", {
        next: {
            revalidate: 30
        }
    });
    const specialties = await res.json();

    return (
        <section className="bg-gray-50  px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Explore Treatments Across Specialties</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Discover our comprehensive range of medical specialties offered by our expert healthcare professionals.
                    </p>
                </div>
                <Stack
                    direction="row"
                    gap={4}
                    mt={5}
                    flexWrap="wrap"
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                >
                    {specialties?.data?.slice(0, 6)?.map((specialty: TSpecialties) => (
                        <Box
                            key={specialty.id}
                            sx={{
                                flex: "1 1 150px",
                                maxWidth: "200px",
                                minWidth: "120px",
                                backgroundColor: "#E5FAE5",
                                border: "1px solid rgba(250, 250, 250, 1)",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "24px 10px",
                                marginBottom: "20px",
                                "& img": {
                                    width: "50px",
                                    height: "50px",
                                    margin: "0 auto",
                                },
                                '&:hover': {
                                    cursor: "pointer",
                                    border: "1px solid #2CB0ED",
                                    padding: "24px 10px",
                                    borderRadius: "10px",
                                }
                            }}
                        >
                            <Image src={specialty.icon} width={100} height={100} alt="Specialty Icon" />
                            <Typography component="p" mt={1.5} fontWeight={600} fontSize={18}>
                                {specialty.title}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
                <div className="text-center mt-6">
                <Button LinkComponent={Link} href="/specialties" style={{ fontWeight: "bold", color: "black" }} variant="outlined" >
                    View Specialties
                </Button>
                </div>
            </div>
        </section>
    );
};

export default Specialties;
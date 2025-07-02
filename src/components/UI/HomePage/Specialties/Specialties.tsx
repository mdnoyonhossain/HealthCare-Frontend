import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { TSpecialties } from "./Specialties.interface";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Specialties = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/specialties`, {
        next: {
            revalidate: 30
        }
    });
    const specialties = await res.json();

    return (
        <section className="bg-gray-50  px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Explore Treatments Across Specialties</h2>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
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
                <div className="text-center mt-10">
                    {/* <Button
                        LinkComponent={Link}
                        href="/specialties"
                        variant="outlined"
                        className="group border border-gray-400 px-6 py-2 rounded-md text-black font-semibold text-[17px] hover:border-blue-500 transition"
                    >
                        <span className="flex items-center gap-2">
                            View Specialties
                            <ArrowRight
                                className="transition-transform duration-300 group-hover:translate-x-1"
                                size={18}
                            />
                        </span>
                    </Button> */}
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
            </div>
        </section>
    );
};

export default Specialties;
"use client";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SpecialtiesScroll = ({ specialties }: { specialties: string }) => {
    const { data: allSpecialties } = useGetAllSpecialtiesQuery({});
    const router = useRouter();
    const [value, setValue] = useState<string | false>(false);

    useEffect(() => {
        if (allSpecialties && allSpecialties.length > 0) {
            const titles = allSpecialties.map((s: any) => s.title);
            const matched = titles.includes(specialties) ? specialties : titles[0];
            setValue(matched);
        }
    }, [allSpecialties, specialties]);

    if (!allSpecialties || value === false) return <SkeletonLoading />;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        router.push(`/doctors?specialties=${newValue}`);
    };

    return (
        <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper', mx: 'auto' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="specialties tabs"
                sx={{
                    p: 2,
                    bgcolor: "#F9FAFB",
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#0A84FF",
                        height: 3,
                        borderRadius: 2,
                    },
                }}
            >
                {allSpecialties?.map((specialty: any) => (
                    <Tab
                        key={specialty?.id}
                        label={specialty?.title}
                        value={specialty?.title}
                        sx={{
                            fontSize: "15px",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            color: "#555",
                            px: 3,
                            py: 1.2,
                            mx: 0.8,
                            borderRadius: "10px",
                            minHeight: "40px",
                            transition: "all 0.25s ease-in-out",
                            "&.Mui-selected": {
                                backgroundColor: "#E6F0FF",
                                color: "#0A84FF",
                            },
                            "&:hover": {
                                backgroundColor: "#F0F4F8",
                                color: "#0A84FF",
                            },
                        }}
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default SpecialtiesScroll;
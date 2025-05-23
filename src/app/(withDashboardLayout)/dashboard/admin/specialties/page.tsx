"use client";
import React, { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpecialistModal from "./components/SpecialistModal";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";

const SpecialtiesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: getAllSpecialties, isLoading } = useGetAllSpecialtiesQuery({});
    console.log(getAllSpecialties);

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
                p: 0,
                m: 0,
                width: "100%",
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
                gap={2}
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Specialties Management
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        View and manage medical specialties
                    </Typography>
                </Box>

                <Button
                    sx={{
                        padding: '7px 15px',
                        color: 'white',
                        fontWeight: 'bold',
                        backgroundColor: '#2CB0ED',
                        textTransform: 'none',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            backgroundColor: '#1995cf',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            '.icon': {
                                transform: 'rotate(90deg)',
                            }
                        },
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Box display="flex" alignItems="center" gap="6px">
                        <AddCircleOutlineIcon className="icon" sx={{ transition: 'transform 0.3s ease' }} />
                        Create New Specialty
                    </Box>
                </Button>
                <SpecialistModal open={isModalOpen} setOpen={setIsModalOpen} />
            </Box>

            <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                }}
            >
                <TextField
                    placeholder="Search specialties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: {
                            padding: '4px 8px',
                            height: '36px',
                        },
                    }}
                    sx={{
                        flexGrow: 1,
                        minWidth: { xs: '100%', sm: 250 },
                        '& .MuiInputBase-root': {
                            padding: '0 8px',
                            height: '36px',
                            fontSize: '14px',
                        },
                    }}
                />
                <Button
                    variant="outlined"
                    sx={{
                        color: 'black',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        padding: '4px 10px',
                        fontSize: '14px',
                        height: '36px',
                        borderColor: '#ccc',
                        transition: 'all 0.3s ease',
                        minWidth: { xs: '100%', sm: 'auto' },
                        backgroundColor: '#f0f0f0',
                        '&:hover': {
                            backgroundColor: '#f0f0f0',
                            borderColor: '#999',
                            '.search-icon': {
                                transform: 'scale(1.2)',
                                color: '#2CB0ED',
                            },
                        },
                    }}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" gap="6px" width="100%">
                        <SearchIcon className="search-icon" sx={{ transition: 'transform 0.3s, color 0.3s' }} />
                        Search
                    </Box>
                </Button>
            </Box>

            <Box>
                Here Will Table Section Coming
            </Box>
        </Box>
    );
};

export default SpecialtiesPage;
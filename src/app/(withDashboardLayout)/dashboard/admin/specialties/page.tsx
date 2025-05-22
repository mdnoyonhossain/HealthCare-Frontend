"use client";
import React, { useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SpecialistModal from "./components/SpecialistModal";

const SpecialtiesPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                <Box>
                    <Typography variant="h4" fontWeight="bold">
                        Specialties Management
                    </Typography>
                    <Typography color="textSecondary">
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
            <Box display="flex" gap={2} flexWrap="wrap">
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
                        minWidth: 250,
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
                    <Box display="flex" alignItems="center" gap="6px">
                        <SearchIcon className="search-icon" sx={{ transition: 'transform 0.3s, color 0.3s' }} />
                        Search
                    </Box>
                </Button>
            </Box>
            Here Will Tabele Section Coming
        </Box>
    );
};

export default SpecialtiesPage;
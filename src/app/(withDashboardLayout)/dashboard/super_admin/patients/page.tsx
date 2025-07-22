"use client";
import React, { useMemo, useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, Paper, List, ListItem, ClickAwayListener, CircularProgress, ListItemButton, ListItemText, Chip, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDebounced } from "@/redux/hooks";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { TMeta } from "@/types";
import { useGetAllPatientsQuery } from "@/redux/api/patientApi";
import { TPatient } from "@/types/patient";

const PatientPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [resetSpinning, setResetSpinning] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("updatedAt");

    const debouncedTerm = useDebounced({ searchQuery: searchInput, delay: 600 });
    const query: Record<string, any> = {};
    if (!!debouncedTerm) {
        query["searchTerm"] = searchTerm;
    }

    query['page'] = page;
    query['limit'] = limit;
    query['sortOrder'] = sortOrder;
    query['sortBy'] = sortBy;

    const { data: getAllPatients = [], isLoading } = useGetAllPatientsQuery({ ...query });

    let patients: TPatient[] = [];
    let meta: TMeta | undefined = undefined;

    if (!Array.isArray(getAllPatients)) {
        patients = getAllPatients?.patients ?? [];
        meta = getAllPatients?.meta;
    }

    const pageCount: number = meta?.total ? Math.ceil(meta.total / limit) : 1;

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: ({ value }) => (
                <span style={{ fontWeight: "bold", fontSize: "13px", color: "#020817" }}>{value}</span>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 80,
            flex: 1,
            renderCell: ({ value }) => (
                <Chip
                    label={value}
                    size="small"
                    sx={{
                        backgroundColor: "#F3E2E3",
                        color: "#EF4444",
                        fontWeight: 500,
                        height: 24,
                        fontSize: "12px",
                        borderRadius: "30px",
                    }}
                />
            ),
        },
        {
            field: "contactNumber",
            headerName: "Contact Number",
            minWidth: 100,
            flex: 1,
            renderCell: ({ value }) => (
                <Chip
                    label={value}
                    size="small"
                    sx={{
                        backgroundColor: "#E1E8F5",
                        color: "#3B82F6",
                        fontWeight: 500,
                        height: 24,
                        fontSize: "12px",
                        borderRadius: "30px",
                    }}
                />
            ),
        },
        {
            field: "createdAt",
            headerName: "Joined",
            minWidth: 120,
            flex: 1,
            renderCell: ({ value }) => (
                <Chip
                    icon={<CalendarMonthIcon sx={{ color: '#6B7280', fontSize: 16 }} />}
                    label={
                        value
                            ? new Date(value).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })
                            : 'N/A'
                    }
                    size="small"
                    variant="outlined"
                    sx={{
                        backgroundColor: "#F9FAFB",
                        color: "#111827",
                        fontWeight: 500,
                        height: 28,
                        fontSize: "13px",
                        borderColor: "#D1D5DB",
                        borderRadius: "8px",
                        paddingLeft: "6px",
                        paddingRight: "6px",
                    }}
                />
            ),
        }
    ];

    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ p: 0, m: 0, width: "100%" }}>
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
                        All Patient
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        View all patient records
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 2, mb: 4 }}>
                <DataGrid
                    rows={patients}
                    columns={columns}
                    loading={isLoading}
                    autoHeight
                    getRowHeight={() => 'auto'}
                    disableRowSelectionOnClick
                    hideFooterPagination
                    sx={{
                        backgroundColor: "transparent",
                        borderRadius: 2,
                        boxShadow: 1,
                        fontSize: "15px",
                        fontFamily: "sans-serif",
                        px: 2,
                        pt: 1,
                        pb: 3,
                        "& .MuiDataGrid-cell": {
                            whiteSpace: "normal",
                            lineHeight: "1.6",
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            display: "flex",
                            alignItems: "center",
                            wordBreak: "break-word",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#f9fafb",
                            fontWeight: "bold",
                            textAlign: "center",
                        },

                        "& .MuiDataGrid-row": {
                            maxHeight: "none !important",
                            color: "black",
                        },

                        "& .MuiDataGrid-cellContent": {
                            whiteSpace: "normal",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#f8fafc",
                            color: "black"
                        },

                        "& .MuiDataGrid-cell:focus-within": {
                            outline: "none",
                        }
                    }}
                    slots={{
                        footer: () => {
                            return (
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backdropFilter: 'blur(10px)',
                                            backgroundColor: 'rgba(225, 241, 249)',
                                            border: '1px solid rgba(255, 255, 255, 0.4)',
                                            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
                                            borderRadius: '16px',
                                            px: 4,
                                            py: 1.5,
                                        }}
                                    >
                                        <Pagination
                                            count={pageCount}
                                            page={page}
                                            onChange={handlePaginationChange}
                                            variant="text"
                                            shape="rounded"
                                            showFirstButton
                                            showLastButton
                                            sx={{
                                                '& .MuiPaginationItem-root': {
                                                    fontWeight: 500,
                                                    borderRadius: '50%',
                                                    minWidth: 36,
                                                    height: 36,
                                                    color: '#1e3a8a',
                                                    transition: 'all 0.2s ease-in-out',
                                                },
                                                '& .MuiPaginationItem-root:hover': {
                                                    backgroundColor: '#c7d2fe',
                                                },
                                                '& .Mui-selected': {
                                                    backgroundColor: '#2CB0ED !important',
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                },
                                                '& .MuiPaginationItem-icon': {
                                                    color: '#1e3a8a',
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                            );
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default PatientPage;
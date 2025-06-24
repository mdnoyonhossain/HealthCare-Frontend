"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, Paper, List, ListItem, ClickAwayListener, CircularProgress, ListItemButton, ListItemText, Chip, Rating, Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "sonner";
import { AlertCircle, Check } from "lucide-react";
import { TMeta } from "@/types";
import { useDebounced } from "@/redux/hooks";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { TGetAllSchedulesResponse, TScheduleFrom } from "@/types/schedule";
import CreateDoctorScheduleModal from "./components/CreateDoctorScheduleModal";
import { useDeleteDoctorScheduleMutation, useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorSchedule";

const DoctorSchedulesPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [resetSpinning, setResetSpinning] = useState(false);
    const [allDoctorSchedule, setAllDoctorSchedule] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const debouncedTerm = useDebounced({ searchQuery: searchInput, delay: 600 });
    const query: Record<string, any> = {};
    if (!!debouncedTerm) {
        query["startDate"] = searchTerm;
    }

    query['page'] = page;
    query['limit'] = limit;

    const { data: getAllDoctorSchedules = [], isLoading } = useGetAllDoctorSchedulesQuery({ ...query });
    const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

    let schedules: TGetAllSchedulesResponse[] = [];
    let meta: TMeta | undefined = undefined;

    if (!Array.isArray(getAllDoctorSchedules)) {
        schedules = getAllDoctorSchedules?.doctorSchedules?.data ?? [];
        meta = getAllDoctorSchedules?.doctorSchedules?.meta;
    }

    const pageCount: number = meta?.total ? Math.ceil(meta.total / limit) : 1;

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        const updateData = schedules?.map((schedule: any, index: number) => {
            return {
                id: schedule?.scheduleId,
                startDate: dateFormatter(schedule?.schedule?.startDateTime),
                endDate: dateFormatter(schedule?.schedule?.endDateTime),
                startTime: dayjs(schedule?.schedule?.startDateTime).format('hh:mm a'),
                endTime: dayjs(schedule?.schedule?.endDateTime).format('hh:mm a'),
            };
        });

        setAllDoctorSchedule(updateData);
    }, [schedules]);

    const suggestions = useMemo(() => {
        return allDoctorSchedule?.filter((d: TScheduleFrom) => {
            const startDateStr = d?.startDate ? new Date(d.startDate).toISOString().split('T')[0] : '';
            const endDateStr = d?.endDate ? new Date(d.endDate).toISOString().split('T')[0] : '';
            const startTimeStr = d?.startTime || '';
            const endTimeStr = d?.startTime || '';

            return (
                startDateStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                endDateStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                startTimeStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
                endTimeStr.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }) || [];
    }, [allDoctorSchedule, searchTerm]);

    const handleScheduleDelete = async (id: string) => {
        try {
            const res = await deleteDoctorSchedule(id);
            if (res) {
                toast.success("Dcotor Schedule Deletion Successful", {
                    description: "The schedules record has been successfully deleted.",
                    duration: 5000,
                    icon: <Check className="h-4 w-4 text-green-500" />,
                    style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
                });
            }
            else if (!res) {
                toast.error("Dcotor Schedule Deletion Faild", {
                    description: "The system could not verify the deletion of the schedule. Please refresh and try again.",
                    position: "top-center",
                    duration: 4000,
                    icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                    style: { background: '#FDF1F1', border: "1px solid #FECACA" }
                });
            }
        }
        catch (err) {
            toast.error("Dcotor Schedule Deletion Failed", {
                description: "An unexpected error occurred while attempting to delete the schedule. Please try again later or contact support.",
                position: "top-center",
                duration: 4000,
                icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
                style: { background: '#FDF1F1', border: "1px solid #FECACA" }
            });
        }
    }

    const columns: GridColDef[] = [
        {
            field: "startDate",
            headerName: "Start Date",
            minWidth: 200,
            flex: 1,
            renderCell: ({ value }) => (
                <span style={{ fontWeight: "bold", fontSize: "13px", color: "#020817" }}>{value}</span>
            ),
        },
        { field: "endDate", headerName: "End Date", minWidth: 170, flex: 1 },
        {
            field: "startTime",
            headerName: "Start Time",
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
            field: "endTime",
            headerName: "End Time",
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
            field: "actions",
            headerName: "Actions",
            minWidth: 180,
            flex: 0.6,
            sortable: false,
            renderCell: ({ row }) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            color: '#000000',
                            border: 'none',
                            textTransform: 'none',
                            fontWeight: 600,
                            minWidth: '70px',
                            backgroundColor: '#E5FAE5',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#E5FAE5',
                                border: '1px solid #1E7BA5',
                                boxShadow: '0 4px 10px rgba(34, 197, 94, 0.4)',
                            },
                        }}
                    >
                        <EditIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        Edit
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            px: 1.5,
                            py: 0.5,
                            color: '#EF4444',
                            border: '1px solid #EF4444',
                            textTransform: 'none',
                            fontWeight: 600,
                            minWidth: '70px',
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#EF4444',
                                color: '#fff',
                                boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)',
                            },
                        }}
                        onClick={() => {
                            toast.custom(() => (
                                <Box sx={{ p: 2, borderRadius: 1, backgroundColor: '#fff', boxShadow: 2, width: '300px', textAlign: "center", py: 2 }}>
                                    <strong>Are you sure you want to delete?</strong>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => toast.dismiss()}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="error"
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#EF4444',
                                                    color: '#fff',
                                                    boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)',
                                                },
                                            }}
                                            onClick={() => {
                                                handleScheduleDelete(row?.id);
                                                toast.dismiss();
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </Box>
                                </Box>
                            ));
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const handleReset = () => {
        setResetSpinning(true);
        setTimeout(() => {
            setSearchInput("");
            setSearchTerm("");
            setResetSpinning(false);
        }, 500);
    };

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
                        Doctor Schedule
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        View and manage schedule records
                    </Typography>
                </Box>

                <Button
                    sx={{
                        padding: "10px 15px",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#2CB0ED",
                        textTransform: "none",
                        transition: "all 0.3s ease",
                        whiteSpace: "nowrap",
                        "&:hover": {
                            backgroundColor: "#1995cf",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            ".icon": {
                                transform: "rotate(90deg)",
                            },
                        },
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <Box display="flex" alignItems="center" gap="6px">
                        <AddCircleOutlineIcon className="icon" sx={{ transition: "transform 0.3s ease" }} />
                        Create Doctor Schedule
                    </Box>
                </Button>
                <CreateDoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
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
                <Box position="relative" width={{ xs: "100%", sm: 550 }}>
                    <TextField
                        placeholder="Search doctors..."
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                            setShowSuggestions(true);
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            sx: {
                                padding: "4px 8px",
                                height: "36px",
                            },
                        }}
                        sx={{
                            width: "100%",
                            "& .MuiInputBase-root": {
                                padding: "0 8px",
                                height: "36px",
                                fontSize: "14px",
                            },
                        }}
                    />
                    {showSuggestions && searchInput && (
                        <ClickAwayListener onClickAway={() => setShowSuggestions(false)}>
                            <Paper
                                sx={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    zIndex: 10,
                                    maxHeight: 200,
                                    overflowY: "auto",
                                }}
                            >
                                <List dense>
                                    {suggestions.map((suggestion: TScheduleFrom, index: number) => {
                                        const startDateStr = new Date(suggestion.startDate).toISOString().split("T")[0];
                                        const endDateStr = new Date(suggestion.endDate).toISOString().split("T")[0];

                                        return (
                                            <ListItem disablePadding key={index}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        setSearchInput(startDateStr);
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={`${startDateStr} | ${endDateStr}`}
                                                        secondary={`${suggestion.startTime} | ${suggestion.endTime}`}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </Paper>
                        </ClickAwayListener>
                    )}

                </Box>

                <Button
                    variant="outlined"
                    onClick={() => {
                        setSearchTerm(searchInput);
                        setShowSuggestions(false);
                    }}
                    sx={{
                        color: "black",
                        textTransform: "none",
                        fontWeight: "bold",
                        padding: "4px 10px",
                        fontSize: "14px",
                        height: "36px",
                        borderColor: "#ccc",
                        backgroundColor: "#f0f0f0",
                        "&:hover": {
                            backgroundColor: "#f0f0f0",
                            borderColor: "#999",
                            ".search-icon": {
                                transform: "scale(1.2)",
                                color: "#2CB0ED",
                            },
                        },
                    }}
                >
                    <Box display="flex" justifyContent="center" alignItems="center" gap="6px" width="100%">
                        <SearchIcon className="search-icon" sx={{ transition: "transform 0.3s, color 0.3s" }} />
                        Search
                    </Box>
                </Button>

                <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{
                        textTransform: "none",
                        color: "black",
                        border: "2px solid #E1F1F9",
                        background: "#E5FAE5",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {resetSpinning ? (
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                    ) : (
                        <RefreshIcon
                            sx={{
                                mr: 1,
                                animation: resetSpinning ? "spin 0.5s linear infinite" : "none",
                            }}
                        />
                    )}
                    Reset
                </Button>
            </Box>

            <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 2, mb: 4 }}>
                <DataGrid
                    rows={suggestions?.length ? suggestions : allDoctorSchedule}
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

export default DoctorSchedulesPage;
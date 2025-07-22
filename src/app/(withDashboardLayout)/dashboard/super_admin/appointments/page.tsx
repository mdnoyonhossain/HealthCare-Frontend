"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Chip, Pagination } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TMeta } from "@/types";
import { useGetAllAppointmentsQuery } from "@/redux/api/appointmentApi";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { dateFormatter } from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "../../doctor/schedules/components/MultipleSelectFieldChip";
import { getUserInfo } from "@/services/auth.service";

const AppointmentsPage = () => {
    const [userRole, setUserRole] = useState<{ email?: string, role?: string } | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(() => {
        const { role } = getUserInfo();
        if (role) {
            setUserRole(role);
        }
    }, []);

    const query: Record<string, any> = {};
    query['page'] = page;
    query['limit'] = limit;
    query['sortOrder'] = sortOrder;
    query['sortBy'] = sortBy;

    const { data: getAllAppointments = [], isLoading } = useGetAllAppointmentsQuery({ ...query });
    if (isLoading) {
        return <SkeletonLoading />
    }
    let appointments: [] = [];
    let meta: TMeta | undefined = undefined;

    if (!Array.isArray(getAllAppointments)) {
        appointments = getAllAppointments?.appointments?.data ?? [];
        meta = getAllAppointments?.appointments?.meta;
    }

    const pageCount: number = meta?.total ? Math.ceil(meta.total / limit) : 1;

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const columns: GridColDef[] = [
        {
            field: 'patientName',
            headerName: 'Patient Name',
            flex: 1,
            minWidth: 190,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => (
                <span
                    style={{
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: '#020817',
                    }}
                >
                    {row?.patient?.name || 'N/A'}
                </span>
            ),
        },
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            flex: 1,
            minWidth: 190,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => (
                <span
                    style={{
                        fontWeight: 'bold',
                        fontSize: '13px',
                        color: '#020817',
                    }}
                >
                    {row?.doctor?.name || 'N/A'}
                </span>
            ),
        },
        {
            field: 'appointmentDate',
            headerName: 'Appointment Date',
            flex: 1,
            minWidth: 140,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => (
                <span
                    style={{
                        fontWeight: 500,
                        fontSize: '13px',
                        color: '#475569',
                    }}
                >
                    {dateFormatter(row?.schedule?.startDateTime)}
                </span>
            ),
        },
        {
            field: 'appointmentTime',
            headerName: 'Appointment Time',
            flex: 1,
            minWidth: 150,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => {
                const start = row?.schedule?.startDateTime;
                const end = row?.schedule?.endDateTime;
                if (!start || !end) return 'N/A';

                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                            label={getTimeIn12HourFormat(start)}
                            size="small"
                            sx={{
                                backgroundColor: '#E1E8F5',
                                color: '#3B82F6',
                                fontWeight: 500,
                                fontSize: '12px',
                                borderRadius: '30px',
                                height: 24,
                            }}
                        />
                        <Chip
                            label={getTimeIn12HourFormat(end)}
                            size="small"
                            sx={{
                                backgroundColor: '#F3E2E3',
                                color: '#EF4444',
                                fontWeight: 500,
                                fontSize: '12px',
                                borderRadius: '30px',
                                height: 24,
                            }}
                        />
                    </Box>
                );
            },
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 0.7,
            minWidth: 100,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => {
                const isPaid = row?.paymentStatus === 'PAID';
                const statusLabel = row?.paymentStatus?.toLowerCase().replace(/^\w/, (c: any) => c?.toUpperCase());
                return (
                    <Chip
                        label={statusLabel}
                        color={isPaid ? 'success' : 'error'}
                        variant="outlined"
                        size="small"
                        sx={{
                            fontWeight: 600,
                            fontSize: '12px',
                            height: 24,
                            borderRadius: '20px',
                            px: 1.5,
                        }}
                    />
                );
            },
        },
        {
            field: 'rating',
            headerName: 'Rating',
            flex: 0.7,
            minWidth: 140,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                const avgRating = row?.review?.rating;

                return <Box
                    sx={{
                        px: 2,
                        py: 0.5,
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#22c55e',
                    }}
                >
                    {typeof avgRating === 'number' ? `⭐ ${avgRating.toFixed(1)} / 5` : 'N/A'}
                </Box>
            }
        },
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
                        All Appointment
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        View all appointment records
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 2, mb: 4 }}>
                <DataGrid
                    rows={appointments}
                    loading={isLoading}
                    autoHeight
                    getRowHeight={() => 'auto'}
                    disableRowSelectionOnClick
                    hideFooterPagination
                    disableColumnSelector
                    disableColumnMenu
                    sortingMode="client"
                    columns={columns.map(col => ({ ...col, sortable: false }))}
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

export default AppointmentsPage;
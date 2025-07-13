"use client";
import { Box, Typography, Pagination, Chip, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TMeta } from "@/types";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useState } from "react";
import { useGetMyPrescriptionsQuery } from "@/redux/api/prescriptionApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { getTimeIn12HourFormat } from "../../doctor/schedules/components/MultipleSelectFieldChip";
import { downloadPrescriptionPDF } from "@/utils/downloadPrescriptionPDF";

const PatientPrescriptionPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("createdAt");

    const query: Record<string, any> = {};
    query['page'] = page;
    query['limit'] = limit;
    query['sortOrder'] = sortOrder;
    query['sortBy'] = sortBy;

    const { data: getMyPrescriptions = [], isLoading } = useGetMyPrescriptionsQuery({ ...query });

    if (isLoading) {
        return <SkeletonLoading />
    }
    let reviews: [] = [];
    let meta: TMeta | undefined = undefined;

    if (!Array.isArray(getMyPrescriptions)) {
        reviews = getMyPrescriptions?.prescriptions ?? [];
        meta = getMyPrescriptions?.meta;
    }

    const pageCount: number = meta?.total ? Math.ceil(meta.total / limit) : 1;

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const columns: GridColDef[] = [
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            flex: 1,
            minWidth: 200,
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
            minWidth: 150,
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
                    {dateFormatter(row?.appointment?.schedule?.startDateTime)}
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
                const start = row?.appointment?.schedule?.startDateTime;
                const end = row?.appointment?.schedule?.endDateTime;
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
            field: 'followUpDate',
            headerName: 'Follow-Up Date',
            flex: 1,
            minWidth: 250,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => {
                const date = row?.followUpDate;
                const formattedDate = date
                    ? `${dateFormatter(date)} at ${getTimeIn12HourFormat(date)}`
                    : null;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            backgroundColor: '#F0FDF4',
                            border: '1px solid #BBF7D0',
                            borderRadius: '20px',
                            px: 2,
                            py: 0.5,
                            color: '#166534',
                            fontWeight: 500,
                            fontSize: '13px',
                            width: 'fit-content',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#166534"
                            viewBox="0 0 24 24"
                        >
                            <path d="M7 11h5v5H7z" />
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.103 0-2 .897-2 2v14c0 
                   1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 
                   16H5V10h14v10zm0-12H5V6h14v2z" />
                        </svg>
                        {formattedDate || 'N/A'}
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 160,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => {
                const handleDownload = () => {
                    downloadPrescriptionPDF(row);
                };

                return (
                    <Button
                        onClick={handleDownload}
                        variant="outlined"
                        size="small"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            borderRadius: '20px',
                            borderColor: '#22c55e',
                            color: '#22c55e',
                            '&:hover': {
                                backgroundColor: '#22c55e',
                                color: '#fff',
                            },
                        }}
                    >
                        Download PDF
                    </Button>
                );
            },
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
                        My Prescription
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        View my prescription records
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 2, mb: 4 }}>
                <DataGrid
                    rows={reviews}
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

export default PatientPrescriptionPage;
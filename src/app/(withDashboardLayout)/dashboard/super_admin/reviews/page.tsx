"use client";
import { Box, Typography, Pagination } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TMeta } from "@/types";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { useState } from "react";

const ReviewsPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortBy, setSortBy] = useState("createdAt");

    const query: Record<string, any> = {};
    query['page'] = page;
    query['limit'] = limit;
    query['sortOrder'] = sortOrder;
    query['sortBy'] = sortBy;

    const { data: getAllReviews = [], isLoading } = useGetAllReviewsQuery({ ...query });

    if (isLoading) {
        return <SkeletonLoading />
    }
    let reviews: [] = [];
    let meta: TMeta | undefined = undefined;

    if (!Array.isArray(getAllReviews)) {
        reviews = getAllReviews?.reviews ?? [];
        meta = getAllReviews?.meta;
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
                    {row?.patient?.name || 'N/A'}
                </span>
            ),
        },
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
            field: 'comment',
            headerName: 'Review Description',
            flex: 1,
            minWidth: 200,
            headerAlign: 'left',
            align: 'left',
            renderCell: ({ row }) => (
                <span
                    style={{
                        fontSize: '13px',
                        color: '#020817',
                    }}
                >
                    {row?.comment || 'N/A'}
                </span>
            ),
        },
        {
            field: 'rating',
            headerName: 'Rating',
            flex: 0.7,
            minWidth: 140,
            headerAlign: 'center',
            align: 'center',
            renderCell: ({ row }) => {
                const avgRating = row?.rating;

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
                    ⭐ {avgRating.toFixed(1)} / 5
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
                        All Review
                    </Typography>
                    <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
                        View all review records
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

export default ReviewsPage;
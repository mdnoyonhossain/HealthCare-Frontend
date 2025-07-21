"use client";
import React, { useMemo, useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, Paper, List, ListItem, ClickAwayListener, CircularProgress, ListItemButton, ListItemText, Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateSpecialistModal from "./components/CreateSpecialistModal";
import { useDeleteSpecialistMutation, useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";
import { toast } from "sonner";
import { AlertCircle, Check } from "lucide-react";
import Link from "next/link";

const SpecialtiesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [resetSpinning, setResetSpinning] = useState(false);

  const { data: getAllSpecialties = [], isLoading } = useGetAllSpecialtiesQuery({});
  const [deleteSpecialist] = useDeleteSpecialistMutation();

  const filteredSpecialties = useMemo(() => {
    return getAllSpecialties?.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [getAllSpecialties, searchTerm]);

  const handleSpecialistDelete = async (id: string) => {
    try {
      const res = await deleteSpecialist(id).unwrap();
      if (res?.id) {
        toast.success("Specialist Deletion Successful", {
          description: "The specialist record has been successfully deleted.",
          duration: 5000,
          icon: <Check className="h-4 w-4 text-green-500" />,
          style: { background: "#E5FAE5", border: "1px solid #BBF7D0" }
        });
      }
      else if (!res?.id) {
        toast.error("Specialist Deletion Faild", {
          description: "The system could not verify the deletion of the specialist. Please refresh and try again.",
          position: "top-center",
          duration: 4000,
          icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
          style: { background: '#FDF1F1', border: "1px solid #FECACA" }
        });
      }
    }
    catch (err) {
      toast.error("Specialist Deletion Failed", {
        description: "An unexpected error occurred while attempting to delete the specialist. Please try again later or contact support.",
        position: "top-center",
        duration: 4000,
        icon: <AlertCircle className="h-4 w-4 text-[#991B1B]" />,
        style: { background: '#FDF1F1', border: "1px solid #FECACA" }
      });
    }
  }

  const columns: GridColDef[] = [
    {
      field: "icon",
      headerName: "Icon",
      minWidth: 100,
      flex: 1,
      renderCell: ({ row }) => (
        <Avatar
          alt={row.title}
          src={row.icon}
          sx={{
            width: 45,
            height: 45,
            backgroundColor: "#f5f5f5",
            border: "1px solid #bdd4ed",
            padding: "5px"
          }}
        />
      )
    },
    { field: "title", headerName: "Title", minWidth: 150, flex: 1 },
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
            LinkComponent={Link}
            href={`/dashboard/admin/specialties/edit/${row?.id}`}
            variant="outlined"
            size="small"
            sx={{
              px: 1.5,
              py: 0.5,
              color: '#000000',
              border: '1px solid transparent',
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
                        handleSpecialistDelete(row?.id);
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
            Specialties Management
          </Typography>
          <Typography color="textSecondary" fontSize={{ xs: 14, sm: 16 }}>
            View and manage medical specialties
          </Typography>
        </Box>

        <Button
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "15px",
            backgroundColor: "#008767",
            color: "#fff",
            textTransform: "none",
            transition: "all 0.5s ease",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#008767",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              ".icon": {
                transform: "rotate(120deg)",
              },
            },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <Box display="flex" alignItems="center" gap="6px">
            <AddCircleOutlineIcon className="icon" sx={{ transition: "transform 0.3s ease" }} />
            Create New Specialty
          </Box>
        </Button>
        <CreateSpecialistModal open={isModalOpen} setOpen={setIsModalOpen} />
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
            placeholder="Search specialties..."
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
                  zIndex: 10,
                  mt: "4px",
                  width: "100%",
                  maxHeight: 200,
                  overflowY: "auto",
                  boxShadow: 3,
                }}
              >
                <List dense>
                  {getAllSpecialties
                    ?.filter((item: any) =>
                      item.title.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .slice(0, 10)
                    .map((item: any) => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setSearchInput(item.title);
                            setShowSuggestions(false);
                          }}
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#f0f0f0",
                            },
                          }}
                        >
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
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
          rows={filteredSpecialties}
          columns={columns}
          loading={isLoading}
          autoHeight
          getRowHeight={() => 'auto'}
          disableRowSelectionOnClick
          hideFooter
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
              paddingTop: "14px",
              paddingBottom: "14px",
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
        />
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
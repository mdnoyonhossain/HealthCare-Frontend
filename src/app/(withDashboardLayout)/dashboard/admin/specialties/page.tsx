"use client";
import React, { useMemo, useState } from "react";
import { Box, Typography, Button, TextField, InputAdornment, Paper, List, ListItem, ClickAwayListener, CircularProgress, ListItemButton, ListItemText, Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SpecialistModal from "./components/SpecialistModal";
import { useGetAllSpecialtiesQuery } from "@/redux/api/specialtiesApi";

const SpecialtiesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [resetSpinning, setResetSpinning] = useState(false);

  const { data: getAllSpecialties = [], isLoading } = useGetAllSpecialtiesQuery({});

  const filteredSpecialties = useMemo(() => {
    return getAllSpecialties?.filter((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [getAllSpecialties, searchTerm]);

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
      minWidth: 120,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton color="primary" size="small">
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton color="secondary" size="small">
            <EditIcon fontSize="small" />
          </IconButton>
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
            color: "white",
            border: "2px solid black",
            background: "black",
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
      <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto", mt: 2 }}>
        <DataGrid
          rows={filteredSpecialties}
          columns={columns}
          loading={isLoading}
          autoHeight
          disableRowSelectionOnClick
          hideFooter
          sx={{
            backgroundColor: "transparent",
            borderRadius: 2,
            boxShadow: 1,
            fontSize: "15px",
            fontFamily: "sans-serif",
            px: 2,
            py: 1,
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              lineHeight: "1.6",
              paddingTop: "35px",
              paddingBottom: "35px",
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
            },

            "& .MuiDataGrid-cellContent": {
              whiteSpace: "normal",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
              color: "black"
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
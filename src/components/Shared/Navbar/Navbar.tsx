"use client";
import { getUserInfo, removeUser } from "@/services/auth.service";
import { Box, Button, Drawer, IconButton, Menu, MenuItem, Skeleton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AlignJustify, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userInfo, setUserInfo] = useState<{ email?: string } | null>(null);
  const [isHydrated, setIsHydrated] = useState(false); // Prevent hydration mismatch
  const navigate = useRouter();

  useEffect(() => {
    setIsHydrated(true);
    const user = getUserInfo();
    setUserInfo(user);
  }, []);

  const navLinks = [
    { label: "Consultation", href: "/consultation" },
    { label: "Health Plans", href: "/health-plans" },
    { label: "Diagnostics", href: "/diagnostics" },
    { label: "NGOs", href: "/ngos" },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeUser();
    setUserInfo(null);
    navigate.refresh();
    navigate.push('/login');
  };

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-6">
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Skeleton variant="text" width={120} height={30} />
          <Skeleton variant="rectangular" width={40} height={40} />
        </Stack>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          component={Link}
          href="/"
          variant="h4"
          fontWeight={600}
          sx={{ textDecoration: "none" }}
        >
          <Box component="span" color="primary.main">
            H
          </Box>
          ealth
          <Box component="span" color="primary.main">
            C
          </Box>
          are
        </Typography>

        {isMobile ? (
          <>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <AlignJustify strokeWidth={3} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Stack
                p={2}
                width={250}
                height="100%"
                spacing={2}
                className="bg-blue-50"
              >
                {navLinks.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    sx={{ textDecoration: "none" }}
                  >
                    {link.label}
                  </Typography>
                ))}
                {userInfo?.email ? (
                  <Button
                    variant="outlined"
                    sx={{
                      padding: "7px 15px",
                      backgroundColor: "#2CB0ED",
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#2CB0ED",
                        boxShadow: "none",
                      },
                    }}
                    LinkComponent={Link}
                    href="/dashboard"
                  >
                    <Box display="flex" alignItems="center" gap="7px">
                      <LayoutDashboard size={15} strokeWidth={2.25} />
                      Dashboard
                    </Box>
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      LinkComponent={Link}
                      href="/login"
                      onClick={() => setDrawerOpen(false)}
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      LinkComponent={Link}
                      href="/register"
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#2CB0ED",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Stack>
            </Drawer>
          </>
        ) : (
          <Stack direction="row" gap={4} alignItems="center">
            {navLinks.map((link) => (
              <Typography
                key={link.label}
                component={Link}
                href={link.href}
                sx={{
                  textDecoration: "none",
                  padding: "8px 10px",
                  "&:hover": {
                    backgroundColor: "#E5FAE5",
                    borderRadius: "5px",
                  },
                }}
              >
                {link.label}
              </Typography>
            ))}
            {userInfo?.email ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handleMenuOpen}
                  sx={{
                    padding: "7px 15px",
                    backgroundColor: "#2CB0ED",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#2CB0ED",
                      boxShadow: "none",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" gap="7px">
                    <LayoutDashboard size={15} strokeWidth={2.25} />
                    Dashboard
                  </Box>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  slotProps={{
                    paper: {
                      sx: {
                        width: "200px",
                        py: 1,
                        px: 1.5,
                        borderRadius: 2,
                      },
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    component={Link}
                    href="/dashboard"
                    onClick={handleMenuClose}
                    sx={{ gap: 1, borderRadius: 1 }}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    href="/profile"
                    onClick={handleMenuClose}
                    sx={{ gap: 1, borderRadius: 1 }}
                  >
                    <User size={18} />
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleMenuClose();
                    }}
                    sx={{
                      gap: 1,
                      color: "error.main",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <LogOut size={18} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    marginRight: "-15px",
                    padding: "7px 15px",
                    color: "black",
                  }}
                  LinkComponent={Link}
                  href="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{
                    padding: "7px 15px",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#2CB0ED",
                    "&:hover": {
                      backgroundColor: "#2CB0ED",
                      boxShadow: "none",
                    },
                  }}
                  LinkComponent={Link}
                  href="/register"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default Navbar;
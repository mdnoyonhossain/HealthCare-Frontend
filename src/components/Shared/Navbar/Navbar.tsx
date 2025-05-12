"use client"
import { getUserInfo } from "@/services/auth.service";
import { Box, Button, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AlignJustify, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const userInfo = getUserInfo();

  const navLinks = [
    { label: "Consultation", href: "/consultation" },
    { label: "Health Plans", href: "/consultation" },
    { label: "Diagnostics", href: "/consultation" },
    { label: "NGOs", href: "/consultation" },
  ];

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
          <Box component="span" color="primary.main">H</Box>ealth
          <Box component="span" color="primary.main">C</Box>are
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
              <Stack p={2} width={250} height="100%" spacing={2} className="bg-blue-50">
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
                {
                  userInfo?.email ? (<Button
                    variant="outlined"
                    sx={{
                      padding: '7px 15px',
                      backgroundColor: '#2CB0ED',
                      color: "white",
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#2CB0ED',
                        boxShadow: "none"
                      },
                    }}
                    LinkComponent={Link}
                    href="/dashboard"
                  >
                    <Box display="flex" alignItems="center" gap="7px">
                      <LayoutDashboard size={15} strokeWidth={2.25} />
                      Dashboard
                    </Box>
                  </Button>)
                    : (
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
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                              backgroundColor: '#2CB0ED',
                              boxShadow: "none"
                            },
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    )
                }
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
                  padding: '8px 10px',
                  '&:hover': {
                    backgroundColor: '#E5FAE5',
                    boxShadow: "none",
                    padding: '8px 10px',
                    borderRadius: "5px"
                  }
                }}
              >
                {link.label}
              </Typography>
            ))}
            {
              userInfo?.email ? (<Button
                variant="outlined"
                sx={{
                  padding: '7px 15px',
                  backgroundColor: '#2CB0ED',
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  '&:hover': {
                    backgroundColor: '#2CB0ED',
                    boxShadow: "none"
                  },
                }}
                LinkComponent={Link}
                href="/dashboard"
              >
                <Box display="flex" alignItems="center" gap="7px">
                  <LayoutDashboard size={15} strokeWidth={2.25} />
                  Dashboard
                </Box>
              </Button>)
                : (<>
                  <Button variant="outlined" style={{ marginRight: "-15px", padding: '7px 15px', color: "black" }} LinkComponent={Link} href="/login">
                    Login
                  </Button>
                  <Button
                    sx={{
                      padding: '7px 15px',
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#2CB0ED',
                        boxShadow: "none"
                      },
                    }}
                    LinkComponent={Link}
                    href="/register"
                  >
                    Sign Up
                  </Button>
                </>)
            }
          </Stack>
        )}
      </Stack>
    </div>
  );
};

export default Navbar;
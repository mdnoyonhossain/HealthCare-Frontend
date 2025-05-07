"use client"
import { Box, Button, Container, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Consultation", href: "/consultation" },
    { label: "Health Plans", href: "/consultation" },
    { label: "Diagnostics", href: "/consultation" },
    { label: "NGOs", href: "/consultation" },
  ];

  return (
    <Container>
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
              =
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Stack p={2} width={250} spacing={2}>
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
                <Button
                  variant="contained"
                  LinkComponent={Link}
                  href="/login"
                  onClick={() => setDrawerOpen(false)}
                >
                  Login
                </Button>
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
                sx={{ textDecoration: "none" }}
              >
                {link.label}
              </Typography>
            ))}
            <Button LinkComponent={Link} href="/login">
              Login
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Navbar;
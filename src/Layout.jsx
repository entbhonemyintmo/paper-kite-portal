import React, { useState } from "react";
import AppBar from "./components/common/AppBar";
import SideDrawer from "./components/common/SideDrawer";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SendIcon from "@mui/icons-material/Send";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const drawerWidth = 300;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const Layout = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <AppBar toggleDrawer={toggleDrawer} />
      <Toolbar />
      <SideDrawer open={open} toggleDrawer={toggleDrawer} />
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            width: { md: "20%", lg: "15%" },
            padding: "1rem",
            display: { xs: "none", md: "block" },
          }}
        >
          <List component="div" disablePadding>
            {[
              {
                icon: <SendIcon />,
                route: "send",
                label: "Send",
              },
              {
                icon: <ChecklistIcon />,
                route: "batches",
                label: "Batches",
              },
              {
                icon: <VpnKeyIcon />,
                route: "api-keys",
                label: "Api Keys",
              },
              {
                icon: <ManageSearchIcon />,
                route: "api-logs",
                label: "Api Logs",
              },
            ].map(({ icon, route, label }) => (
              <Box key={route}>
                <ListItemButton
                  selected={location.pathname.includes(route)}
                  sx={{
                    height: "48px",
                    mb: "1rem",
                    borderRadius: "0.5rem",
                  }}
                  onClick={() => navigate(route)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "30px",
                      mr: 1,
                      color: location.pathname.includes(route)
                        ? "primary.main"
                        : "#757575",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                      fontWeight: 700,
                      color: location.pathname.includes(route)
                        ? "primary.main"
                        : "#757575",
                    }}
                  />
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Box>
        <Main
          sx={{
            borderRadius: "0.8rem",
            boxShadow: "1px 1px 20px rgba(51, 51, 51, 0.2)",
            overflow: "auto",
            px: { xs: "1rem", md: "2rem" },
            py: "1rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "92vh",
          }}
        >
          <Outlet />
        </Main>
      </Box>
    </Box>
  );
};

export default Layout;

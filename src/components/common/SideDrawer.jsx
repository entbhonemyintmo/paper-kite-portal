import React from "react";
import { Box, Button } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Logout } from "@mui/icons-material";
import SideList from "./SideList";
import { useSetRecoilState } from "recoil";
import authAtom from "../../recoil/auth/atom";

const drawerWidth = 300;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideDrawer = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const setAuth = useSetRecoilState(authAtom);

  const handleLogout = () => {
    localStorage.removeItem("paper-kite");
    setAuth(null);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          component="img"
          src="/assets/images/logo.png"
          sx={{
            // height: { xs: "30px", lg: "40px" },
            width: "2rem",
            objectFit: "cover",
            mx: "auto",
          }}
        />

        <IconButton
          onClick={toggleDrawer}
          sx={{
            backgroundColor: "#F7F7F7",
            color: "#333333",
          }}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box
        sx={{
          flex: "1 1 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SideList toggleDrawer={toggleDrawer} />

        <Button
          onClick={handleLogout}
          variant="outlined"
          color="error"
          startIcon={<Logout fontSize="small" />}
          sx={{
            width: "60%",
            marginBottom: "2rem",
            backgroundColor: "#ef01071a",
            color: "#D2122E",
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;

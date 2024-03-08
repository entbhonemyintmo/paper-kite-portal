import React from "react";
import { Container, Box } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountMenu from "./AccountMenu";

const drawerWidth = 300;

const Bar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ toggleDrawer }) => {
  return (
    <Bar sx={{ py: "8px" }}>
      <Container
        maxWidth='xxl'
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: { lg: "none" } }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            edge='start'
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "3rem",
            ml: "1rem"
          }}
        >
          <Box
            component='img'
            src='/assets/images/logo.png'
            sx={{
              width: "3rem",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <AccountMenu />
          </Box>
        </Box>
      </Container>
    </Bar>
  );
};

export default AppBar;

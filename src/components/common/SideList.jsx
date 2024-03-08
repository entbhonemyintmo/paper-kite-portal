import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SendIcon from "@mui/icons-material/Send";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Sidelist = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  const routing = (route) => () => {
    navigate(route);
    toggleDrawer();
  };

  return (
    <List
      sx={{ ml: 1, width: "90%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Welcome to Paper Kite
        </ListSubheader>
      }
    >
      <ListItemButton onClick={routing("send")}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText
          primary="Send"
          primaryTypographyProps={{ fontWeight: 700 }}
        />
      </ListItemButton>

      <ListItemButton onClick={routing("batches")}>
        <ListItemIcon>
          <ChecklistIcon />
        </ListItemIcon>
        <ListItemText
          primary="Batches"
          primaryTypographyProps={{ fontWeight: 700 }}
        />
      </ListItemButton>
      <ListItemButton onClick={routing("api-keys")}>
        <ListItemIcon>
          <VpnKeyIcon />
        </ListItemIcon>
        <ListItemText
          primary="Api Keys"
          primaryTypographyProps={{ fontWeight: 700 }}
        />
      </ListItemButton>
      <ListItemButton onClick={routing("api-logs")}>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText
          primary="Api Logs"
          primaryTypographyProps={{ fontWeight: 700 }}
        />
      </ListItemButton>
    </List>
  );
};

export default Sidelist;

import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import { useQuery } from "react-query";
import useAxios from "../hooks/useAxios";
import KeyGenerateDialog from "../components/common/KeyGenerateDialog";
import copy from "copy-to-clipboard";
import { withAlert } from "../recoil/snackbar";
import { useSetRecoilState } from "recoil";

const ApiKeys = () => {
  const api = useAxios();
  const openAlert = useSetRecoilState(withAlert);

  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery("api-keys", async () => {
    const res = await api.get("/api/keys");
    return res.data;
  });

  const keysColumn = [
    { field: "_id", headerName: "ID", hide: true, minWidth: 90 },
    { field: "description", headerName: "Description", minWidth: 200 },
    {
      field: "key",
      headerName: "Key",
      flex: 0.4,
      minWidth: 400,
    },
    {
      field: "isActive",
      headerName: "Is Active",
      minWidth: 90,
    },

    {
      field: "expireAt",
      headerName: "Expire At",
      flex: 0.1,
      minWidth: 200,
      valueFormatter: (params) => {
        return params.value
          ? `${new Date(params.value).toLocaleDateString()} ${new Date(
              params.value
            ).toLocaleTimeString()}`
          : "-";
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      flex: 0.1,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            color="error"
            variant="outlined"
            sx={{ mr: "1rem" }}
            onClick={() => {
              console.log("smt");
            }}
          >
            Revoke
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              copy(params.row.key);
              openAlert({ status: 200, detail: "copied to clipboard" });
            }}
          >
            Copy Key
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h3>Api Keys</h3>

      <Box sx={{ mb: "1rem" }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Generate new key
        </Button>
      </Box>

      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <DataGrid
          getRowId={(row) => row._id}
          loading={isLoading}
          columns={keysColumn}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: NoRowOverlay,
          }}
          rows={data || []}
          pagination
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>

      <KeyGenerateDialog
        open={open}
        setOpen={setOpen}
        handleDialogOnClick={(param) => {
          setOpen(!param);
        }}
      />
    </>
  );
};

export default ApiKeys;

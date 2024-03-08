import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import useAxios from "../hooks/useAxios";
import { useRecoilState } from "recoil";
import batchAtom from "../recoil/batch/atom";
import { useNavigate } from "react-router-dom";

const BatchDetail = () => {
  const navigate = useNavigate();
  const [data] = useRecoilState(batchAtom);

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data]);

  const batcheColumn = [
    { field: "_id", headerName: "ID", hide: true, minWidth: 90 },
    { field: "phoneNumber", headerName: "Phone Number", minWidth: 200 },
    {
      field: "message",
      headerName: "Message",
      flex: 0.1,
      minWidth: 300,
    },
    {
      field: "isSent",
      headerName: "Success",
      flex: 0.1,
      minWidth: 90,
    },
    {
      field: "dateSent",
      headerName: "Sent Time",
      flex: 0.1,
      minWidth: 200,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()} ${new Date(
          params.value
        ).toLocaleTimeString()}`,
    },
  ];

  return (
    <>
      <h3>Phone Numbers</h3>

      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <DataGrid
          getRowId={(row) => row._id}
          columns={batcheColumn}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: NoRowOverlay,
          }}
          rows={data || []}
          pagination
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>
    </>
  );
};

export default BatchDetail;

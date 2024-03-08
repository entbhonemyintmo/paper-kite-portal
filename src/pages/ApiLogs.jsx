import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import { useQuery } from "react-query";
import useAxios from "../hooks/useAxios";

const ApiLogs = () => {
  const api = useAxios();

  const { data, isLoading } = useQuery("api-logs", async () => {
    const res = await api.get("/api/logs");
    return res.data;
  });

  const apiLogColumn = [
    { field: "_id", headerName: "ID", hide: true, minWidth: 90 },
    { field: "message", headerName: "Message", minWidth: 200 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.1,
      minWidth: 90,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.1,
      minWidth: 90,
    },
    {
      field: "sentDate",
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
      <h3>Api Logs</h3>

      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <DataGrid
          getRowId={(row) => row._id}
          loading={isLoading}
          columns={apiLogColumn}
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

export default ApiLogs;

import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import { batchesColumn } from "../constants";
import { useQuery } from "react-query";
import useAxios from "../hooks/useAxios";

const ApiLogs = () => {
  const api = useAxios();

  return (
    <>
      <h3>Api Logs</h3>

      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <DataGrid
          // loading={isRefetching}
          columns={batchesColumn}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: NoRowOverlay,
          }}
          rows={[]}
          pagination
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>
    </>
  );
};

export default ApiLogs;

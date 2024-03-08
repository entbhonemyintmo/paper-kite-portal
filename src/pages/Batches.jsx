import { Box } from "@mui/material";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import { batchesColumn } from "../constants";
import useAxios from "../hooks/useAxios";
import { useQuery } from "react-query";

const Batches = () => {
  const api = useAxios();

  const { data, isLoading } = useQuery("batch-list", async () => {
    const res = await api.get("/sms/batches");
    return res.data;
  });
  console.log(data);

  return (
    <>
      <h3>Batches</h3>

      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <DataGrid
          getRowId={(row) => row._id}
          loading={isLoading}
          columns={batchesColumn}
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

export default Batches;

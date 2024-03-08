import { Box } from "@mui/material";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import useAxios from "../hooks/useAxios";
import { useQuery } from "react-query";
import { Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import batchAtom from "../recoil/batch/atom";
import { useNavigate } from "react-router-dom";

const Batches = () => {
  const api = useAxios();
  const navigate = useNavigate();

  const setBatch = useSetRecoilState(batchAtom);

  const batchesColumn = [
    { field: "_id", headerName: "ID", hide: true, minWidth: 90 },
    { field: "description", headerName: "Description", minWidth: 200 },
    {
      field: "total",
      headerName: "Total",
      flex: 0.1,
      minWidth: 90,
    },
    {
      field: "success",
      headerName: "Success",
      flex: 0.1,
      minWidth: 90,
    },
    {
      field: "failed",
      headerName: "Failed",
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
      field: "scheduleAt",
      headerName: "Schedule Time",
      flex: 0.1,
      minWidth: 200,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()} ${new Date(
          params.value
        ).toLocaleTimeString()}`,
    },
    {
      field: "compeleteDate",
      headerName: "Complete Time",
      flex: 0.1,
      minWidth: 200,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()} ${new Date(
          params.value
        ).toLocaleTimeString()}`,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.1,
      minWidth: 200,
      valueFormatter: (params) =>
        `${new Date(params.value).toLocaleDateString()} ${new Date(
          params.value
        ).toLocaleTimeString()}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      flex: 0.1,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            setBatch(params.row.toSend);
            navigate("/detail");
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const { data, isLoading } = useQuery("batch-list", async () => {
    const res = await api.get("/sms/batches");
    return res.data;
  });

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

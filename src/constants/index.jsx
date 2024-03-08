import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const batchesColumn = [
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
    renderCell: ({ _id }) => (
      <Link to={_id + ""}>
        <Button size="small" variant="outlined">
          View
        </Button>
      </Link>
    ),
  },
];

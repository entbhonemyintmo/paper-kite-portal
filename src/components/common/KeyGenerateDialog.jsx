import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  Button,
  Slider,
  Box,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";
import { withAlert } from "../../recoil/snackbar";
import { useSetRecoilState } from "recoil";
import { QueryClient, useMutation } from "react-query";
import useAxios from "../../hooks/useAxios";
import { LoadingButton } from "@mui/lab";

const KeyGenerateDialog = ({ open, handleDialogOnClick, setOpen }) => {
  const api = useAxios({ autoSnackbar: true });
  const queryClient = new QueryClient();

  const [data, setData] = useState({
    description: "",
    duration: "",
  });

  const { isLoading, mutate } = useMutation(
    async () => {
      return await api.post("/api/key", data);
    },
    {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries("api-keys");
      },
    }
  );

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <Dialog
      open={open}
      onClose={handleDialogOnClick}
      PaperProps={{
        style: { borderRadius: 15, minWidth: "400px" },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {"Generate New Api Key"}
        <IconButton
          aria-label="close"
          onClick={handleDialogOnClick}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          m: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            color: "secondary.light",
          }}
        >
          Description
        </Typography>

        <TextField
          name="description"
          size="small"
          type="text"
          value={data.description}
          onChange={handleOnChange}
          fullWidth
          margin="normal"
          sx={{
            border: "none",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "#F0F0F0",
              borderRadius: 1,
              outline: "none",
              "&:hover": {
                backgroundColor: "#F0F0F0",
              },
            },
          }}
        />
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            color: "secondary.light",
            mt: "1rem",
          }}
        >
          Duration (in day)
        </Typography>

        <TextField
          name="duration"
          size="small"
          type="number"
          value={data.duration}
          onChange={handleOnChange}
          fullWidth
          margin="normal"
          sx={{
            border: "none",
            borderRadius: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "#F0F0F0",
              borderRadius: 1,
              outline: "none",
              "&:hover": {
                backgroundColor: "#F0F0F0",
              },
            },
          }}
        />

        <LoadingButton
          loading={isLoading}
          sx={{ mt: 1 }}
          fullWidth
          onClick={mutate}
          disableElevation
          size="small"
          variant="contained"
        >
          Generate
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};

export default KeyGenerateDialog;

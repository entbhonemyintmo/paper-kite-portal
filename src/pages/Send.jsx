import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import DragAndDropUpload from "../components/common/DragAndDrop";
import { LoadingButton } from "@mui/lab";
import { useSetRecoilState } from "recoil";
import { withAlert } from "../recoil/snackbar";
import validatePhoneNumberFile from "../utils/validatePhoneNumberFile";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Send = () => {
  const api = useAxios({autoSnackbar: true});
  const navigate = useNavigate()

  const openAlert = useSetRecoilState(withAlert);

  const [data, setData] = useState({
    description: "",
    scheduleAt: "",
    type: "NOW",
  });
  const [schedule, setSchedule] = useState(new Date().toISOString());
  const [file, setFile] = useState("");

  const { isLoading, mutate } = useMutation(
    async (payload) => {
      return await api.postForm("/sms/batch", payload);
    },
    {
      onSuccess: (res) => {
        if (res.status === 201) {
          setData({
            description: "",
            scheduleAt: "",
            type: "NOW",
          });
          setFile(null);
          setSchedule(new Date().toISOString());
          navigate('/batches')
        }
      },
    }
  );

  const handleShedule = (date) => setSchedule(date);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (data.description === "" || file === null) {
      openAlert({
        status: 400,
        detail: "Please fill all fields!",
      });
      return;
    }

    if (file) {
      //validting phno_file
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async (event) => {
        const actualData = event.target.result;
        try {
          const isValid = await validatePhoneNumberFile(actualData);
          if (isValid) {
            mutate({ ...data, csvFile: file, scheduleAt: schedule });
          }
        } catch (error) {
          setFile(null);
          openAlert({
            status: 400,
            detail: error,
          });
        }
      };
    } else {
      openAlert({
        status: 400,
        detail: "Please select file to upload!",
      });
    }
  };

  return (
    <>
      <h3>Send</h3>

      <Box sx={{ flex: 1, position: "relative", height: "60vh" }}>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            marginTop: "3rem",
            marginBottom: "1px",
            color: "secondary.light",
          }}
        >
          Description
        </Typography>
        <TextField
          name="description"
          value={data.description}
          onChange={handleChange}
          size="small"
          sx={{
            width: {
              sm: "30%",
              xs: "100%",
            },
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
            marginTop: "3rem",
            marginBottom: "1rem",
            color: "secondary.light",
          }}
        >
          Upload CSV
        </Typography>

        <DragAndDropUpload data={file} setData={setFile} />

        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            marginTop: "3rem",
            marginBottom: "1rem",
            color: "secondary.light",
          }}
        >
          Time to send
        </Typography>

        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <RadioGroup row name="type" value={data.type} onChange={handleChange}>
            <FormControlLabel value="NOW" control={<Radio />} label="Now" />
            <FormControlLabel
              value="SCHEDULE"
              control={<Radio />}
              label="Schedule"
            />
          </RadioGroup>

          {data.type === "SCHEDULE" && (
            <MobileDateTimePicker
              label="Set Schedule"
              // value={schedule}
              onChange={handleShedule}
              showTimeInput={true}
              textField={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  label=""
                  size="small"
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
              )}
            />
          )}
        </Box>
        <Box
          sx={{
            mt: "1rem",
            width: {
              sm: "30%",
              xs: "100%",
            },
          }}
        >
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            loading={isLoading}
            sx={{
              width: { lg: 190, md: 190, sm: 140, xs: 140 },
              height: 35,
              boxShadow: "none",
              mr: "1rem",
            }}
          >
            Create Batch
          </LoadingButton>
          <Button
            variant="outlined"
            sx={{ width: { lg: 190, md: 190, sm: 140, xs: 140 }, height: 35 }}
            onClick={() => {
              setData({
                description: "",
                scheduleAt: "",
                type: "NOW",
              });
              setFile(null);
              setSchedule(new Date().toISOString());
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Send;

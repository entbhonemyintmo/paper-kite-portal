import React, { useState, useRef } from "react";
import { Box, Typography } from "@mui/material";

const DragAndDropUpload = ({
  types = ["text/csv"],
  sizeLimit = 5,
  data,
  setData,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileDrop = (files) => {
    const file = files[0];
    validateAndSetFile(file);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const file = files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    if (!file) return;

    const isValidFileType = types.includes(file.type);
    const isValidFileSize = file.size <= sizeLimit * 1024 * 1024;

    if (!isValidFileType) {
      setData(null);
      setInvalidMessage(
        "Invalid file type! Please select an appropriate file."
      );
    } else if (!isValidFileSize) {
      setData(null);
      setInvalidMessage("File size exceeds 5MB.");
    } else {
      setData(file);
      setInvalidMessage(null);
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "10rem",
        border: "2px dashed",
        borderColor: isDragOver ? "primary.main" : "text.secondary",
        borderRadius: "4px",
        padding: "1rem",
        textAlign: "center",
        cursor: "pointer",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileDrop(Array.from(e.dataTransfer.files));
      }}
      onClick={handleUploadAreaClick}
    >
      <input
        required
        type="file"
        accept={types.join(",")}
        multiple={false}
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {invalidMessage ? (
        <Typography color="red">{invalidMessage}</Typography>
      ) : data ? (
        <Typography variant="body1" color="green">
          {data.name}
        </Typography>
      ) : (
        <Typography variant="body1">
          Drag and drop file here or click to browse
        </Typography>
      )}
    </Box>
  );
};

export default DragAndDropUpload;

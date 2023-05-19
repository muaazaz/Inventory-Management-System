import { Alert, AlertTitle, Avatar, Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  cancelButton,
  header,
  imageUploadDiv,
  main,
  saveButton,
  uploadImage,
} from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageIcon from '@mui/icons-material/Image';
import Input from "../../Components/Shared/Input/Input";
import { useState } from "react";
import PhotoUpload from "../../Components/Shared/PhotoUpload/PhotoUpload";
import { useDispatch } from "react-redux";
import { createComplaint } from "../../Redux/complaint/complaintAction";

const CreateComplaint = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      title: "",
      description: "",
      photos: [{ image: "" }],
    }),
    dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComplaint(formData))
    navigate(-1)
  };
  return (
    <Box sx={main}>
      <Box sx={header}>
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          sx={{ color: "GrayText", marginRight: "2%" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
        <Button
          sx={cancelButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={saveButton}
          form="complaint-form"
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={{ m: "2% 0" }} />
      <Box component="form" id="complaint-form" onSubmit={handleSubmit}>
        <Input
          name={"title"}
          label={"Title"}
          placeHolder={"Enter a title for compaint"}
          setFormData={setFormData}
          formData={formData}
        />
        <Input
          label={"Description"}
          name={"description"}
          placeHolder={"Enter description here..."}
          textarea={true}
          rows={"10"}
          columns={"60"}
          setFormData={setFormData}
          formData={formData}
        />
      </Box>
      <Box sx={imageUploadDiv}>
        <Alert severity="info">
          <AlertTitle>Attachments</AlertTitle>
          You can upload multiple attachments to this complaint
        </Alert>
        <Box sx={imageUploadDiv}>
          {formData.photos.map((obj, i) => (
            <Avatar
              key={i}
              src={obj.image}
              variant="rounded"
              sx={uploadImage}
            >
              <ImageIcon sx={{width: "100%"}}/>
            </Avatar>
          ))}
        </Box>
        <PhotoUpload
          setImage={(image) => {
              setFormData({
                ...formData,
                photos: [...formData.photos, { image }],
              });
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateComplaint;

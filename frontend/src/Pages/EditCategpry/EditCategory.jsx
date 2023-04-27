import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Shared/Input/Input";
import { cancelButton, mainDiv, saveButton } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditCategory = () => {
  const { id } = useParams(),
    [name, setName] = useState(""),
    navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, id });
  };
  return (
    <Box sx={mainDiv}>
      <Button
        size="small"
        startIcon={<ArrowBackIcon />}
        sx={{ color: "GrayText", marginRight: "2%" }}
        onClick={() => {
          navigate("/categories");
        }}
      >
        Back
      </Button>
      <Button
        sx={cancelButton}
        onClick={() => {
          navigate("/categories");
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={saveButton}
        form="category-edit"
        type="submit"
      >
        Save
      </Button>
      <Box component="form" id="category-edit" onSubmit={handleSubmit}>
        <Input
          name={"Category Name"}
          placeHolder={"Category Name"}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};

export default EditCategory;

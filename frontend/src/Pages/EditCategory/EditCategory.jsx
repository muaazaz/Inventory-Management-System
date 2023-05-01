import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Shared/Input/Input";
import { cancelButton, mainDiv, saveButton } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategory,
  getCategoryDetails,
} from "../../Redux/category/categoryAction";

const EditCategory = () => {
  const { id } = useParams(),
    [name, setName] = useState(""),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { categoryDetail } = useSelector((state) => state.categoryData);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory({ id, formData: { name } }));
    navigate(-1)
  };
  useEffect(() => {
    dispatch(getCategoryDetails(id));
    if (categoryDetail) {
      setName(categoryDetail.name);
    }
  }, [dispatch, categoryDetail]);
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};

export default EditCategory;

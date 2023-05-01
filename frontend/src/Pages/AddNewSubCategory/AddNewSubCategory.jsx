import { Box, Button, Divider, Typography } from "@mui/material";
import {
  createMainDiv,
  header,
  headerText,
  saveButton,
  cancelButton,
  addButton,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Input from "../../Components/Shared/Input/Input";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategory,
  getCategoryDetails,
} from "../../Redux/category/categoryAction";

const AddNewSubCategory = () => {
  const navigate = useNavigate(),
    [once, setOnce] = useState(false),
    { id } = useParams(),
    [name, setName] = useState(""),
    [inputArray, setInputArray] = useState([]),
    [newSubCategories, setNewSubCategories] = useState([]),
    [counter, setCounter] = useState(2),
    dispatch = useDispatch(),
    { categoryDetail } = useSelector((state) => state.categoryData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = newSubCategories.filter((category) => category);
    dispatch(editCategory({ id, formData: { subCategories: filtered } }));
    navigate(-1);
  };

  const handleSubCategoryInputChange = (e) => {
    e.preventDefault();
    const index = e.target.id;
    setNewSubCategories((s) => {
      const newArr = s.slice();
      newArr[index] = { name: e.target.value };
      return newArr;
    });
  };

  const addSubCategoryInput = () => {
    setCounter(counter + 1);
    setInputArray((s) => {
      return [
        ...s,
        {
          name: "Sub-Category# " + counter + " Name",
          placeHolder: "Sub-Category# " + counter + " Name",
        },
      ];
    });
  };

  useEffect(() => {
    if(!once){
      dispatch(getCategoryDetails(id));
      setOnce(true)
    }
    if (categoryDetail) {
      setName(categoryDetail.name);
      const newArray = [];
      categoryDetail.childern?.forEach((category, i) => {
        newArray.push({
          name: "Sub-Category# " + (i + 1) + " Name",
          placeHolder: "",
          value: category.name,
          disable: true,
        });
        setCounter(i + 2);
      });
      setInputArray(newArray);
    }
  }, [categoryDetail]);

  return (
    <>
      {categoryDetail && (
        <Box sx={createMainDiv}>
          <Box sx={header}>
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
            <Typography variant="content" sx={headerText}>
              Add New Category
            </Typography>
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
              form="Category-form"
              type="submit"
            >
              Save
            </Button>
          </Box>
          <Divider sx={{ margin: "2% 0" }} />
          <Box component="form" id="Category-form" onSubmit={handleSubmit}>
            <Input
              name={"Category Name"}
              placeHolder={"name of category"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Typography sx={headerText}>Sub Category</Typography>
            {inputArray.map((item, i) => (
              <Input
                key={i}
                name={item.name}
                placeHolder={item.placeHolder}
                id={i}
                value={item.value}
                disable={item.disable}
                onChange={handleSubCategoryInputChange}
              />
            ))}
            <Button
              startIcon={<AddIcon />}
              size="large"
              sx={addButton}
              color="success"
              variant="contained"
              onClick={addSubCategoryInput}
            >
              Add Sub-Category
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddNewSubCategory;

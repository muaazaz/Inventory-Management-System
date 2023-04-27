import { Box, Button, Divider, Typography } from "@mui/material";
import {
  createMainDiv,
  header,
  headerText,
  saveButton,
  cancelButton,
  addButton,
} from "./styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Input from "../../Components/Shared/Input/Input";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { categoryDetail } from "../../Constant/dummyData";
import queryString from "query-string";

const CreateCategory = () => {
  const navigate = useNavigate(),
    queryParams = queryString.parse(window.location.search),
    [name, setName] = useState(""),
    [inputArray, setInputArray] = useState([]),
    [subCategories, setSubCategories] = useState([]),
    [newSubCategories, setNewSubCategories] = useState([]),
    [addNew, setAddNew] = useState(false),
    [counter, setCounter] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addNew) {
      const filtered =newSubCategories.filter(category=>category)
      console.log({newSubCategories: filtered});
    } else {
      console.log({ name, subCategories });
    }
  };
  const handleSubCategoryInputChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    if (!addNew) {
      setSubCategories((s) => {
        const newArr = s.slice();
        newArr[index] = { name: e.target.value };
        return newArr;
      });
    } else {
      setNewSubCategories((s) => {
        const newArr = s.slice();
        newArr[index] = { name: e.target.value };
        return newArr;
      });
    }
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
    switch (queryParams.type) {
      case "new":
        setAddNew(true);
        setName(categoryDetail.name);
        const newArray = [];
        categoryDetail.subCategories.forEach((category, i) => {
          newArray.push({
            name: "Sub-Category# " + (i + 1) + " Name",
            placeHolder: "",
            value: category.name,
            disable: true
          });
          setCounter(i + 2);
        });
        setInputArray(newArray);
        break;

      default:
        setInputArray([
          {
            name: "Sub-Category# 1 Name",
            placeHolder: "Sub-Category# 1 Name",
            value: "",
          },
        ]);
        break;
    }
  }, [queryParams.type]);
  return (
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
  );
};

export default CreateCategory;

import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  addButton,
  divider,
  headerDiv,
  headerText,
  main,
  searchStyles,
} from "./styles";
import { categoryLabel } from "../../Constant/dummyData";
import { useNavigate } from "react-router-dom";
import CollapsibleTable from "../../Components/Shared/CollapseTable/CollapseTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, searchCategory } from "../../Redux/category/categoryAction";
const Category = () => {
  const navigate = useNavigate(),
    [once, setOnce] = useState(false),
    dispatch = useDispatch(),
    {categories} = useSelector((state)=>state.categoryData);
    
  useEffect(()=>{
    if(!once){
      dispatch(getCategories())
      setOnce(true)
    }
  },[dispatch, categories])
  
  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Categories</Typography>
        <Box component="form" sx={searchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            onChange={(e) => {
              dispatch(searchCategory(e.target.value))
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "5%" }}
            color="primary"
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Button
          startIcon={<AddIcon />}
          size="large"
          sx={addButton}
          color="success"
          variant="contained"
          onClick={() => {
            navigate("create");
          }}
        >
          {" "}
          ADD
        </Button>
      </Box>
      <Divider sx={divider} />
      <CollapsibleTable
        label={categoryLabel}
        data={categories ? categories : []}
        viewRoute={"details/"}
        rowsPerPage={10}
      />
    </Box>
  );
};

export default Category;

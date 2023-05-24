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
import React, { useEffect, useState } from "react";
import {
  addButton,
  divider,
  headerDiv,
  headerSelects,
  headerText,
  main,
  searchStyles,
} from "./styles";
import Tables from "../../Components/Shared/Tables/Tables";
import { InventoryLabel } from "../../Constant/tablesData";
import { useNavigate } from "react-router-dom";
import Select from "../../Components/Shared/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  searchItems,
  selectUsingCategory,
  selectUsingSubCategory,
} from "../../Redux/item/itemAction";
import { getCategories } from "../../Redux/category/categoryAction";

export default function Inventory() {
  const navigate = useNavigate(),
    [search, setSearch] = useState(""),
    [categorySelect, setCatSelect] = useState(""),
    [subCatSelect, setSubCatSelect] = useState(""),
    [subCategories, setSubCategories] = useState([]),
    [disabled, setDisabled] = useState(true),
    dispatch = useDispatch(),
    { itemData, categoryData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getItems());
    dispatch(getCategories());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(searchItems(e.target.value));
    setSearch(e.target.value);
    setCatSelect("");
    setSubCatSelect("");
    setDisabled(true);
  };

  const handleSelectCategory = (e) => {
    dispatch(selectUsingCategory(e.target.value));
    setCatSelect(e.target.value);
    setSubCatSelect("");
    setSearch("");
    categoryData.categories.forEach((category) => {
      if (category.name === e.target.value) {
        setSubCategories(category.subCategories);
      }
    });
    setDisabled(false);
  };

  const handleSelectSubCategory = (e) => {
    dispatch(
      selectUsingSubCategory({
        subCatSelect: e.target.value,
        categorySelect,
      })
    );
    setSubCatSelect(e.target.value);
    setSearch("");
  };

  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Inventory</Typography>
        <Box component="form" sx={searchStyles}>
          <InputBase
            value={search}
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            onChange={handleSearch}
          />
          <IconButton type="button" sx={{ p: "5%" }} color="primary">
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={headerSelects}>
          <Select
            label={"Select Category"}
            menuItems={categoryData.categories}
            defaultValue={categorySelect}
            value={"name"}
            html={"name"}
            noLabel={true}
            onChange={handleSelectCategory}
          />
          <Select
            label={"Select Sub-Category"}
            menuItems={subCategories}
            defaultValue={subCatSelect}
            disabled={disabled}
            value={"name"}
            html={"name"}
            noLabel={true}
            onChange={handleSelectSubCategory}
          />
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
          ADD Item
        </Button>
      </Box>
      <Divider sx={divider} />
      <Tables
        label={InventoryLabel}
        rowsPerPage={10}
        viewRoute={"details/"}
        data={itemData?.items ? itemData.items : []}
      />
    </Box>
  );
}

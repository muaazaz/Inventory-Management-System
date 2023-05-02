import Tables from "../../Components/Shared/Tables/Tables";
import { Box, Button, IconButton, InputBase, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { vendorsLabel } from "../../Constant/tablesData";
import { searchStyles, headerDiv, headerText, main } from "./styles";
import { useEffect, useState } from "react";
import Select from "../../Components/Shared/Select/Select";
import { addButton } from "./styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVendors, searchVendors, selectUsingCategory, selectUsingSubCategory } from "../../Redux/vendor/vendorAction";
import { getCategories } from "../../Redux/category/categoryAction";

const Vendors = () => {
  const [search, setSearch] = useState(""),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    [disabled, setDisabled] = useState(true),
    [subCategory, setSubCategory] = useState([]),
    [catSelect, setCatSelect] = useState([]),
    [subCatSelect, setSubCatSelect] = useState([]),
    { vendorData, categoryData } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getVendors());
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Vendors</Typography>
        <Box component="form" sx={searchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            value={search}
            onChange={(e) => {
              setCatSelect("")
              setSubCatSelect("")
              setSearch(e.target.value);
              dispatch(searchVendors(e.target.value))
            }}
          />
          <IconButton type="button" sx={{ p: "5%" }} color="primary">
            <SearchIcon />
          </IconButton>
        </Box>
        <Select
          label={"Select Category"}
          menuItems={categoryData.categories}
          defaultValue={catSelect}
          value={"name"}
          html={"name"}
          noLabel={true}
          onChange={(e) => {
            setCatSelect(e.target.value)
            setSearch("")
            setSubCatSelect("")
            dispatch(selectUsingCategory(e.target.value))
            categoryData.categories.forEach((category) => {
              if (category.name === e.target.value)
                setSubCategory(category.childern);
            });
            
            setDisabled(false);
          }}
        />
        <Select
          label={"Select Sub-Category"}
          menuItems={subCategory}
          defaultValue={subCatSelect}
          value={"label"}
          html={"label"}
          disabled={disabled}
          noLabel={true}
          onChange={(e) => {
            setSearch("")
            setSubCatSelect(e.target.value)
            dispatch(selectUsingSubCategory(e.target.value))
          }}
        />
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
      <Tables
        label={vendorsLabel}
        rowsPerPage={10}
        hidden={false}
        viewRoute={"details/"}
        data={vendorData.vendors ? vendorData.vendors : []}
      />
    </Box>
  );
};

export default Vendors;

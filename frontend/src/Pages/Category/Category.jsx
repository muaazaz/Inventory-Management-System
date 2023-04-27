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
import { useState } from "react";
import {
  addButton,
  divider,
  headerDiv,
  headerText,
  main,
  searchStyles,
} from "./styles";
import { categoryData, categoryLabel } from "../../Constant/dummyData";
import { useNavigate } from "react-router-dom";
import CollapsibleTable from "../../Components/Shared/CollapseTable/CollapseTable";
const Category = () => {
  const navigate = useNavigate(),
    [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log(search);
  };
  return (
    <Box sx={main}>
      <Box sx={headerDiv}>
        <Typography sx={headerText}>Categories</Typography>
        <Box component="form" sx={searchStyles}>
          <InputBase
            sx={{ textAlign: "center", m: 1 }}
            placeholder="Search something..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <IconButton
            type="button"
            sx={{ p: "5%" }}
            color="primary"
            onClick={handleSearch}
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
        data={categoryData}
        viewRoute={"details/"}
        rowsPerPage={10}
      />
    </Box>
  );
};

export default Category;

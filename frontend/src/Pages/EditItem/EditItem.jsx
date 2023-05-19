import { Box, Button, Divider } from "@mui/material";
import {
  cancelButton,
  depriciationButton,
  depriciationDiv,
  dividerStyles,
  headerDiv,
  mainDivStyles,
  saveButton,
} from "./styles";
import Input from "../../Components/Shared/Input/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editItem, getItemDetails } from "../../Redux/item/itemAction";

const EditItem = () => {
  const navigate = useNavigate(),
    [formData, setFormData] = useState({
      name: "",
      serialNo: "",
      description: "",
      price: "",
      currentPrice: "",
      depriciatedPrice: "",
      depreciationPercentage: "",
    }),
    { id } = useParams(),
    dispatch = useDispatch(),
    { itemData } = useSelector((state) => state);

    const calculateDepreciation = () => {
      setFormData({
        ...formData,
        depriciatedPrice:
          parseFloat(formData.price) -
          parseFloat(formData.currentPrice),
        depreciationPercentage:
          `${(parseFloat(
            parseFloat(formData.price) -
              parseFloat(formData.currentPrice)
          ) *
            100) /
          parseFloat(formData.price)}%`,
      });
    }
  
    const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editItem({ id, formData }));
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getItemDetails(id));
    if (itemData.itemDetails) {
      setFormData({
        name: itemData.itemDetails.name,
        serialNo: itemData.itemDetails.serialNo,
        description: itemData.itemDetails.description,
        price: parseFloat(itemData.itemDetails.price),
        currentPrice: parseFloat(itemData.itemDetails.currentPrice),
        depriciatedPrice: parseFloat(itemData.itemDetails.depriciatedPrice),
        depreciationPercentage: itemData.itemDetails.depreciationPercentage
      });
    }
  }, [dispatch]);
  return (
    <Box sx={mainDivStyles}>
      <Box sx={headerDiv}>
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
          form={"item-form"}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={dividerStyles} />
      <Box component="form" onSubmit={handleSubmit} id="item-form">
        <Input
          label={"name"}
          name={"Item Name"}
          placeHolder={"Item Name"}
          value={formData.name}
          setFormData={setFormData}
        />
        <Input
          name={"serialNo"}
          label={"Serial Number"}
          placeHolder={"Enter Serial Number"}
          value={formData.serialNo}
          setFormData={setFormData}
        />
        <Input
          textarea={true}
          value={formData.description}
          name={"description"}
          label={"Description"}
          rows={"10"}
          columns={"63"}
          placeHolder={"Enter description here..."}
          setFormData={setFormData}
        />
        <Input
          name={"price"}
          label={"Price"}
          placeHolder={"Enter item price"}
          value={formData.price}
          setFormData={setFormData}
        />
        <Box sx={depriciationDiv}>
          <Input
            name={"currentPrice"}
            label={"Current Price"}
            value={formData.currentPrice}
            divider={false}
            placeHolder={"Enter item's current price"}
            setFormData={setFormData}
          />
          <Button
            sx={depriciationButton}
            variant="contained"
            color="success"
            onClick={calculateDepreciation}
          >
            Calculate Depreciation
          </Button>
        </Box>
        <Input
          label={"Depriciated Price"}
          placeHolder={"calculating....."}
          disable={true}
          value={formData.depriciatedPrice}
          divider={false}
        />
        <Input
          label={"Depriciation Percentage"}
          disable={true}
          placeHolder={"calculating....."}
          value={formData.depreciationPercentage}
        />
      </Box>
    </Box>
  );
};

export default EditItem;

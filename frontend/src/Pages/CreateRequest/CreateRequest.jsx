import { Alert, Box, Button, Divider } from "@mui/material";
import {
  cancelButton,
  dividerStyles,
  headerDiv,
  mainDivStyles,
  saveButton,
} from "./styles";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestTypeOptions } from "../../Constant/dummyData";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../Redux/item/itemAction";
import { createRequest } from "../../Redux/request/requestAction";

const CreateRequest = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    {itemData, requestData} = useSelector((state)=>state),
    [requestType, setRequestType] = useState(""),
    [error, setError] = useState(),
    [formData, setFormData] = useState({
      description: "",
      type: "",
      itemId: ""
    });

    useEffect(()=>{
      if(requestData.error){
        setError(requestData.error)
      }
      else if (requestData.createdRequest){
        navigate(-1)
      }
    },[dispatch, requestData])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRequest(formData))
  };
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
          form={"request-form"}
          type="submit"
        >
          Save
        </Button>
      </Box>
      <Divider sx={dividerStyles} />
      <Alert severity="error">{error}</Alert>
      <Box component="form" onSubmit={handleSubmit} id="request-form">
      <Select
            label={"Request Type"}
            menuItems={requestTypeOptions}
            defaultValue={requestType}
            value={"type"}
            html={"type"}
            divider={true}
            onChange={(e)=>{setFormData({
                ...formData,
                type: e.target.value
            })
            setRequestType(e.target.value)
            dispatch(getItems(e.target.value))
          }}
        />
        <Select
            label={"Item"}
            defaultValue={formData.itemId}
            menuItems={itemData.items ? itemData.items : []}
            value={"id"}
            html={"name"}
            onChange={(e)=>{setFormData({
                ...formData,
                itemId: e.target.value
            })}}
        />
        <Input
          textarea={true}
          name={"Description"}
          rows={"10"}
          columns={"63"}
          placeHolder={"Enter description here..."}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateRequest;

import { Alert, Box, Button, Divider } from "@mui/material";
import {
  cancelButton,
  dividerStyles,
  headerDiv,
  mainDivStyles,
  saveButton,
} from "./styles";
import Input from "../../Components/Shared/Input/Input";
import Select from "../../Components/Shared/Select/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestTypeOptions } from "../../Constant/tablesData";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../Redux/item/itemAction";
import { createRequest } from "../../Redux/request/requestAction";

const CreateRequest = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    { itemData, requestData } = useSelector((state) => state),
    [requestType, setRequestType] = useState(""),
    [error, setError] = useState(),
    [formData, setFormData] = useState({
      description: "",
      type: "",
      itemId: "",
    });

  useEffect(() => {
    if (requestData.error) {
      setError(requestData.error);
    } else if (requestData.createdRequest) {
      navigate(-1);
    }
  }, [dispatch, requestData]);

  const handleRequestTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
    setRequestType(e.target.value);
    dispatch(getItems(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRequest(formData));
    navigate(-1)
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
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} id="request-form">
        <Select
          label={"Request Type"}
          menuItems={requestTypeOptions}
          defaultValue={requestType}
          value={"type"}
          html={"type"}
          divider={true}
          onChange={handleRequestTypeChange}
        />
        <Select
          label={"Item"}
          name={"itemId"}
          defaultValue={formData.itemId}
          menuItems={itemData.items ? itemData.items : []}
          value={"id"}
          html={"name"}
          setFormData={setFormData}
          formData={formData}
        />
        <Input
          textarea={true}
          name={"description"}
          label={"Description"}
          rows={"10"}
          columns={"63"}
          placeHolder={"Enter description here..."}
          setFormData={setFormData}
          formData={formData}
        />
      </Box>
    </Box>
  );
};

export default CreateRequest;

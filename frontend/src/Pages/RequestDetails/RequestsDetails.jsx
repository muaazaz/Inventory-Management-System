import { Box, Button, Divider, Typography } from "@mui/material";
import {
  acceptButton,
  headerDiv,
  headerText,
  main,
  pendingStyles,
  rejectButton,
  userText,
} from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewImage from "../../Components/Shared/ViewImage/ViewImage";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRequest, getRequestDetails } from "../../Redux/request/requestAction";
import { Role } from "../../Constant/componentConstants";

const RequestDetails = () => {
  let ignoreArray = ["id", "submission_date", "status", "user"];
  const navigate = useNavigate(),
    { id } = useParams(),
    dispatch = useDispatch(),
    { requestData, userValidation } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getRequestDetails(id));
  }, [dispatch]);
  return (
    <>
      {requestData.requestDetail && (
        <Box sx={main}>
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
            <Typography sx={headerText} variant="content">
              {`Request ID: ${requestData.requestDetail.id}`}
            </Typography>
            <Typography sx={pendingStyles}>
              {requestData.requestDetail.status}
            </Typography>
            <Typography variant="content">
              Submission Date: {requestData.requestDetail.submission_date}
            </Typography>
            {userValidation.role !== Role.Employee &&
              (
                <>
                  <Button
                    variant="contained"
                    sx={rejectButton}
                    color="error"
                    disabled={requestData.requestDetail.status !== "Pending"}
                    onClick={()=>{
                      dispatch(editRequest({id, formData:{status: "Rejected"}}))
                      navigate(-1)
                    }}
                  >
                    Reject Request
                  </Button>
                  <Button
                    variant="contained"
                    sx={acceptButton}
                    color="success"
                    disabled={requestData.requestDetail.status !== "Pending"}
                    onClick={()=>{
                      dispatch(editRequest({id, formData:{status: "Approved"}}))
                      navigate(-1)
                    }}
                  >
                    Approve Request
                  </Button>
                </>
              )}
          </Box>
          <Divider sx={{ mb: 3, mt: 3 }} />
          {Object.entries(requestData.requestDetail).map(([key, val], i) => (
            <Box key={i}>
              {!ignoreArray.includes(key) && (
                <ViewContent label={key} detail={val} divider={true} />
              )}
            </Box>
          ))}
          {userValidation.role !== Role.Employee && (
            <>
              <Typography variant="content" sx={userText}>
                Request Submitted By
              </Typography>
              <ViewImage
                image={requestData.requestDetail.user.photo}
                name={requestData.requestDetail.user.name}
                details={[
                  `Department: ${requestData.requestDetail.user.department}`,
                  requestData.requestDetail.user.email,
                  requestData.requestDetail.user.contactNo,
                ]}
                divider={true}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default RequestDetails;

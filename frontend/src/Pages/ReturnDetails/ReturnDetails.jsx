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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  editRequest,
  getRequestDetails,
} from "../../Redux/request/requestAction";

const ReturnDetails = () => {
  let ignoreArray = ["id", "submission_date", "status", "user"];
  const navigate = useNavigate(),
    { id } = useParams(),
    dispatch = useDispatch(),
    { requestDetail } = useSelector((state) => state.requestData);

  useEffect(() => {
    dispatch(getRequestDetails(id));
  }, [dispatch]);

  return (
    <>
      {requestDetail && (
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
              {`Return ID: ${requestDetail.id}`}
            </Typography>
            <Typography sx={pendingStyles}>{requestDetail.status}</Typography>
            <Typography variant="content">
              Submission Date: {requestDetail.submission_date}
            </Typography>
            <Button
              variant="contained"
              sx={rejectButton}
              color="warning"
              disabled={requestDetail.status !== "Pending"}
              onClick={() => {
                dispatch(
                  editRequest({
                    id,
                    formData: { returnStatus: "Repair", status: "Approved" },
                  })
                );
                navigate(-1);
              }}
            >
              Mark As Repair
            </Button>
            <Button
              variant="contained"
              sx={acceptButton}
              color="success"
              disabled={requestDetail.status !== "Pending"}
              onClick={() => {
                dispatch(
                  editRequest({
                    id,
                    formData: { returnStatus: "Replace", status: "Approved" },
                  })
                );
                navigate(-1);
              }}
            >
              Mark As Replace
            </Button>
          </Box>
          <Divider sx={{ mb: 3, mt: 3 }} />
          {Object.entries(requestDetail).map(([key, val], i) => (
            <Box key={i}>
              {!ignoreArray.includes(key) && (
                <ViewContent label={key} detail={val} divider={true} />
              )}
            </Box>
          ))}
          <Typography variant="content" sx={userText}>
            Return Submitted By
          </Typography>
          <ViewImage
            name={requestDetail.user.name}
            image={requestDetail.user.photo}
            details={[
              `Department: ${requestDetail.user.department}`,
              requestDetail.user.email,
              requestDetail.user.contactNo,
            ]}
            divider={true}
          />
        </Box>
      )}
    </>
  );
};

export default ReturnDetails;

import { Box, Button, Divider, Typography } from "@mui/material";
import {
  complaintMainStyles,
  complaintButton,
  complaintViewText,
  complaintViewHeader,
  complaintUserText,
  attachmentsContent,
  complaintAttachmentDiv,
  pendingStyles,
  dateStyles,
  attachmentText,
} from "./styles";
import queryString from "query-string";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewImage from "../../Components/Shared/ViewImage/ViewImage";
import ViewContent from "../../Components/Shared/ViewContent/ViewContent";
import "./complaintDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editComplaint,
  getComplaintDetails,
} from "../../Redux/complaint/complaintAction";

const ComplaintDetails = () => {
  const navigate = useNavigate(),
    { userValidation, complaintData } = useSelector((state) => state),
    dispatch = useDispatch(),
    { id } = useParams(),
    { type } = queryString.parse(window.location.search);

  const handleClick = () => {
    dispatch(editComplaint({ id, formData: { status: "Resolved" } }));
  };
  useEffect(() => {
    dispatch(getComplaintDetails(id));
  }, [dispatch]);
  return (
    <Box sx={complaintMainStyles}>
      {complaintData.complaintDetails && (
        <>
          <Box sx={complaintViewHeader}>
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
            <Typography sx={complaintViewText} variant="content">
              {`COMPLAINT ID: ${complaintData.complaintDetails.id}`}
            </Typography>
            <Typography sx={dateStyles} variant="content">
              {`Submission Date: ${complaintData.complaintDetails.created_at}`}
            </Typography>
            <Typography sx={pendingStyles}>
              {complaintData.complaintDetails.status}
            </Typography>
            {type !== "own" &&
              complaintData.complaintDetails.status === "Pending" && (
                <Button
                  variant="contained"
                  sx={complaintButton}
                  color="success"
                  onClick={handleClick}
                >
                  mark as resolved
                </Button>
              )}
          </Box>
          <Divider sx={{ mb: 3, mt: 3 }} />
          <ViewContent
            label={"Description"}
            detail={complaintData.complaintDetails.description}
          />
          <Box sx={attachmentsContent}>
            <Typography variant="content" sx={attachmentText}>
              Attachments
            </Typography>
            <Box sx={complaintAttachmentDiv}>
              {complaintData.complaintDetails.photos.length > 0 ? (
                complaintData.complaintDetails.photos.map((image, i) => (
                  <img key={i} src={image} alt="" className="attachments" />
                ))
              ) : (
                <Typography variant="content" color="error">
                  There are no attachments attached
                </Typography>
              )}
            </Box>
          </Box>
          {type !== 'own' && (
            <>
              <Typography variant="content" sx={complaintUserText}>
                Complaint Submitted By
              </Typography>
              <ViewImage
                name={complaintData.complaintDetails.user.name}
                details={[
                  complaintData.complaintDetails.user.email,
                  complaintData.complaintDetails.user.contactNo,
                ]}
                image={complaintData.complaintDetails.user.photo}
                divider={true}
              />
            </>
          )}
          {userValidation.role !== "employee" &&
            userValidation.role !== "admin" && (
              <>
                <Typography variant="content" sx={complaintUserText}>
                  Organization
                </Typography>
                <ViewImage
                  name={complaintData.complaintDetails.user.orgName}
                  details={[complaintData.complaintDetails.user.orgEmail]}
                  image={complaintData.complaintDetails.user.orgPhoto}
                  divider={true}
                />
              </>
            )}
        </>
      )}
    </Box>
  );
};

export default ComplaintDetails;
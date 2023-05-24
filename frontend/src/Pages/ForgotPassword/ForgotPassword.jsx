import {
  Alert,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentDiv, logo, mainDiv } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { generateOtp, updatePassword } from "../../Redux/user/userAction";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
      email: "",
      otp: "",
      newPassword: "",
    }),
    [step, setStep] = useState(0),
    [btnText, setBtnText] = useState("Send Otp"),
    [error, setError] = useState(""),
    [validOtp, setValidOtp] = useState(false),
    [disable, setDisable] = useState(false),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { otp } = useSelector((state) => state.userValidation);

  const handleClick = () => {
    switch (step) {
      case 0:
        dispatch(generateOtp({email: formData.email}))
        setBtnText("Verify Otp");
        setStep(step + 1);
        break;
      case 1:
        if (!validOtp) {
          setError("Please Enter a valid Otp");
        } else {
          setBtnText("Change Password");
          setDisable(true);
          setStep(step + 1);
        }
        break;
      case 2:
        dispatch(updatePassword(formData))
        navigate("/login");
        break;

      default:
        break;
    }
  };

  return (
    <Box sx={mainDiv}>
      <Avatar sx={logo} src="/gigalabs.png" variant="rounded" />
      <Box sx={contentDiv}>
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Password Recovery
        </Typography>
        <Typography
          sx={{ color: "gray", textAlign: "center" }}
          variant="caption"
          noWrap
        >
          Enter your email address to verify and change password
        </Typography>
        <TextField
          sx={{ width: "80%", m: 1 }}
          label="Email"
          placeholder="Enter your Email address"
          value={formData.email}
          disabled={step >= 1}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.currentTarget.value,
            });
          }}
        ></TextField>
        {step >= 1 && (
          <TextField
            sx={{ width: "80%", m: 1 }}
            label="Otp"
            placeholder="Enter otp sent to your email"
            defaultValue={""}
            disabled={step >= 2}
            onChange={(e) => {
                setValidOtp(otp === e.target.value);
                setFormData({
                  ...formData,
                  otp: e.target.value,
                });
                setError("");
            }}
          ></TextField>
        )}
        {step === 2 && validOtp && (
          <>
            <TextField
              sx={{ width: "80%", m: 1 }}
              type="password"
              label="New Password"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                });
              }}
            ></TextField>
            <TextField
              sx={{ width: "80%", m: 1 }}
              label="Confirm Password"
              type="password"
              placeholder="Enter the password exactly as above"
              defaultValue={""}
              onChange={(e) => {
                if (formData.newPassword !== e.target.value) {
                  setError("Both passwords must be same");
                  setDisable(true);
                } else {
                  setError("");
                  setDisable(false);
                }
              }}
            ></TextField>
          </>
        )}
        <Button
          color="success"
          sx={{ width: "80%", backgroundColor: "#00A572", m: 1 }}
          variant="contained"
          disabled={disable}
          onClick={handleClick}
        >
          {btnText}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Typography
        sx={{ color: "gray", textAlign: "center" }}
        variant="p"
        noWrap
      >
        Change Email Address?{" "}
        <Button
          onClick={() => {
            setStep(0);
          }}
        >
          Change
        </Button>
        <Button></Button>
      </Typography>
    </Box>
  );
};

export default ForgotPassword;

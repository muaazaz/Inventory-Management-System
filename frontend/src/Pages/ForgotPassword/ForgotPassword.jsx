import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentDiv, logo, mainDiv } from "./styles";
const ForgotPassword = () => {
  const otp = "784RE1";
  const [formData, setFormData] = useState({
      email: "",
      newPassword: "",
    }),
    [step, setStep] = useState(0),
    [btnText, setBtnText] = useState("Send Otp"),
    [error, setError] = useState(""),
    [validOtp, setValidOtp] = useState(false),
    [disable, setDisable] = useState(""),
    navigate = useNavigate();

  const handleClick = () => {
    console.log(step);
    switch (step) {
      case 0:
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
          sx={{ width: "80%" }}
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
            sx={{ width: "80%" }}
            label="Otp"
            placeholder="Enter otp sent to you email"
            defaultValue={""}
            disabled={step >= 2}
            onChange={(e) => {
              setError("");
              setValidOtp(otp === e.target.value);
            }}
          ></TextField>
        )}
        {step === 2 && validOtp && (
          <>
            <TextField
              sx={{ width: "80%" }}
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
              sx={{ width: "80%" }}
              label="Confirm Password"
              placeholder="Enter the password exactly as above"
              defaultValue={""}
              onChange={(e) => {
                if (formData.newPassword !== e.target.value) {
                  setError("Both passwords must be same");
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
          sx={{ width: "80%", backgroundColor: "#00A572" }}
          variant="contained"
          disabled={disable}
          onClick={handleClick}
        >
          {btnText}
        </Button>
        {error && <Typography>{error}</Typography>}
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
      </Typography>
    </Box>
  );
};

export default ForgotPassword;

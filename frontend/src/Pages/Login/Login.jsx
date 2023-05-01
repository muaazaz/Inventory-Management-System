import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { logIn } from "../../Redux/user/userAction";
const Login = () => {
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    }),
    [error, setError] = useState(""),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    data = useSelector((state) => state.userValidation);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formData));
  };
  useEffect(() => {
    if (data.error) {
      setError(data.error);
    } else if(data.token) {
      navigate("/")
    }
  }, [data]);
  return (
    <div className="login-main">
      <img className="login-logo" src="gigalabs.png" alt="" />
      <Box
        sx={{
          width: { md: "35%", xs: "100%" },
          boxShadow: { md: "1px 0px 10px 1px grey", xs: "none" },
        }}
        component="form"
        className="login-form"
        onSubmit={handleFormSubmit}
      >
        <Typography sx={{ textAlign: "center" }} variant="h3">
          Welcome Back!
        </Typography>
        <Typography
          sx={{ color: "gray", textAlign: "center" }}
          variant="caption"
          noWrap
        >
          Enter your credentials to access your account.
        </Typography>
        <TextField
          sx={{ width: "80%" }}
          label="Email"
          placeholder="Enter your Email address"
          value={formData.email}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.currentTarget.value,
            });
          }}
        ></TextField>
        <TextField
          sx={{ width: "80%" }}
          type="password"
          label="Password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={(e) => {
            setError("")
            setFormData({
              ...formData,
              password: e.currentTarget.value,
            });
          }}
        ></TextField>
        <Button
          type="submit"
          color="success"
          sx={{ width: "80%", backgroundColor: "#00A572" }}
          variant="contained"
        >
          Sign In
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Typography
        sx={{ color: "gray", textAlign: "center" }}
        variant="p"
        noWrap
      >
        Forgot your Password ? <Link to="/forgot/password">Reset Password</Link>
      </Typography>
    </div>
  );
};

export default Login;

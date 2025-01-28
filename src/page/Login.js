import React, { useEffect, useState } from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/system";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import CustomizedSnackbars from "../component/Snackbar/Snackbar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t, i18n } = useTranslation();
  const isMobileView = useMediaQuery('(max-width:768px)');
  const header_styles = {
    nav_link_font: {
      color: "black",
      fontFamily: "Poppins",
      cursor: "pointer",
    },
    img_box: {
      width: "100px",
      height: "100%",
      marginLeft: "1rem",
    },
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  //const [openDialog, setOpenDialog] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   const getAuthHeader = (username, password) => {
  //     const token = btoa(`${username}:${password}`);
  //     return `Basic ${token}`;
  //   };

  const handleLogin = async () => {
    if (!userName.trim() || !password.trim()) {
      setOpen(true);
      setSeverity("warning");
      setMessage("Please fill out both username and password.");
      return;
    }

    const baseURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/authenticate`;
    try {
      const response = await axios.post(baseURL, {
        username: userName,
        password: password,
      });

      const token = response.data;
      console.log(token);
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: decodedToken.sub,
          role: decodedToken.roles,
        })
      );

      //setIsLoggedIn(true);
      // Redirect to dashboard or another page
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setOpen(true);
      setSeverity("error");
      setMessage(error.response?.data || error.message);
      //setIsLoggedIn(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <CustomizedSnackbars
        message={message}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
      <Box className="login-container">
        <Box className="login-form">
          <Grid container xs={12} direction="row"></Grid>
          <Box className="username-container">
            <TextField
              required
              id="username"
              label={t("username")}
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="login-input"
            />
          </Box>
          <Box className="password-container">
            <TextField
              required
              id="password"
              label={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              className="login-input"
            />
            <IconButton onClick={togglePasswordVisibility} className="icon">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>
          <Box className="remember-forgot-container">
            <FormControlLabel
              control={<Checkbox id="remember-me" />}
              label={t("rememberMe")}
              className="remember-me"
            />
          </Box>
          <Box>
            <Button
              aria-label="Login"
              onClick={handleLogin}
              className="login-button"
              style={{
                paddingLeft: "11rem",
                paddingRight: "10rem",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                color: "black",
                backgroundColor: "yellow",
              }}
            >
              {t("login")}
            </Button>
          </Box>
          <Box className="language-switch">
            <Button onClick={() => handleLanguageChange("en")}>English</Button>
            <Button onClick={() => handleLanguageChange("es")}>Español</Button>
          </Box>
        </Box>
        <Box className="login-image">
          <img
            src={process.env.PUBLIC_URL + "loginpage.jpg"}
            alt="Logo"
            className="logo"
          />
        </Box>
      </Box>
    </>
  );
};
export default Login;

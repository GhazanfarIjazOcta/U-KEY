import {
    Box,
    Button,
    Checkbox,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import LoginImg from "../../../assets/Registration/Login.png";

import Ukeylogo from "../../../assets/Registration/UkeyLogo.png";
import GoogleLogo from "../../../assets/Registration/Google.svg";
import { useNavigate } from "react-router-dom";
import { RegistrationStyles } from "../../UI/Styles";
import "../../UI/Styles.css"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Login() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [slideRight, setSlideRight] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    const signupNavigation = () => {
        setSlideRight(true); // Start the slide animation

        // Introduce a delay of 500ms (0.5 seconds) before navigating to the next route
        setTimeout(() => {
            navigate("/signup"); // Perform the navigation after the animation completes
        }, 500); // Delay matches the CSS animation duration
    };
    return (
        <Box sx={{
            backgroundImage: `url(${LoginImg})`,
            backgroundSize: "cover", // Ensures the image covers the whole area
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents tiling the image
            height: "100vh", // Ensures the box takes full viewport height
            width: "100vw"
        }} >
            <Box
                className={`sliding-box ${slideRight ? 'slide-right' : ''}`}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"

                sx={{ width: { lg: "45%", md: "50%", sm: "100%", xs: "100%" }, opacity: "95%", background: "#FFF", height: "100vh", }} >
                <Box sx={{ paddingBottom: "2.5rem", }}>
                    <img src={Ukeylogo} height={"70px"} width={"143px"} />
                </Box>

                <Typography
                    variant="h1"
                    mt={"1em"}
                    sx={{ fontWeight: 600, fontSize: "1.675rem", fontFamily: "Inter", color: "#14181F", }}
                >
                    Login
                </Typography>
                <Typography
                    mt="1.6em" sx={{ fontSize: "1rem", fontFamily: "Inter", color: "#14181F", textAlign: "center" }} >
                    If you don't have an account register
                </Typography>
                <Stack direction={"row"} gap={2}>
                    <Typography
                        color={"#F38712"}
                        style={{
                            fontWeight: 600,
                            fontSize: "1rem",
                            fontFamily: "Inter",
                            cursor: "pointer",
                        }}
                        onClick={signupNavigation}
                    >
                        Register here !
                    </Typography>
                </Stack>
                <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", pt: "1.5rem" }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            fontFamily: "Inter",
                            color: "#14181F",
                        }}
                    >
                        E-mail/Phone Number
                    </Typography>
                    <TextField
                        sx={RegistrationStyles.textField}
                        fullWidth
                        size="small"
                        placeholder="Enter your email or phone number"
                    />
                </Box>
                <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", position: "relative" }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 500, fontSize: "0.8rem",
                            fontFamily: "Inter",
                            color: "#14181F",
                        }}
                    >
                        Password
                    </Typography>
                    <TextField sx={RegistrationStyles.textField} fullWidth size="small" placeholder="Enter your password" type={passwordVisible ? 'text' : 'password'} />
                    <Box
                        sx={RegistrationStyles.passwordEyeBox}
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: { xs: "80%", sm: "60%" },
                        maxWidth: "370px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Stack direction={"row"} alignItems={"center"}>
                        <Checkbox size="small" />
                        <Typography
                            color={"#14181F"}
                            style={{
                                fontWeight: 300,
                                fontFamily: "Poppins",
                                fontSize: "0.75rem",
                            }}
                        >
                            Remember me
                        </Typography>
                    </Stack>
                    <Typography
                        color={"#6F7C8E"}
                        style={{
                            fontWeight: 300,
                            fontFamily: "Poppins",
                            fontSize: "0.75rem",
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        width: { xs: "80%", sm: "60%" },
                        maxWidth: "370px",
                        height: "3.1rem",
                        backgroundColor: "#212122;",
                        color: "white",
                        marginTop: "1.8em",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#212122",
                        },
                    }}
                    onClick={() => navigate("/home")}
                >
                    Login
                </Button>
                <Typography
                    variant="body1"
                    mt={2}
                    mb={1}
                    color={"#6F7C8E"}
                    style={{
                        fontWeight: 500,
                        fontSize: "1rem",
                        fontFamily: "Poppins",
                        cursor: "pointer",
                        marginTop: "2rem"
                    }}
                >
                    or continue with
                </Typography>
                <Stack mt={1} >
                    <img src={GoogleLogo} />
                </Stack>
            </Box>
        </Box >
    );
}

export default Login;

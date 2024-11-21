// import {
//     Box,
//     Button,
//     Checkbox,
//     Stack,
//     TextField,
//     Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import LoginImg from "../../../assets/Registration/Login.png";

// import Ukeylogo from "../../../assets/Registration/UkeyLogoRegistration.png";
// import GoogleLogo from "../../../assets/Registration/Google.svg";
// import { useNavigate } from "react-router-dom";
// import { RegistrationStyles } from "../../UI/Styles";
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


// import {auth} from "../../../firebase"
// import { getAuth } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth";

// function Signup() {
//     const navigate = useNavigate();
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [slideLeft, setSlideLeft] = useState(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     const toggleConfirmPasswordVisibility = () => {
//         setConfirmPasswordVisible(!confirmPasswordVisible);
//     };

//     const loginNavigation = () => {
//         setSlideLeft(true); // Start the slide animation

//         // Introduce a delay of 500ms (0.5 seconds) before navigating to the next route
//         setTimeout(() => {
//             navigate("/login"); // Perform the navigation after the animation completes
//         }, 500); // Delay matches the CSS animation duration
//     };

//     return (
//         <Box sx={{
//             backgroundImage: `url(${LoginImg})`,
//             backgroundSize: "cover", // Ensures the image covers the whole area
//             backgroundPosition: "center", // Centers the image
//             backgroundRepeat: "no-repeat", // Prevents tiling the image
//             display: "flex",
//             justifyContent: "flex-end",
//             height: "100%",
//             minHeight: "100vh", // Ensures the box takes full viewport height
//             width: "100vw"
//         }} >
//             <Box
//                 className={`sliding-box ${slideLeft ? 'slide-left' : ''}`}
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 sx={{ width: { lg: "45%", md: "50%", sm: "100%", xs: "100%" }, opacity: "95%", background: "#F5F7F9", height: "100vh" }}

//             >
//                 <Box sx={{ paddingBottom: { md: "1.5rem", sm: "1rem", xs: "0.5rem" }, paddingTop: "0rem" }}>
//                     <img src={Ukeylogo} height={"70px"} width={"143px"} />
//                 </Box>

//                 <Typography
//                     variant="h1"
//                     mt={"1em"}
//                     sx={{ fontWeight: 600, fontSize: "1.675rem", fontFamily: "Inter", color: "#14181F", }}
//                 >
//                     Register
//                 </Typography>
//                 <Stack direction={{ xs: "column", sm: "row" }} gap={"3px"} mt={1}>
//                     <Typography
//                         sx={{
//                             fontFamily: "Inter",
//                             color: "#14181F",
//                             textAlign: "center",
//                         }}
//                     >
//                         Already have an account?
//                     </Typography>
//                     <Typography
//                         color={"#F38712"}
//                         style={{
//                             fontWeight: 600,
//                             fontFamily: "Inter",
//                             cursor: "pointer",
//                             textAlign: "center",
//                         }}
//                         onClick={loginNavigation}
//                     >
//                         Login here
//                     </Typography>
//                 </Stack>
//                 <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", pt: "1.5rem" }}>
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             fontWeight: 500,
//                             fontSize: "0.8rem",
//                             fontFamily: "Inter",
//                             color: "#14181F",
//                         }}
//                     >
//                         Full Name
//                     </Typography>
//                     <TextField
//                         sx={RegistrationStyles.textField}
//                         fullWidth
//                         size="small"
//                         placeholder="Enter your full name"
//                     />
//                 </Box>
//                 <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px" }}>
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             fontWeight: 500, fontSize: "0.8rem",
//                             fontFamily: "Inter",
//                             color: "#14181F",
//                         }}
//                     >
//                         E-mail
//                     </Typography>
//                     <TextField sx={RegistrationStyles.textField} fullWidth size="small" placeholder="Enter your email" />
//                 </Box>
//                 <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px" }}>
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             fontWeight: 500, fontSize: "0.8rem",
//                             fontFamily: "Inter",
//                             color: "#14181F",
//                         }}
//                     >
//                         Phone Number
//                     </Typography>
//                     <TextField sx={RegistrationStyles.textField} fullWidth size="small" placeholder="Enter your Phone number" />
//                 </Box>
//                 <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", position: "relative" }}>
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             fontWeight: 500, fontSize: "0.8rem",
//                             fontFamily: "Inter",
//                             color: "#14181F",
//                         }}
//                     >
//                         Password
//                     </Typography>


//                     <TextField sx={RegistrationStyles.textField} fullWidth size="small" placeholder="Enter your password" type={passwordVisible ? 'text' : 'password'} />
//                     <Box
//                         sx={RegistrationStyles.passwordEyeBox}
//                         onClick={togglePasswordVisibility}
//                     >
//                         {passwordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
//                     </Box>
//                 </Box>
//                 <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", position: "relative" }}>
//                     <Typography
//                         variant="subtitle1"
//                         sx={{
//                             fontWeight: 500, fontSize: "0.8rem",
//                             fontFamily: "Inter",
//                             color: "#14181F",
//                         }}
//                     >
//                         Confirm Password
//                     </Typography>

//                     <TextField sx={RegistrationStyles.textField} fullWidth size="small" placeholder="Confirm your password" type={confirmPasswordVisible ? 'text' : 'password'} />
//                     <Box
//                         sx={RegistrationStyles.passwordEyeBox}
//                         onClick={toggleConfirmPasswordVisibility}
//                     >
//                         {confirmPasswordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
//                     </Box>
//                 </Box>

//                 <Button
//                     variant="contained"
//                     sx={{
//                         width: { xs: "80%", sm: "60%" },
//                         maxWidth: "370px",
//                         height: "3.1rem",
//                         backgroundColor: "#212122;",
//                         color: "white",
//                         marginTop: "1.8em",
//                         textTransform: "none",
//                         "&:hover": {
//                             backgroundColor: "#212122",
//                         },
//                     }}
//                     onClick={() => navigate("/dashboard")}
//                 >
//                     Register
//                 </Button>
//                 <Typography
//                     variant="body1"
//                     mt={2}
//                     mb={1}
//                     color={"#6F7C8E"}
//                     sx={{
//                         fontWeight: 500,
//                         fontSize: "1rem",
//                         fontFamily: "Poppins",
//                         cursor: "pointer",
//                         marginTop: { md: "1.5rem", sm: "1rem", xs: "0.5rem" }
//                     }}
//                 >
//                     or continue with
//                 </Typography>
//                 <Stack mt={1} >
//                     <img src={GoogleLogo} />
//                 </Stack>
//             </Box>
//         </Box>
//     );
// }

// export default Signup;











import React, { useState } from "react";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from "react-router-dom";

import { auth, rtdb } from "../../../firebase"; // Import Realtime Database (rtdb)
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; // Realtime Database functions

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organizationName: "",
        organizationAddress: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState("");

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        const { name, email, phone, organizationName, organizationAddress, password, confirmPassword } = formData;
    
        if (!name || !email || !phone || !organizationName || !organizationAddress || !password) {
            setError("All fields are required.");
            return;
        }
    
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
    
        setLoading(true); // Show loading indicator
    
        try {
            // Register user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
            // Store additional user data in Realtime Database
            const userData = {
                name,
                email,
                phone,
                organizationName,
                organizationAddress,
                status: "inactive",  // Set status here if required
                role: "admin",
            };
    
            // Save user data in the Realtime Database
            const userRef = ref(rtdb, 'users/' + userCredential.user.uid);
            await set(userRef, userData);
            
            // Navigate to dashboard on success
            alert("Registration successful!");
            navigate("/dashboard");
        } catch (err) {
            setError("Registration failed. Please try again.");
            console.error("Registration error: ", err);
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ backgroundColor: "#f5f7f9", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Box sx={{ width: "400px", padding: "2rem", background: "#ffffff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    Register
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Organization Name"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Organization Address"
                        name="organizationAddress"
                        value={formData.organizationAddress}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <VisibilityOutlinedIcon
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: "pointer" }}
                                />
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={confirmPasswordVisible ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <VisibilityOutlinedIcon
                                    onClick={toggleConfirmPasswordVisibility}
                                    style={{ cursor: "pointer" }}
                                />
                            ),
                        }}
                    />
                </Stack>
                {error && (
                    <Typography color="error" mt={2} textAlign="center">
                        {error}
                    </Typography>
                )}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </Box>
        </Box>
    );
}

export default Signup;

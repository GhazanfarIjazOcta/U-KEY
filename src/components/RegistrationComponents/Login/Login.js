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
// import "../../UI/Styles.css"
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// function Login() {
//     const navigate = useNavigate();
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [slideRight, setSlideRight] = useState(false);
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };



//     const signupNavigation = () => {
//         setSlideRight(true); // Start the slide animation

//         // Introduce a delay of 500ms (0.5 seconds) before navigating to the next route
//         setTimeout(() => {
//             navigate("/signup"); // Perform the navigation after the animation completes
//         }, 500); // Delay matches the CSS animation duration
//     };
//     return (
//         <Box sx={{
//             backgroundImage: `url(${LoginImg})`,
//             backgroundSize: "cover", // Ensures the image covers the whole area
//             backgroundPosition: "center", // Centers the image
//             backgroundRepeat: "no-repeat", // Prevents tiling the image
//             height: "100vh", // Ensures the box takes full viewport height
//             width: "100vw"
//         }} >
//             <Box
//                 className={`sliding-box ${slideRight ? 'slide-right' : ''}`}
//                 display="flex"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"

//                 sx={{ width: { lg: "45%", md: "50%", sm: "100%", xs: "100%" }, opacity: "95%", background: "#F5F7F9", height: "100vh", }} >
//                 <Box sx={{ paddingBottom: "2.5rem", }}>
//                     <img src={Ukeylogo} height={"70px"} width={"143px"} />
//                 </Box>

//                 <Typography
//                     variant="h1"
//                     mt={"1em"}
//                     sx={{ fontWeight: 600, fontSize: "1.675rem", fontFamily: "Inter", color: "#14181F", }}
//                 >
//                     Login
//                 </Typography>
//                 <Typography
//                     mt="1.6em" sx={{ fontSize: "1rem", fontFamily: "Inter", color: "#14181F", textAlign: "center" }} >
//                     If you don't have an account register
//                 </Typography>
//                 <Stack direction={"row"} gap={2}>
//                     <Typography
//                         color={"#F38712"}
//                         style={{
//                             fontWeight: 600,
//                             fontSize: "1rem",
//                             fontFamily: "Inter",
//                             cursor: "pointer",
//                         }}
//                         onClick={signupNavigation}
//                     >
//                         Register here !
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
//                         E-mail/Phone Number
//                     </Typography>
//                     <TextField
//                         sx={RegistrationStyles.textField}
//                         fullWidth
//                         size="small"
//                         placeholder="Enter your email or phone number"
//                     />
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

//                 <Box
//                     sx={{
//                         width: { xs: "80%", sm: "60%" },
//                         maxWidth: "370px",
//                         alignItems: "center",
//                         display: "flex",
//                         justifyContent: "space-between",
//                     }}
//                 >
//                     <Stack direction={"row"} alignItems={"center"}>
//                         <Checkbox size="small" />
//                         <Typography
//                             color={"#14181F"}
//                             style={{
//                                 fontWeight: 300,
//                                 fontFamily: "Poppins",
//                                 fontSize: "0.75rem",
//                             }}
//                         >
//                             Remember me
//                         </Typography>
//                     </Stack>
//                     <Typography
//                         color={"#6F7C8E"}
//                         style={{
//                             fontWeight: 300,
//                             fontFamily: "Poppins",
//                             fontSize: "0.75rem",
//                         }}
//                     >
//                         Forgot Password ?
//                     </Typography>
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
//                     onClick={() => navigate("/home")}
//                 >
//                     Login
//                 </Button>
//                 <Typography
//                     variant="body1"
//                     mt={2}
//                     mb={1}
//                     color={"#6F7C8E"}
//                     style={{
//                         fontWeight: 500,
//                         fontSize: "1rem",
//                         fontFamily: "Poppins",
//                         cursor: "pointer",
//                         marginTop: "2rem"
//                     }}
//                 >
//                     or continue with
//                 </Typography>
//                 <Stack mt={1} >
//                     <img src={GoogleLogo} />
//                 </Stack>
//             </Box>
//         </Box >
//     );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, rtdb, ref, get, onAuthStateChanged } from "../../../firebase";
import LoginImg from "../../../assets/Registration/Login.png";
import Ukeylogo from "../../../assets/Registration/UkeyLogoRegistration.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { RegistrationStyles } from "../../UI/Styles";
import "../../UI/Styles.css";

import { useUser } from "../../../Context/UserContext"; // Import your UserContext


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { updateUserData } = useUser(); // Context to manage user data
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [cureentOrganisatiionID , setCureentOrganisatiionID] = useState(5)
    console.log("current org id is ", cureentOrganisatiionID)
  
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  
    // Restore session on component mount
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const storedData = localStorage.getItem("user");
          if (storedData) {
            const userData = JSON.parse(storedData);


            redirectToDashboard(userData.role );
          }
        }
      });
      return () => unsubscribe();
    }, []);
  
    // If no user is logged in, clear session and redirect to login
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          localStorage.removeItem('user');
          navigate("/login");
        }
      });
      return () => unsubscribe();
    }, []);
  
    const getUserData = async (userId, organizationId) => {
        const userRef = ref(rtdb, `organizations/${organizationId}/users/${userId}`);
        try {
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                console.log("Fetched user data:", snapshot.val());
                return snapshot.val(); // Return the user data (email, role, organizationID, etc.)
            } else {
                console.warn("User data does not exist for UID:", userId);
                return null; // Return null if no data exists
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError("Failed to fetch user data. Please try again later.");
            return null; // Return null if there is an error
        }
    };
    
    
  
    const handleLogin = async () => {
        setLoading(true);
        try {
            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userId = user.uid;
    
            const userRef = ref(rtdb, `organizations`);
            const snapshot = await get(userRef);

          
if (snapshot.exists()) {
    console.log("Snapshot exists:", snapshot.val());
} else {
    console.log("No data found.");
}

            
            if (snapshot.exists()) {
                const organizations = snapshot.val();
            
                // Iterate through all organizations to find the user
                let userOrganizationID = 1;
                let userOrganizationData = null;
            


                for (const orgID in organizations) {
                    const organization = organizations[orgID];
                    const users = organization.users;
                    
                    // console.log(`Checking organization: ${orgID}`);
                    // console.log("Users in this organization:", users);
                     console.log("Users in this organization: []", organization);
                     console.log("Users in this organization: ==> ", userId);
                    
                    if (users && users[userId]) {  // Check if the user exists in the current organization's users
                        console.log(`User ${userId} found in organization ${orgID}`);
                        userOrganizationID = orgID;
                        userOrganizationData = organization;
                        if(userOrganizationData.status == "active"){
                            alert("welcome youre active")
                            
                        }else {
                            alert("youre inactive, Please activate your account")
                            navigate("/login")
                            return;  // Stop further execution and prevent moving forward
                        }
                        break;  // Exit loop once the user is found
                    } else {
                        console.log(`Checking organization: ${userOrganizationID}`);
                    console.log("Users in this organization:", users);
                        console.log(`User ${userId} not found in organization ${orgID}`);
                    }
                }
                

                setCureentOrganisatiionID(userOrganizationID)
                if (userOrganizationID) {
                    // You now have the user’s organization ID and data
                    console.log('User belongs to Organization:', userOrganizationID, userOrganizationData);
                   
                    // Fetch user data from the 'users' node directly using the userOrganizationID
                    const storedUserData = await getUserData(user.uid, userOrganizationID);
                    console.log("Fetched user data:", storedUserData);
                    
                    if (storedUserData && storedUserData.organizationID) {
                        // If organizationID exists, fetch organization-specific data
                        const organizationUserData = await getUserData(user.uid, storedUserData.organizationID);
    
                        if (organizationUserData) {
                            const completeUserData = {
                                uid: user.uid,
                                email: user.email,
                                ...storedUserData,  // From the 'users' node
                                ...organizationUserData, // Additional organization data
                            };
    
                            // Store complete user data in localStorage
                            localStorage.setItem("user", JSON.stringify(completeUserData));
    
                            // Update context with the user data
                            updateUserData(completeUserData);
    
                            // Redirect based on user role
                            redirectToDashboard(storedUserData.role);
                        } else {
                            setError("Organization data not found.");
                        }
                    } else {
                        setError("User data not found or missing organization ID.");
                    }
                } else {
                    setError("User not found in any organization");
                }
            }
    
        } catch (error) {
            handleFirebaseErrors(error);
        } finally {
            setLoading(false);
        }
    };
    
  
    const handleFirebaseErrors = (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(`Error: ${errorCode} - ${errorMessage}`);
    };
  
    const redirectToDashboard = (role) => {
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "operator" || role === "employee") navigate("/employee-dashboard");
      else if(role === "superAdmin") navigate("/dashboard")
        else
            navigate("/dashboard");
    };
  

   

    const signupNavigation = () => navigate("/signup");

    return (
        <Box
            sx={{
                backgroundImage: `url(${LoginImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ width: { lg: "45%", md: "50%", sm: "100%", xs: "100%" }, opacity: "95%", background: "#F5F7F9", height: "100vh" }}
            >
                <Box sx={{ paddingBottom: "2.5rem" }}>
                    <img src={Ukeylogo} height={"70px"} width={"143px"} alt="Logo" />
                </Box>

                <Typography variant="h1" mt={"1em"} sx={{ fontWeight: 600, fontSize: "1.675rem", fontFamily: "Inter", color: "#14181F" }}>
                    Login
                </Typography>
                <Typography mt="1.6em" sx={{ fontSize: "1rem", fontFamily: "Inter", color: "#14181F", textAlign: "center" }}>
                    If you don't have an account register
                </Typography>
                <Stack direction={"row"} gap={2}>
                    <Typography
                        color={"#F38712"}
                        style={{ fontWeight: 600, fontSize: "1rem", fontFamily: "Inter", cursor: "pointer" }}
                        onClick={signupNavigation}
                    >
                        Register here!
                    </Typography>
                </Stack>

                <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", pt: "1.5rem" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: "0.8rem", fontFamily: "Inter", color: "#14181F" }}>
                        E-mail/Phone Number
                    </Typography>
                    <TextField
                        sx={RegistrationStyles.textField}
                        fullWidth
                        size="small"
                        placeholder="Enter your email or phone number"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>

                <Box sx={{ width: { xs: "80%", sm: "60%" }, maxWidth: "370px", position: "relative" }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: "0.8rem", fontFamily: "Inter", color: "#14181F" }}>
                        Password
                    </Typography>
                    <TextField
                        sx={RegistrationStyles.textField}
                        fullWidth
                        size="small"
                        placeholder="Enter your password"
                        type={passwordVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box sx={RegistrationStyles.passwordEyeBox} onClick={togglePasswordVisibility}>
                        {passwordVisible ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        width: { xs: "80%", sm: "60%" },
                        maxWidth: "370px",
                        height: "3.1rem",
                        backgroundColor: "#212122",
                        color: "white",
                        marginTop: "1.8em",
                        textTransform: "none",
                    }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>

                {error && <Typography color="error" variant="body2" sx={{ marginTop: "1rem" }}>{error}</Typography>}
            </Box>
        </Box>
    );
}

export default Login;

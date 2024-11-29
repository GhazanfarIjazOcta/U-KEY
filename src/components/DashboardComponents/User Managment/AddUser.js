// import {
//   Box,
//   Button,
//   IconButton,
//   InputAdornment,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import { loginLeftContentContainerItemWidth } from "../../UI/styles/Login";
// import Arrowdown from "../../../assets/Card/fi_chevron-down.png";
// import { addUserStyles } from "../../UI/Main";

// function AddUser() {
//   return (
//     <Paper sx={addUserStyles.mainContainerStyles}>
//       <Box sx={addUserStyles.container} pl={8}>
//         <Box>
//           <Box sx={loginLeftContentContainerItemWidth}>
//             <Typography
//               variant="subtitle1"
//               mt={4}
//               mb={1}
//               style={{ fontWeight: 500 }}
//             >
//               User Id
//             </Typography>
//             <TextField
//               sx={addUserStyles.textFieldStyles}
//               label="Enter User ID"
//             />
//           </Box>
//           <Box sx={loginLeftContentContainerItemWidth}>
//             <Typography
//               variant="subtitle1"
//               mt={3}
//               mb={1}
//               style={{ fontWeight: 500 }}
//             >
//               Name
//             </Typography>
//             <TextField sx={addUserStyles.textFieldStyles} label="Enter Name" />
//           </Box>
//           <Box sx={loginLeftContentContainerItemWidth}>
//             <Typography
//               variant="subtitle1"
//               mt={3}
//               mb={1}
//               style={{ fontWeight: 500 }}
//             >
//               Email
//             </Typography>
//             <TextField sx={addUserStyles.textFieldStyles} label="Enter Email" />
//           </Box>
//           <Box sx={loginLeftContentContainerItemWidth}>
//             <Typography
//               variant="subtitle1"
//               mt={3}
//               mb={1}
//               style={{ fontWeight: 500 }}
//             >
//               Phone number
//             </Typography>
//             <TextField
//               sx={addUserStyles.textFieldStyles}
//               label="Enter Phone number"
//             />
//           </Box>
//           <Box sx={loginLeftContentContainerItemWidth}>
//             <Typography
//               variant="subtitle1"
//               mt={3}
//               mb={1}
//               style={{ fontWeight: 500 }}
//             >
//               Role
//             </Typography>
//             <TextField
//               placeholder="Select Role"
//               variant="outlined"
//               size="small"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end" sx={{ marginRight: 0 }}>
//                     <IconButton sx={{ padding: 0 }}>
//                       {<img src={Arrowdown} height={"16px"} width={"20px"} />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 "& .MuiInputBase-root": {
//                   height: "50px", // Adjust the height as needed
//                   marginLeft: "5px",
//                 },
//                 width: "35%",
//               }}
//             />
//           </Box>
//           <Box sx={loginLeftContentContainerItemWidth}>
//             <Typography
//               variant="subtitle1"
//               mt={3}
//               mb={1}
//               style={{ fontWeight: 500 }}
//             >
//               Status
//             </Typography>
//             <TextField
//               placeholder="Select Status"
//               variant="outlined"
//               size="small"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end" sx={{ marginRight: 0 }}>
//                     <IconButton sx={{ padding: 0 }}>
//                       {<img src={Arrowdown} height={"16px"} width={"20px"} />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 "& .MuiInputBase-root": {
//                   height: "50px", // Adjust the height as needed
//                   marginLeft: "5px",
//                 },
//                 width: "35%",
//               }}
//             />
//           </Box>
//         </Box>
//         <Stack
//           sx={{
//             gap: "24px",
//           }}
//           mt={6}
//           ml={1}
//         >
//           <Button variant="contained" sx={addUserStyles.buttonStyles}>
//             Add
//           </Button>
//         </Stack>
//       </Box>
//     </Paper>
//   );
// }

// export default AddUser;




import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import {
  auth,
  rtdb,
  createUserWithEmailAndPassword,
  ref,
  set,
  get,
  child,
  update
} from "../../../firebase";


import { useUser } from "../../../Context/UserContext";


function AddUser() {

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    role: "employee", // Default role
    status: "inactive", // Default status
    password: "", // Password field added
  });


  const { user, updateUserData } = useUser(); // Destructure user data from context
  console.log("user organization id in ", user.organizationID);

  const CurrentUserID = user.uid;

  console.log("user current id in ", CurrentUserID);
  const CurrentOrganizationID = user.organizationID;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  // const handleAddUser = async () => {
  //   console.log("Current User UID:", auth.currentUser.uid); // Log to verify if the user is logged in
  //   try {
  //     const loggedInAdminUid = auth.currentUser?.uid;
  
  //     // Verify if admin data exists at the path
  //     const adminRef = ref(rtdb, `organizations/${CurrentOrganizationID}/users/${loggedInAdminUid}`);
  //     const adminSnapshot = await get(adminRef);
  
  //     console.log("Admin Snapshot Key:", adminSnapshot.key);  // Check the key of the snapshot
  //     console.log("Admin Snapshot Data:", adminSnapshot.val());  // Log actual data
  
  //     if (!adminSnapshot.exists()) throw new Error("Admin details not found.");
  //     const adminData = adminSnapshot.val();
  //     console.log("Admin Data:", adminData);  // Log admin data to confirm it's fetched
      
  //     const adminOrgId = adminData.organizationID;  // Extract organization ID from admin data
  
  //     // Sanitize the email to create a valid user ID (replace @ and . with _)
  //     const sanitizedUserId = formData.email.replace(/[@.]/g, '_');
  
  //     // Use formData to populate new user data
  //     const newUser = {
  //       userID: sanitizedUserId,  // Use sanitized email for user ID
  //       organizationID: adminOrgId,  // Add new user under the same organization
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone,
  //       role: formData.role,
  //       status: formData.status,
  //       password: formData.password, // Assuming you need the password
  //       lastLogin: new Date().toISOString(),
  //       assignedMachines: [] // Assuming the user doesn't have assigned machines initially
  //     };
  
  //     // Adding the new user to the `users` node under the specific organization
  //     const newUserRef = ref(rtdb, `organizations/${adminOrgId}/users/${sanitizedUserId}`);
  //     await set(newUserRef, newUser);
  //     console.log("New user added successfully!");
  //     alert(`user added successfully}`);
  //     setFormData({
  //       userId: "",
  //       name: "",
  //       email: "",
  //       phone: "",
  //       role: "employee", // Default role
  //       status: "inactive", // Default status
  //       password: "", // Password field reset
  //     });
     
  //     // Optionally, you can handle the user addition further (send notifications, etc.)
  
  //   } catch (error) {
  //     console.error("Error adding user:", error.message);  // Improved logging
  //     alert(`Failed to add user: ${error.message}`);
  //   }
  // };
  
  
  const handleAddUser = async () => {
    console.log("Current User UID:", auth.currentUser.uid); // Log to verify if the user is logged in
    try {
      const loggedInAdminUid = auth.currentUser?.uid;
  
      // Verify if admin data exists at the path
      const adminRef = ref(rtdb, `organizations/${CurrentOrganizationID}/users/${loggedInAdminUid}`);
      const adminSnapshot = await get(adminRef);
  
      if (!adminSnapshot.exists()) throw new Error("Admin details not found.");
      const adminData = adminSnapshot.val();
      const adminOrgId = adminData.organizationID;
  
      // Sanitize the email to create a valid user ID (replace @ and . with _)
      // const sanitizedUserId = formData.email.replace(/[@.]/g, '_');
  
      // **Step 1: Create user in Firebase Authentication**
      const newUserCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const newUserUID = newUserCredential.user.uid;  // Get the generated UID
  
      // **Step 2: Populate user data for the database**
      const newUser = {
        
        userID: newUserUID,  // Use the Authentication UID
        organizationID: adminOrgId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        lastLogin: new Date().toISOString(),
        assignedMachines: []  // Assuming the user doesn't have assigned machines initially
      };
  
      // **Step 3: Add user data to Realtime Database**
      const newUserRef = ref(rtdb, `organizations/${adminOrgId}/users/${newUserUID}`);
      await set(newUserRef, newUser);
  
      console.log("New user added successfully!");
      alert(`User added successfully`);
  
      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "employee",
        status: "inactive",
        password: "",
      });
  
    } catch (error) {
      console.error("Error adding user:", error.message);
      alert(`Failed to add user: ${error.message}`);
    }
  };
  




  return (
    <Paper sx={{ padding: 3 }}>
      <Box>
        {["userId", "name", "email", "phone", "role", "status", "password"].map((field) => (
          <Box key={field} sx={{ marginBottom: 2 }}>
            <Typography>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
            <TextField
              name={field}
              type={field === "password" ? "password" : "text"} // Password input type
              value={formData[field]}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        ))}
      </Box>
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddUser;

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
} from "../../../firebase";

function AddUser() {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: "employee", // Default role
    status: "inactive", // Default status
    password: "", // Password field added
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      // Retrieve logged-in admin's details
      const loggedInAdminUid = auth.currentUser?.uid;
      if (!loggedInAdminUid) throw new Error("Admin not logged in.");

      const adminRef = ref(rtdb, `users/${loggedInAdminUid}`);
      const adminSnapshot = await get(adminRef);

      if (!adminSnapshot.exists()) {
        throw new Error("Admin details not found.");
      }

      const adminData = adminSnapshot.val();
      const adminOrgId = adminData.organizationID;

      if (!adminOrgId) {
        throw new Error("Admin's organization not found.");
      }

      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const newUser = userCredential.user;

      // Add user data to the users node
      const newUserRef = ref(rtdb, `users/${newUser.uid}`);
      await set(newUserRef, {
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        status: formData.status,
        organizationID: adminOrgId,
        organizationName: adminData.organizationName,
        organizationAddress: adminData.organizationAddress,
      });

      // Add user's UID to the organization's users array
      const orgUsersRef = ref(rtdb, `organizations/${adminOrgId}/users`);
      const orgUsersSnapshot = await get(orgUsersRef);

      let orgUsers = orgUsersSnapshot.exists() ? orgUsersSnapshot.val() : [];
      if (!Array.isArray(orgUsers)) orgUsers = []; // Ensure it's an array
      orgUsers.push(newUser.uid);

      await set(orgUsersRef, orgUsers);

      alert("User added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. See console for details.");
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Box>
        {["userId", "name", "email", "phoneNumber", "role", "status", "password"].map((field) => (
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

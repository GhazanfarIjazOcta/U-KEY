import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDown from "../../../assets/Table/arrow-down.png";
import smallArrow from "../../../assets/Table/smallArrow.png";
import { Box, Stack, Typography } from "@mui/material";
import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";


import { getDatabase, ref, get, set,  update, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth"; // Import deleteUser from Firebase Authentication
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance

import { useUser } from "../../../Context/UserContext";

import {  
  MenuItem,
  Modal,
  Button,
  TextField,
} from "@mui/material";


function createData(
  UserID,
  Name,
  Email,
  Phone_number,
  Role,
  Status,
  Last_Login,
  Action
) {
  return {
    UserID,
    Name,
    Email,
    Phone_number,
    Role,
    Status,
    Last_Login,
    Action,
  };
}

const rows = [
  createData(
    1,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    2,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    3,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    4,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    5,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    6,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    7,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    8,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    9,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    10,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
];

export default function TableContent() {

  const { user, updateUserData } = useUser(); // Destructure user data from context
  console.log("user organization id in " , user.organizationID
  )

  const CurrentUserID = user.uid

  console.log("user current id in " , CurrentUserID) 

  const CurrentOrganizationID = user.organizationID;


  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) { // Check if the user is authenticated
        try {
          const db = getDatabase();
          const usersRef = ref(db, "users");
          const snapshot = await get(usersRef);
  
          if (snapshot.exists()) {
            const allUsers = snapshot.val();
            const filteredUsers = Object.keys(allUsers)
              .map((key) => ({
                id: key,
                ...allUsers[key],
              }))
              .filter((user) => user.organizationID === CurrentOrganizationID); // Filter users by organization ID
  
            setusers(filteredUsers); // Set the filtered users in state
          } else {
            setError("No users found.");
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError("You must be logged in to view this page.");
        // navigate("/login");
      }
      setLoading(false); // Set loading to false after fetching data
    });
  
    return () => unsubscribe(); // Cleanup on component unmount
  }, [navigate, CurrentOrganizationID]); // Add CurrentOrganizationID to dependency array
  




// const handleDeleteUser = async (userId) => {
//   try {
//     const db = getDatabase();
//     const authInstance = getAuth();
    
//     // Delete user data from the 'users' node in the database
//     const userRef = ref(db, `users/${userId}`);
//     await remove(userRef);
    
//     // If the current logged-in user is being deleted
//     const currentUser = authInstance.currentUser;
//     if (currentUser && currentUser.uid === userId) {
//       try {
//         await deleteUser(currentUser); // Deletes the logged-in user from Firebase Authentication
//         console.log(`User with UID: ${userId} deleted from Firebase Authentication.`);
//       } catch (authError) {
//         console.error(`Error deleting user from Firebase Authentication: ${authError.message}`);
//       }
//     }
    
//     // Update the UI by removing the deleted user
//     setusers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

//     alert("User and associated data have been deleted successfully.");
//   } catch (error) {
//     console.error(`Error deleting user: ${error.message}`);
//     setError("Error deleting user and their data.");
//   }
// };




// const handleDeleteUser = async (userId) => {
//   try {
//     const db = getDatabase();
//     const authInstance = getAuth();
    
//     // Delete user data from the 'users' node in the database
//     const userRef = ref(db, `users/${userId}`);
//     await remove(userRef);

//     // Remove user ID from the organization's user list
//     const orgsRef = ref(db, `organizations`);  // Path to organizations node
//     const orgSnapshot = await get(orgsRef);

//     if (orgSnapshot.exists()) {
//       const orgData = orgSnapshot.val();
      
//       // Loop through all organizations to remove the user ID from any 'members' field
//       for (const orgId in orgData) {
//         if (orgData[orgId].members && orgData[orgId].members.includes(userId)) {
//           const updatedMembers = orgData[orgId].members.filter(memberId => memberId !== userId);
//           const orgMembersRef = ref(db, `organizations/${orgId}/members`);
//           await set(orgMembersRef, updatedMembers);
//         }
//       }
//     }
    
//     // If the current logged-in user is being deleted
//     const currentUser = authInstance.currentUser;
//     if (currentUser && currentUser.uid === userId) {
//       try {
//         await deleteUser(currentUser); // Deletes the logged-in user from Firebase Authentication
//         console.log(`User with UID: ${userId} deleted from Firebase Authentication.`);
//       } catch (authError) {
//         console.error(`Error deleting user from Firebase Authentication: ${authError.message}`);
//       }
//     }
    
//     // Update the UI by removing the deleted user
//     setusers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

//     alert("User and associated data have been deleted successfully.");
//   } catch (error) {
//     console.error(`Error deleting user: ${error.message}`);
//     setError("Error deleting user and their data.");
//   }
// };



const handleDeleteUser = async (userId) => {
  try {
    const db = getDatabase();
    const authInstance = getAuth();
    
    // Delete user data from the 'users' node in the database
    const userRef = ref(db, `users/${userId}`);
    await remove(userRef);

    // Remove user ID from the specific organization's users list
    const orgsRef = ref(db, 'organizations');
    const orgSnapshot = await get(orgsRef);

    if (orgSnapshot.exists()) {
      const orgData = orgSnapshot.val();
      
      for (const orgId in orgData) {
        const userList = orgData[orgId].users;
        if (userList && userList.includes(userId)) {
          const updatedUsers = userList.filter(memberId => memberId !== userId);
          const orgUsersRef = ref(db, `organizations/${orgId}/users`);
          await set(orgUsersRef, updatedUsers);
        }
      }
    }
    
    // Delete the user from Firebase Authentication if they are currently logged in
    const currentUser = authInstance.currentUser;
    if (currentUser && currentUser.uid === userId) {
      try {
        await deleteUser(currentUser);  // Deletes logged-in user from Firebase Authentication
        console.log(`User with UID: ${userId} deleted from Firebase Authentication.`);
      } catch (authError) {
        console.error(`Error deleting user from Firebase Authentication: ${authError.message}`);
      }
    }
    
    // Update the UI by removing the deleted user
    setusers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    alert("User and associated data have been deleted successfully.");
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    setError("Error deleting user and their data.");
  }
};


const [openEditModal, setOpenEditModal] = React.useState(false);
const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
const [selectedUser, setSelectedUser] = React.useState(null);

// State for edit fields
const [editName, setEditName] = React.useState("");
const [editEmail, setEditEmail] = React.useState("");
const [editPhone, setEditPhone] = React.useState("");
const [editStatus, setEditStatus] = React.useState("");



  // Load user details into edit form
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditStatus(user.status);
    setOpenEditModal(true);
  };

    // Handler to close the edit modal
    const handleCloseEditModal = () => {
      setOpenEditModal(false);
      setSelectedUser(null);
    };

    const handleSaveChanges = async () => {
      if (!selectedUser) return;
    
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${selectedUser.id}`);
    
        // Prepare the updated data
        const updatedData = {
          name: editName,
          email: editEmail,
          phone: editPhone,
          status: editStatus,
        };
    
        // Update data in Firebase
        await update(userRef, updatedData);
    
        // Update local state
        setusers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedData } : user
          )
        );
    
        alert("User data updated successfully.");
        handleCloseEditModal(); // Close modal
      } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        setError("Failed to update user data.");
      }
    };
    


  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 0,
        elevation: 0,
        borderTop: "1px solid #EAECF0",
        height: "54vh",
        width: "99%", overflow: "none",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#FCFCFD" }}>
          <TableRow>
            <TableCell align="right">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  User ID
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Name
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Email
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Phone Number
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Role
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Status
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Last Login
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Action
                </Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>



        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="center">{user.id}</TableCell>
              <TableCell align="center">{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.phone}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              
              <TableCell align="center">
                <Box
                  sx={{
                    width: "80px",
                    height: "25px",
                    backgroundColor: user.status === "active" ? "#ECFDF3" : "#F2F4F7",
                    borderRadius: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: user.status === "active" ? "#28A745" : "#6C757D",
                    }}
                  />
                  <Typography
                    fontWeight={500}
                    fontSize={"14px"}
                    sx={{
                      color: user.status === "active" ? "#037847" : "#364254",
                    }}
                    fontFamily={"Inter"}
                  >
                    {user.status}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center">
              {user.role === "superAdmin" ? (
                    <Box
                      sx={{
                        padding: "4px 8px",
                        backgroundColor: "#E3F2FD",
                        color: "#0D47A1",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                      // onClick={handleSuperAdminAction}
                      style={{ cursor: "pointer" }}
                    >
                      Super Admin
                    </Box>
                  ) : user.id === CurrentUserID ? (
                    <Box
                      sx={{
                        padding: "4px 8px",
                        backgroundColor: "#E3F2FD",
                        color: "#0D47A1",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                      // onClick={handleAdminAction}
                      style={{ cursor: "pointer" }}
                    >
                      You
                    </Box>
                  ) : (
                    <Stack direction={"row"} gap={2} justifyContent="center">
                      <img
                        src={Edit}
                        width="24px"
                        height="24px"
                        onClick={() => handleEdit(user)}
                        style={{ cursor: "pointer" }}
                        alt="Edit"
                      />
                      <img
                        src={Delete}
                        width="24px"
                        height="24px"
                        onClick={() => handleDeleteUser(user.id, user.users)}
                        style={{ cursor: "pointer" }}
                        alt="Delete"
                      />
                    </Stack>
                  )}
                {/* <Stack direction={"row"} gap={2} justifyContent="center">
                 
                      <img
                        src={Edit}
                        width="24px"
                        height="24px"
                        onClick={() => handleEdit(user)}
                        style={{ cursor: "pointer" }}
                        alt="Edit"
                      />
                  <img
                    src={Delete}
                    width="24px"
                    height="24px"
                    onClick={() => handleDeleteUser(user.id, user.users)}
                    
                    style={{ cursor: "pointer" }}
                    alt="Delete"
                  />
                </Stack> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>


          {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 }, // 90% width on extra-small screens, 400px on larger screens
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: { xs: 2, sm: 4 }, // Adjust padding for smaller screens
          }}
        >
          <Typography variant="h6" component="h2">
            Edit User
          </Typography>
          {selectedUser && (
            <>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
              <TextField
                fullWidth
                label="Status"
                margin="normal"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                select
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>

        
      </Table>
    </TableContainer>
  );
}

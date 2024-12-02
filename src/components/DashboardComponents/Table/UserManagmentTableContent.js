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

import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth"; // Import deleteUser from Firebase Authentication
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance

import { useUser } from "../../../Context/UserContext";

import { MenuItem, Modal, Button, TextField } from "@mui/material";

import { getApp } from "firebase/app"; // for admin reference
import { getAuth as getAdminAuth } from "firebase/auth";

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



export default function TableContent() {
  
  const { user, updateUserData } = useUser(); // Destructure user data from context
  console.log("user organization id in ", user.organizationID);

  const CurrentUserID = user.uid;

  console.log("user current id in ", CurrentUserID);



  // const CurrentOrganizationID = user.organizationID;

  // const { user } = useUser(); // Destructure user data from context
  const navigate = useNavigate();

  const CurrentOrganizationID = user.organizationID;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("the users getting here are " , users)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const db = getDatabase();
          const orgRef = ref(db, "organizations");  // Reference to all organizations

          const snapshot = await get(orgRef);  // Fetch all organizations

          if (snapshot.exists()) {
            const allOrganizations = snapshot.val();
            const filteredUsers = [];

            // Loop through organizations to find users under the current organization ID
            for (const orgKey in allOrganizations) {
              const organization = allOrganizations[orgKey];
              if (organization.organizationID === CurrentOrganizationID && organization.users) {
                // Extract the users and add them to the filtered list
                for (const userKey in organization.users) {
                  const user = organization.users[userKey];
                  filteredUsers.push({
                    ...user,  // Spread to include user details
                    userID: user.userID,
                  });
                }
              }
            }
            
            setUsers(filteredUsers);  // Update state with the filtered users
          } else {
            setError("No organizations found.");
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError("You must be logged in to view this page.");
      }
      setLoading(false);  // Set loading to false after fetching data
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [CurrentOrganizationID]); // Ensure the effect re-runs if the organization ID changes
  


  const handleDeleteUser = async (userId) => {
    try {
      const db = getDatabase();
      const authInstance = getAuth();
      
      // 1. Delete user from the 'users' node
      // const userRef = ref(db, `users/${userId}`);
      const userRef = ref(db, `organizations/${CurrentOrganizationID}/users/${userId}`);
      await remove(userRef);
  
      // 2. Remove user from organization-specific users list
      const orgsRef = ref(db, "organizations");
      const orgSnapshot = await get(orgsRef);
      
      if (orgSnapshot.exists()) {
        const orgData = orgSnapshot.val();
        
        for (const orgId in orgData) {
          const userList = orgData[orgId].users;
          
          if (userList && userList[userId]) {
            // Remove the user from the organization's user list
            const updatedUsers = { ...userList };
            delete updatedUsers[userId]; // Remove the user
            
            const orgUsersRef = ref(db, `organizations/${orgId}/users`);
            await update(orgUsersRef, updatedUsers); // Update the organization's user list in the database
          }
        }
      }
  
      // 3. If the logged-in user is being deleted, delete from Firebase Authentication
      const currentUser = authInstance.currentUser;
      if (currentUser && currentUser.uid === userId) {
        try {
          await deleteUser(currentUser); // Delete the logged-in user from Firebase Authentication
          console.log(`User with UID: ${userId} deleted from Firebase Authentication.`);
        } catch (authError) {
          console.error(`Error deleting user from Firebase Authentication: ${authError.message}`);
        }
      }
  
      // 4. Update the local UI state by removing the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  
      alert("User and associated data have been deleted successfully.");
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      setError("Error deleting user and their data.");
    }
  };
  
  
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // State for edit fields
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editRole, setEditRole] = useState("");
  
  // Load user details into edit form
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditStatus(user.status);
    setEditRole(user.role);
    setOpenEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };
  
  const handleSaveChanges = async () => {
    if (!selectedUser) return;
  
    try {
      const db = getDatabase();
      const orgsRef = ref(db, "organizations");
      const orgSnapshot = await get(orgsRef);
  
      if (orgSnapshot.exists()) {
        const orgData = orgSnapshot.val();
  
        for (const orgId in orgData) {
          const userList = orgData[orgId].users;
  
          if (userList) {
            // Loop through the userList object to find the user by userID
            for (const userId in userList) {
              if (userId === selectedUser.userID) {
                const updatedData = {
                  name: editName,
                  email: editEmail,
                  phone: editPhone,
                  status: editStatus,
                  role: editRole,
                };
  
                // Update the user's data in this organization
                const orgUserRef = ref(db, `organizations/${orgId}/users/${userId}`);
                await update(orgUserRef, updatedData);
  
                // Update the UI by updating the users list in local state
                setUsers((prevUsers) =>
                  prevUsers.map((user) =>
                    user.userID === selectedUser.userID ? { ...user, ...updatedData } : user
                  )
                );
  
                alert("User data updated successfully.");
                handleCloseEditModal(); // Close modal
                return; // Exit after updating the first matching user
              }
            }
          }
        }
      }
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
        width: "99%",
        overflow: "none",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#FCFCFD" }}>
          <TableRow>
            <TableCell align="right">
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
                  Role
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
                  Action
                </Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="start">{user.userID}</TableCell>
              <TableCell align="start">{user.name}</TableCell>
              <TableCell align="start">{user.email}</TableCell>
              <TableCell align="start">{user.phone}</TableCell>
              <TableCell align="start">{user.role}</TableCell>

              <TableCell align="start">
                <Box
                  sx={{
                    width: "80px",
                    height: "25px",
                    backgroundColor:
                      user.status === "active" ? "#ECFDF3" : "#F2F4F7",
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
                      backgroundColor:
                        user.status === "active" ? "#28A745" : "#6C757D",
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

              <TableCell align="start">{user.lastLogin}</TableCell>
              <TableCell align="start">
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
                  <Stack direction={"row"} gap={2} justifyContent="start">
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
                {/* <Stack direction={"row"} gap={2} justifyContent="start">
                 
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
                <TextField
                  fullWidth
                  label="Role"
                  margin="normal"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  select
                >                 
                  <MenuItem value="employee">Emplyee</MenuItem>
                  <MenuItem value="operator">Operator</MenuItem>
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

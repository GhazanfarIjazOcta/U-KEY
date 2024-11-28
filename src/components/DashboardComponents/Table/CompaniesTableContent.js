import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Stack,  Typography } from "@mui/material";
import { TableStyles } from "../../UI/Styles";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth"; // Import deleteUser from Firebase Authentication
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance

import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";

import Switch from '@mui/material/Switch'; // For default export

import { useUser } from "../../../Context/UserContext";


// Function to create a row
function createData(
  companyName,
  totalMachines,
  totalOperators,
  activeJobSites,
  users,
  subscriptionStatus,
  action
) {
  return {
    companyName,
    totalMachines,
    totalOperators,
    activeJobSites,
    users,
    subscriptionStatus,
    action,
  };
}

const rows = [
  createData("OT Tech", "123", "643", "345", "345", "Active"),
  createData("OT Pro", "123", "643", "345", "345", "Deactive"),
];

export default function CompaniesTableContent() {

  const { user, updateUserData } = useUser(); // Destructure user data from context
  console.log("user role in organisation table is  " , user.organizationID)


  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getDatabase();
          const organizationsRef = ref(db, "organizations");
          const snapshot = await get(organizationsRef);

          if (snapshot.exists()) {
            const orgData = snapshot.val();
            const orgList = Object.keys(orgData).map((key) => ({
              id: key,
              ...orgData[key],
            }));
            setOrganizations(orgList);
          } else {
            setError("No organizations found.");
          }
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError("You must be logged in to view this page.");
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle activating/deactivating an organization
  // const handleActivateDeactivate = async (organizationId, status) => {
  //   try {
  //     const db = getDatabase();
  //     const orgRef = ref(db, "organizations/" + organizationId);
  //     await update(orgRef, {
  //       subscriptionStatus: status === "active" ? "inactive" : "Active",
  //     });
  //     setOrganizations((prev) =>
  //       prev.map((org) =>
  //         org.id === organizationId
  //           ? { ...org, subscriptionStatus: status === "active" ? "inactive" : "Active" }
  //           : org
  //       )
  //     );
  //   } catch (err) {
  //     setError("Error updating status.");
  //   }
  // };

  const handleActivateDeactivate = async (organizationId, status) => {
    try {
      const db = getDatabase();
      const orgRef = ref(db, 'organizations/' + organizationId);
      await update(orgRef, {
        status: status === "active" ? "inactive" : "active",
      });
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === organizationId ? { ...org, status: status === "active" ? "inactive" : "active" } : org
        )
      );
    } catch (err) {
      setError("Error updating status.");
    }
  };

  // Handle deleting an organization and its associated users
  const handleDeleteOrganization = async (organizationId, users) => {
    try {
      const db = getDatabase();
      const authInstance = getAuth();

      // Delete all users from the 'users' node
      users.forEach(async (userId) => {
        const userRef = ref(db, "users/" + userId);
        await remove(userRef);

        try {
          // If current user is being deleted
          const currentUser = authInstance.currentUser;
          if (currentUser && currentUser.uid === userId) {
            await deleteUser(currentUser); // Deletes the logged-in user
            console.log(`User with UID: ${userId} deleted from Firebase Authentication.`);
          }
        } catch (authError) {
          console.log(`Error deleting user from Firebase Authentication: ${authError.message}`);
        }
      });

      // Delete the organization from the 'organizations' node
      const orgRef = ref(db, "organizations/" + organizationId);
      await remove(orgRef);

      // Update the UI by removing the deleted organization
      setOrganizations((prev) => prev.filter((org) => org.id !== organizationId));

      alert("Organization and associated users have been deleted.");
    } catch (err) {
      setError("Error deleting organization and users.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer
      sx={{
        borderRadius: 0,
        elevation: 0,
        borderTop: "1px solid #EAECF0",
        marginTop: "2.5rem",
        background: "#FFF",
        height: "60%",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#FCFCFD" }}>
          <TableRow>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Company Name</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Company Address</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Total Operators</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Active Job Sites</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Users</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Subscription Status</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={TableStyles.headingStyle}>Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>   


        <TableBody>
          {organizations.map((organization) => (
            <TableRow key={organization.id}>
              <TableCell align="center">{organization.name}</TableCell>
              <TableCell align="center">{organization.address}</TableCell>
              <TableCell align="center">{organization.totalOperators}</TableCell>
              <TableCell align="center">{organization.activeJobSites}</TableCell>
              <TableCell align="center">{organization.users}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    width: "80px",
                    height: "25px",
                    backgroundColor: organization.status === "active" ? "#ECFDF3" : "#F2F4F7",
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
                      backgroundColor: organization.status === "active" ? "#28A745" : "#6C757D",
                    }}
                  />
                  <Typography
                    fontWeight={500}
                    fontSize={"14px"}
                    sx={{
                      color: organization.status === "active" ? "#037847" : "#364254",
                    }}
                    fontFamily={"Inter"}
                  >
                    {organization.status}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Stack direction={"row"} gap={2} justifyContent="center">
                  {/* <img
                    src={Edit}
                    width="24px"
                    height="24px"
                    style={{ cursor: "pointer" }}
                    alt="Edit"
                    onClick={() => handleActivateDeactivate(organization.id, organization.status) }
                  /> */}
                <Switch
                    checked={organization.status === 'active'} // Determines if the status is active
                    onChange={() => handleActivateDeactivate(organization.id, organization.status)} // Toggle function
                    color={organization.status === 'active' ? 'success' : 'error'} // Green for active, red for inactive
                    inputProps={{ 'aria-label': 'toggle organization status' }} // Accessibility
                  />
                  <img
                    src={Delete}
                    width="24px"
                    height="24px"
                    onClick={() => handleDeleteOrganization(organization.id, organization.users)}
                    
                    style={{ cursor: "pointer" }}
                    alt="Delete"
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

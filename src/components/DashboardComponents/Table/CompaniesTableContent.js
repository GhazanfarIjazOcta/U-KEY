import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Stack, Typography } from "@mui/material";
import { TableStyles } from "../../UI/Styles";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth"; // Import deleteUser from Firebase Authentication
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance

import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";

import Switch from "@mui/material/Switch"; // For default export
import { useUser } from "../../../Context/UserContext";

import { onValue } from "firebase/database"; // Import onValue

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
    action
  };
}

const rows = [
  createData("OT Tech", "123", "643", "345", "345", "Active"),
  createData("OT Pro", "123", "643", "345", "345", "Deactive")
];

export default function CompaniesTableContent() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log("these are my organisations ", organizations);

  useEffect(() => {
    const db = getDatabase();
    const organizationsRef = ref(db, "organizations");

    console.log("here is the organisation ref ", organizationsRef);

    setLoading(true);

    const unsubscribe = onValue(
      organizationsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const orgData = snapshot.val();
          // Convert nested objects into array
          const orgList = Object.keys(orgData).map((key) => ({
            id: key,
            ...orgData[key]
          }));
          setOrganizations(orgList);
          console.log("organisation list is ", orgList);
          setError(null);
          console.log("Data updated:", orgList);
        } else {
          setOrganizations([]);
          setError("No organizations found.");
        }
        setLoading(false);
      },
      (error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
      console.log("Listener unsubscribed");
    };
  }, []);

  // Activate/Deactivate Organization
  const handleActivateDeactivate = async (organizationId, status) => {
    try {
      const db = getDatabase();
      const orgRef = ref(db, `organizations/${organizationId}`);
      await update(orgRef, {
        status: status === "active" ? "inactive" : "active"
      });

      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === organizationId
            ? { ...org, status: status === "active" ? "inactive" : "active" }
            : org
        )
      );
    } catch (err) {
      setError("Error updating status: " + err.message);
    }
  };

  // Delete Organization and Associated Users & Machines
  const handleDeleteOrganization = async (organizationId) => {
    try {
      const db = getDatabase();
      const authInstance = getAuth();
      const orgRef = ref(db, `organizations/${organizationId}`);

      const orgSnapshot = await get(orgRef); // Fetch organization to access nested users
      if (orgSnapshot.exists()) {
        const { users } = orgSnapshot.val();

        // Delete users from Authentication and Database
        if (users) {
          const userIDs = Object.keys(users);
          for (const userId of userIDs) {
            const userRef = ref(
              db,
              `organizations/${organizationId}/users/${userId}`
            );
            await remove(userRef); // Remove user node

            try {
              const currentUser = authInstance.currentUser;
              if (currentUser && currentUser.uid === userId) {
                await deleteUser(currentUser); // Delete authenticated user
                console.log(`User ${userId} deleted from Authentication`);
              }
            } catch (authError) {
              console.log(`Error deleting user: ${authError.message}`);
            }
          }
        }
      }

      // Remove entire organization node
      await remove(orgRef);
      setOrganizations((prev) =>
        prev.filter((org) => org.id !== organizationId)
      );
      alert("Organization and users deleted.");
    } catch (err) {
      setError("Error deleting organization: " + err.message);
    }
  };

  // Render states
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
        height: "60%"
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#FCFCFD" }}>
          <TableRow>
            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>
                Company Name
              </Typography>
            </TableCell>
            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>
                Company Address
              </Typography>
            </TableCell>

            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>
                Creator Name
              </Typography>
            </TableCell>

            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>
                Total Operators
              </Typography>
            </TableCell>
            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>Machines</Typography>
            </TableCell>
            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>Users</Typography>
            </TableCell>
            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>
                Subscription Status
              </Typography>
            </TableCell>
            <TableCell align="start">
              <Typography sx={TableStyles.headingStyle}>Action</Typography>
            </TableCell>
            
          </TableRow>
        </TableHead>

        <TableBody>
          {organizations.map((organization) => (
            <TableRow key={organization.id}>
              <TableCell align="start">{organization.name}</TableCell>
              <TableCell align="start">{organization.address}</TableCell>
              {/* <TableCell align="start">{organization.subscriptionStatus}</TableCell> */}

              {/* Display the names of admins and superAdmins */}
              <TableCell align="start">
                {Object.values(organization.users)
                  .filter(
                    (user) =>
                      user.role === "admin" || user.role === "superAdmin"
                  ) // Check for admin or superAdmin
                  .map((user) => user.name) // Access user’s name (or any other data)
                  .join(", ")}{" "}
                {/* Join names with a comma if there are multiple admins or superAdmins */}
              </TableCell>

              <TableCell align="start">
                {
                  Object.values(organization.users).filter(
                    (user) => user.role === "operator"
                  ).length
                }
              </TableCell>
              <TableCell align="start">
                {Object.keys(organization.users).length}
              </TableCell>
              <TableCell align="start">
                {Object.keys(organization.users).length}
              </TableCell>
              {/* <TableCell align="start">{organization.users}</TableCell> */}
              <TableCell align="start">
                <Box
                  sx={{
                    width: "80px",
                    height: "25px",
                    backgroundColor:
                      organization.status === "active" ? "#ECFDF3" : "#F2F4F7",
                    borderRadius: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor:
                        organization.status === "active" ? "#28A745" : "#6C757D"
                    }}
                  />
                  <Typography
                    fontWeight={500}
                    fontSize={"14px"}
                    sx={{
                      color:
                        organization.status === "active" ? "#037847" : "#364254"
                    }}
                    fontFamily={"Inter"}
                  >
                    {organization.status}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="start">
                <Stack direction={"row"}  justifyContent="start">                 
                  <Switch
                    checked={organization.status === "active"} // Determines if the status is active
                    onChange={() =>
                      handleActivateDeactivate(
                        organization.id,
                        organization.status
                      )
                    } // Toggle function
                    color={
                      organization.status === "active" ? "success" : "error"
                    } // Green for active, red for inactive
                    inputProps={{ "aria-label": "toggle organization status" }} // Accessibility
                  />
                  {/* <img
                    src={Delete}
                    width="24px"
                    height="24px"
                    onClick={() =>
                      handleDeleteOrganization(organization.id, organization.id)
                    }
                    style={{ cursor: "pointer" }}
                    alt="Delete"
                  /> */}
                   {/* Check if superAdmin */}
        {Object.values(organization.users)
          .filter((user) => user.role === "superAdmin")
          .length > 0 ? (
          <Box
          sx={{
            backgroundColor: "rgba(173, 216, 230, 0.3)", // Lighter blue with more transparency
            color: "#00008B", // Black text color
            borderRadius: "8px", // Smaller rounded corners
            padding: "3px 8px", // Smaller padding for a smaller size
            fontWeight: "bold", // Bold font
            textAlign: "start",
            backdropFilter: "blur(6px)", // Slightly less intense blur
            cursor: "pointer", // Makes the cursor a pointer on hover
            transition: "background-color 0.3s ease", // Smooth transition on hover
            '&:hover': {
              backgroundColor: "rgba(173, 216, 230, 0.6)", // Slightly darker on hover
            }
          }}
          
          >
            OEM
          </Box>
        ) : (
          <img
            src={Delete}
            width="40px"
            height="30px"
            onClick={() =>
              handleDeleteOrganization(organization.id, organization.id)
            }
            style={{ cursor: "pointer" }}
            alt="Delete"
          />
        )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

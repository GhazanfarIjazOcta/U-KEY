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
function createData(
  companyName,
  totalMachines,
  tableotalOperators,
  activeJobSites,
  Users,
  subscriptionStatus,
  Action
) {
  return {
    companyName,
    totalMachines,
    tableotalOperators,
    activeJobSites,
    Users,
    subscriptionStatus,
    Action,
  };
}

const rows = [
  createData(
    "OT Tech",
    "123",
    "643",
    "345",
    "345",
    "Active"
  ),
  createData(
    "OT Pro",
    "123",
    "643",
    "345",
    "345",
    "Deactive"
  ),
];

export default function CompaniesTableContent() {

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getDatabase();
          const organizationsRef = ref(db, 'organizations');
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

  const handleDeleteOrganization = async (organizationId, users) => {
    try {
      const db = getDatabase();
      const authInstance = getAuth(); // Get Firebase Auth instance
      
      // Delete all users from the 'users' node
      users.forEach(async (userId) => {
        const userRef = ref(db, 'users/' + userId);
        await remove(userRef); // Remove user from the database

        // If you're on the backend (Firebase Functions), you would use Admin SDK here:
        try {
          // On the client-side, you can delete the logged-in user using deleteUser()
          const currentUser = authInstance.currentUser;

          if (currentUser && currentUser.uid === userId) {
            await deleteUser(currentUser); // Deletes the logged-in user
            console.log(`User with UID: ${userId} deleted from Firebase Authentication.`);
          } else {
            // To delete another user, use Firebase Admin SDK in Cloud Functions (not client-side)
            console.log(`Error: User with UID ${userId} should be deleted from the Admin SDK (not client-side).`);
          }
        } catch (authError) {
          console.log(`Error deleting user from Firebase Authentication: ${authError.message}`);
        }
      });

      // Delete the organization from the 'organizations' node
      const orgRef = ref(db, 'organizations/' + organizationId);
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
            <TableCell align="right">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Company Name
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Total Machines
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Total Operators
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Active Job Sites
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Users
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Subscription Status
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>

                  Action
                </Typography>
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.UserID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                align="center"
                sx={{ margin: "0px", padding: "15px" }}
              >
                <Typography sx={TableStyles.textStyle} >

                  {row.companyName}

                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={TableStyles.textStyle} >

                    {row.totalMachines}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={TableStyles.textStyle} >

                    {row.tableotalOperators}


                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={TableStyles.textStyle} >

                    {row.activeJobSites}


                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={TableStyles.textStyle} >

                    {row.Users}


                  </Typography>
                </Stack>
              </TableCell>


              <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  sx={{ width: "100%" }}
                >
                  <Typography sx={{ ...TableStyles.textStyle, color: row.subscriptionStatus == "Active" ? "#28A745" : "#DC3545" }} >

                    {row.subscriptionStatus}

                  </Typography>
                </Stack>
              </TableCell>

              <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                <Stack
                  direction={"row"}
                  gap={2}
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  <img src={Edit} width={"24px"} height={"24px"} />
                  <img src={Delete} width={"24px"} height={"24px"} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

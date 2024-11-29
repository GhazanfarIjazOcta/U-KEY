import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Paper from "@mui/material/Paper";
import { Box, Stack, Typography } from "@mui/material";
import { TableStyles } from "../../UI/Styles";

import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";





import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth"; // Import deleteUser from Firebase Authentication
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance



import { useUser } from "../../../Context/UserContext";

import { MenuItem, Modal, TextField } from "@mui/material";

import { getApp } from "firebase/app"; // for admin reference
import { getAuth as getAdminAuth } from "firebase/auth";

import { onValue } from "firebase/database";



function createData(
  companyName,
  totalMachines,
  tableotalOperators,
  activeJobSites,
  subscriptionStatus,
  userName,
  partNumbers,
  lubricantDetails,
  loginTime,
  logoutTime
) {
  return {
    companyName,
    totalMachines,
    tableotalOperators,
    activeJobSites,
    subscriptionStatus,
    userName,
    partNumbers,
    lubricantDetails,
    loginTime,
    logoutTime
  };
}

const rows = [
  createData(
    "OT Tech",
    "123",
    "643",
    "345",
    "Active",
    "123",
    "643",
    "345",
    "345",
    "345",
  ),
  createData(
    "OT Pro",
    "123",
    "643",
    "345",
    "Inactive",
    "123",
    "643",
    "345",
    "345",
    "345",
  ),
];

export default function OperatorsTableContent() {

  const { user } = useUser(); // Destructure user data from context
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CurrentOrganizationID = user?.organizationID;

  console.log("current organisation in operators is [][][] " , CurrentOrganizationID )
  console.log("current operators in operators is [][][] " , operators )

  useEffect(() => {
    // Check if user is logged in and has an organization ID
    if (!user || !CurrentOrganizationID) {
      setError("You must be logged in with a valid organization ID to view this page.");
      setLoading(false);
      return;
    }
  
    const db = getDatabase();
    const organizationsRef = ref(db, "organizations");
  
    const unsubscribeDB = onValue(organizationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const organizations = snapshot.val();
  
        console.log("Organizations data is:", organizations);
  
        // Find the specific organization based on CurrentOrganizationID
        const currentOrg = organizations[CurrentOrganizationID];
  
        if (currentOrg) {
          // Get the users of the current organization
          const allUsers = currentOrg.users;
  
          // Filter users by role 'operator'
          const filteredOperators = Object.keys(allUsers)
            .map((key) => ({
              id: key,
              ...allUsers[key],
            }))
            .filter(
              (user) => user.role === "operator" // Filter by operator role
            );
  
          if (filteredOperators.length === 0) {
            setError("No operators found for your organization.");
          }
  
          setOperators(filteredOperators);
        } else {
          setError("Organization not found.");
        }
      } else {
        setError("No organizations data found.");
      }
      setLoading(false);
    });
  
    return () => unsubscribeDB(); // Cleanup DB listener
  }, [user, CurrentOrganizationID]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
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
                  Operator Name/ID
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
                  Assigned Machine
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
                  Start Time
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
                  Stop Time
                </Typography>
              </Stack>
            </TableCell>

            {/* <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>
                  User
                </Typography>
              </Stack>
            </TableCell> */}





            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>
                  Company  Name
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
                  Status
                </Typography>
              </Stack>
            </TableCell>


            {/* <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>
                  Logout Time
                </Typography>
              </Stack>
            </TableCell> */}


            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>
                  Phone
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
                  Login time
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
                  Actions
                </Typography>
              </Stack>
            </TableCell>



          </TableRow>
        </TableHead>



        {/* <TableBody>
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
                    {row.activeJobSites}
                  </Typography>
                </Stack>
              </TableCell>


            </TableRow>
          ))}
        </TableBody> */}


        <TableBody>
          {operators.map((operator) => (
            <TableRow key={user.id}>
              {/* <TableCell align="center">{user.id}</TableCell> */}
              <TableCell align="center">{operator.name}</TableCell>
              <TableCell align="center">{operator.name}</TableCell>
              <TableCell align="center">{operator.name}</TableCell>
             
              <TableCell align="center">{operator.name}</TableCell>

              {/* <TableCell align="center">
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
              </TableCell> */}



              <TableCell align="center">{operator.organizationID }</TableCell>
              

             
              


              

              <TableCell align="center">
                <Box
                  sx={{
                    width: "80px",
                    height: "25px",
                    backgroundColor:
                    operator.status === "active" ? "#ECFDF3" : "#F2F4F7",
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
                      operator.status === "active" ? "#28A745" : "#6C757D",
                    }}
                  />
                  <Typography
                    fontWeight={500}
                    fontSize={"14px"}
                    sx={{
                      color: operator.status === "active" ? "#037847" : "#364254",
                    }}
                    fontFamily={"Inter"}
                  >
                    {operator.status}
                  </Typography>
                </Box>
              </TableCell>


              <TableCell align="center">{operator.phone}</TableCell>

               <TableCell align="center">{operator.lastLogin }</TableCell>


           

               <TableCell align="center">{operator.lastLogin }</TableCell>

             
            </TableRow>
          ))}
        </TableBody>



      </Table>
    </TableContainer>
  );
}

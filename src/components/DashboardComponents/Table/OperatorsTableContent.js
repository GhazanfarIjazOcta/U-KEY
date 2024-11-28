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
  const navigate = useNavigate();
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CurrentUserID = user?.uid;
  const CurrentOrganizationID = user?.organizationID;

  console.log("User organization ID: ", CurrentOrganizationID); // Check organization ID

  useEffect(() => {
    // Check if user is logged in and has an organization ID
    if (!user || !CurrentOrganizationID) {
      setError("You must be logged in with a valid organization ID to view this page.");
      setLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const db = getDatabase();
        const operatorsRef = ref(db, "operators");

        const unsubscribeDB = onValue(operatorsRef, (snapshot) => {
          if (snapshot.exists()) {
            const allOperators = snapshot.val();
            console.log("All operators:", allOperators); // Log all operators

            // Filter operators by organization ID
            const filteredOperators = Object.keys(allOperators)
              .map((key) => ({
                id: key,
                ...allOperators[key],
              }))
              .filter(
                (operator) => operator.organizationID === CurrentOrganizationID
              );

            console.log("Filtered operators: ", filteredOperators); // Log filtered operators
            if (filteredOperators.length === 0) {
              setError("No operators found for your organization.");
            }

            setOperators(filteredOperators);
          } else {
            setError("No operators data found.");
          }
          setLoading(false); // Set loading to false once data is fetched
        });

        return () => unsubscribeDB(); // Cleanup DB listener
      } else {
        setError("You must be logged in to view this page.");
        setLoading(false);
      }
    });

    return () => unsubscribeAuth(); // Cleanup auth listener
  }, [user, CurrentOrganizationID]); // Dependency array includes `user` and `CurrentOrganizationID`

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

            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography sx={TableStyles.headingStyle}>
                  User
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
                  Login Time
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
                  Logout Time
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
                  Duration
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
                  Logout time
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
              <TableCell align="center">{operator.userID}</TableCell>
              <TableCell align="center">{operator.companyName
              }</TableCell>
              <TableCell align="center">{operator.startTime}</TableCell>

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


              <TableCell align="center">{operator.stopTime }</TableCell>

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


              <TableCell align="center">{operator.role}</TableCell>


              <TableCell align="center">
                {operator.role === "superAdmin" ? (
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
                ) : operator.id === CurrentOrganizationID ? (
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
                    {/* <img
                      src={Edit}
                      width="24px"
                      height="24px"
                      onClick={() => handleEdit(user)}
                      style={{ cursor: "pointer" }}
                      alt="Edit"
                    /> */}
                    {/* <img
                      src={Delete}
                      width="24px"
                      height="24px"
                      onClick={() => handleDeleteUser(user.id, user.users)}
                      style={{ cursor: "pointer" }}
                      alt="Delete"
                    /> */}
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

              <TableCell align="center">{user.role}</TableCell>

             
            </TableRow>
          ))}
        </TableBody>



      </Table>
    </TableContainer>
  );
}

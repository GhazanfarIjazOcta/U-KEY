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
import { Box, Button, Stack, Typography } from "@mui/material";
import OperatorsIcon from "../../../assets/Sidebar/OperatorsIconSelected.svg";

import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";
import { TableStyles } from "../../UI/Styles";

import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth"; // Import deleteUser from Firebase Authentication
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance



import { useUser } from "../../../Context/UserContext";

import { MenuItem, Modal, TextField } from "@mui/material";

import { getApp } from "firebase/app"; // for admin reference
import { getAuth as getAdminAuth } from "firebase/auth";




function createData(
    companyName,
    totalMachines,
    tableotalOperators,
    activeJobSites,


) {
    return {
        companyName,
        totalMachines,
        tableotalOperators,
        activeJobSites,

    };
}

const rows = [
    createData(
        "OT Tech",
        "643",
        "345",
        "345",
    ),
    createData(
        "OT Pro",
        "643",
        "345",
        "345",
    ),
    createData(
        "OT Pro",
        "643",
        "345",
        "345",
    ),

];

export default function AllOperatorsTable() {


    const { user, updateUserData } = useUser(); // Destructure user data from context
    console.log("user organization id in ", user);
  
    const CurrentUserID = user.uid;
  
    console.log("user current id in ", CurrentUserID);
  
    const CurrentOrganizationID = user.organizationID;
  
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
          if (authUser) {
            // Check if the user is authenticated
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
                  .filter((user) => 
                    user.organizationID === CurrentOrganizationID && user.role === "operator" // Filter by organization ID and role
                  );
      
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
      




    return (
        <Box sx={{ padding: "1rem 2rem 0.5rem 1rem", marginRight: "0rem", background: "#FFF", height: 350, }}>
            <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                    <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center" }}> <img src={OperatorsIcon} /> </Box>
                    <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
                        All Operators
                    </Typography>
                </Box>
                <Button
                    variant="text"
                    sx={{
                        color: "#F38712",
                        fontWeight: 500,
                        fontFamily: "Poppins",
                        textTransform: "none",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": {
                            backgroundColor: "",
                        },
                    }}
                >
                    View More
                </Button>
            </Box>
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
                <Table sx={{}} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#FCFCFD" }}>
                        <TableRow>
                            <TableCell align="right">
                                <Stack
                                    direction={"row"}
                                    gap={1}
                                    sx={{ width: "100%", justifyContent: "center" }}
                                >
                                    <Typography sx={TableStyles.headingStyle} >
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


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
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

                                            {row.activeJobSites}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        </>

                        <>
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
            </TableRow>
          ))}
        </TableBody>
                        
                        </>
                        
                        
                    </TableBody>
                    
                </Table>
            </TableContainer>
        </Box>
    );
}

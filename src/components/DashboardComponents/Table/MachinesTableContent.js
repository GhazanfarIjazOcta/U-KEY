import * as React from "react";
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



import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase"; // Firebase auth instance

import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { getAuth, deletemachine } from "firebase/auth"; // Import deletemachine from Firebase Authentication
import { useNavigate } from "react-router-dom";



import { useUser } from "../../../Context/UserContext";
import { useState } from "react";

import { useEffect } from "react";




function createData(
    companyName,
    totalMachines,
    tableotalOperators,
    activeJobSites,
    machines,
    recentmachinesPin,
    subscriptionStatus,
    machineName,
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
        machines,
        recentmachinesPin,
        subscriptionStatus,
        machineName,
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
        "345",
        "3451",
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
        "345",
        "3451",
        "Inactive",
        "123",
        "643",
        "345",
        "345",
        "345",
    ),
];

export default function MachinesTableContent() {



    const { user, updatemachineData } = useUser(); // Destructure machine data from context
    console.log("machine organization id in ", user.organizationID);
  
    const CurrentmachineID = user.uid;
  
    console.log("machine current id in ", CurrentmachineID);


    const CurrentOrganizationID = user.organizationID;
    const [machines, setmachines] = useState([]);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    console.log("the machines getting here are " , machines)



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authmachine) => {
          if (authmachine) {
            try {
              const db = getDatabase();
              const orgRef = ref(db, "organizations");  // Reference to all organizations
    
              const snapshot = await get(orgRef);  // Fetch all organizations
    
              if (snapshot.exists()) {
                const allOrganizations = snapshot.val();
                const filteredmachines = [];
    
                // Loop through organizations to find machines under the current organization ID
                for (const orgKey in allOrganizations) {
                  const organization = allOrganizations[orgKey];
                  if (organization.organizationID === CurrentOrganizationID && organization.machines) {
                    // Extract the machines and add them to the filtered list
                    for (const machineKey in organization.machines) {
                      const machine = organization.machines[machineKey];
                      filteredmachines.push({
                        ...machine,  // Spread to include machine details
                        machineID: machine.machineID,
                      });
                    }
                  }
                }
                
                setmachines(filteredmachines);  // Update state with the filtered machines
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
      
    
    
      const handleDeletemachine = async (machineId) => {
        try {
          const db = getDatabase();
          const authInstance = getAuth();
          
          // 1. Delete machine from the 'machines' node
          // const machineRef = ref(db, `machines/${machineId}`);
          const machineRef = ref(db, `organizations/${CurrentOrganizationID}/machines/${machineId}`);
          await remove(machineRef);
      
          // 2. Remove machine from organization-specific machines list
          const orgsRef = ref(db, "organizations");
          const orgSnapshot = await get(orgsRef);
          
          if (orgSnapshot.exists()) {
            const orgData = orgSnapshot.val();
            
            for (const orgId in orgData) {
              const machineList = orgData[orgId].machines;
              
              if (machineList && machineList[machineId]) {
                // Remove the machine from the organization's machine list
                const updatedmachines = { ...machineList };
                delete updatedmachines[machineId]; // Remove the machine
                
                const orgmachinesRef = ref(db, `organizations/${orgId}/machines`);
                await update(orgmachinesRef, updatedmachines); // Update the organization's machine list in the database
              }
            }
          }
      
          // 3. If the logged-in machine is being deleted, delete from Firebase Authentication
          const currentmachine = authInstance.currentmachine;
          if (currentmachine && currentmachine.uid === machineId) {
            try {
            //   await deletemachine(currentmachine); // Delete the logged-in machine from Firebase Authentication
              console.log(`machine with UID: ${machineId} deleted from Firebase Authentication.`);
            } catch (authError) {
              console.error(`Error deleting machine from Firebase Authentication: ${authError.message}`);
            }
          }
      
          // 4. Update the local UI state by removing the deleted machine
          setmachines((prevmachines) => prevmachines.filter((machine) => machine.id !== machineId));
      
          alert("machine and associated data have been deleted successfully.");
        } catch (error) {
          console.error(`Error deleting machine: ${error.message}`);
          setError("Error deleting machine and their data.");
        }
      };
      
      
      const [openEditModal, setOpenEditModal] = useState(false);
      const [selectedmachine, setSelectedmachine] = useState(null);
      
      // State for edit fields
      const [editName, setEditName] = useState("");
      const [editEmail, setEditEmail] = useState("");
      const [editPhone, setEditPhone] = useState("");
      const [editStatus, setEditStatus] = useState("");
      
      // Load machine details into edit form
      const handleEdit = (machine) => {
        setSelectedmachine(machine);
        setEditName(machine.name);
        setEditEmail(machine.email);
        setEditPhone(machine.phone);
        setEditStatus(machine.status);
        setOpenEditModal(true);
      };
      
      const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedmachine(null);
      };
      
      const handleSaveChanges = async () => {
        if (!selectedmachine) return;
      
        try {
          const db = getDatabase();
          const orgsRef = ref(db, "organizations");
          const orgSnapshot = await get(orgsRef);
      
          if (orgSnapshot.exists()) {
            const orgData = orgSnapshot.val();
      
            for (const orgId in orgData) {
              const machineList = orgData[orgId].machines;
      
              if (machineList) {
                // Loop through the machineList object to find the machine by machineID
                for (const machineId in machineList) {
                  if (machineId === selectedmachine.machineID) {
                    const updatedData = {
                      name: editName,
                      email: editEmail,
                      phone: editPhone,
                      status: editStatus,
                    };
      
                    // Update the machine's data in this organization
                    const orgmachineRef = ref(db, `organizations/${orgId}/machines/${machineId}`);
                    await update(orgmachineRef, updatedData);
      
                    // Update the UI by updating the machines list in local state
                    setmachines((prevmachines) =>
                      prevmachines.map((machine) =>
                        machine.machineID === selectedmachine.machineID ? { ...machine, ...updatedData } : machine
                      )
                    );
      
                    alert("machine data updated successfully.");
                    handleCloseEditModal(); // Close modal
                    return; // Exit after updating the first matching machine
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error(`Error updating machine: ${error.message}`);
          setError("Failed to update machine data.");
        }
      };
      

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

                                    Machine ID/ Name
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

                                    Images
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

                                    Last Location
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

                                    Last Operation (Time/Date)
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

                                    Recent machines (4-digit PIN)
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


                        <TableCell align="center">
                            <Stack
                                direction={"row"}
                                gap={1}
                                sx={{ width: "100%", justifyContent: "center" }}
                            >
                                <Typography sx={TableStyles.headingStyle}>

                                    Company/ machine Name
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

                                    Part Numbers
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

                                    Lubricant Details
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
                                    Logout time
                                </Typography>
                            </Stack>
                        </TableCell>

                    </TableRow>
                </TableHead>


                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.machineID}
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
                                    <Typography sx={{ color: "#F38712", fontSize: "0.9rem", fontFamily: "Inter", textDecoration: "underline", cursor: "pointer", whiteSpace: "nowrap" }}  >
                                        {/* {row.totalMachines} */}
                                        View Images
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

                                        {row.recentmachinesPin}


                                    </Typography>
                                </Stack>
                            </TableCell>


                            <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                                <Stack
                                    direction={"row"}
                                    justifyContent={"center"}
                                    sx={{ width: "100%" }}
                                >
                                    <Typography sx={{ ...TableStyles.textStyle, color: row.subscriptionStatus == "Active" ? "#28A745" : "#DC3545", }} >

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

                                        {row.recentmachinesPin}


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

                                        {row.recentmachinesPin}


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

                                        {row.recentmachinesPin}


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

                                        {row.recentmachinesPin}


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

                                        {row.recentmachinesPin}


                                    </Typography>
                                </Stack>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>


                <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell align="start">{machine.machineID}</TableCell>
              <TableCell align="start">{machine.details}</TableCell>
              <TableCell align="start">{machine.organizationID}</TableCell>
              <TableCell align="start">{machine.phone}</TableCell>
              <TableCell align="start">{machine.role}</TableCell>

              <TableCell align="start">
                <Box
                  sx={{
                    width: "80px",
                    height: "25px",
                    backgroundColor:
                      machine.status === "active" ? "#ECFDF3" : "#F2F4F7",
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
                        machine.status === "active" ? "#28A745" : "#6C757D",
                    }}
                  />
                  <Typography
                    fontWeight={500}
                    fontSize={"14px"}
                    sx={{
                      color: machine.status === "active" ? "#037847" : "#364254",
                    }}
                    fontFamily={"Inter"}
                  >
                    {machine.status}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell align="start">{machine.lastLogin}</TableCell>
              <TableCell align="start">
                {machine.role === "superAdmin" ? (
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
                ) : machine.id === CurrentmachineID ? (
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
                      onClick={() => handleEdit(machine)}
                      style={{ cursor: "pointer" }}
                      alt="Edit"
                    />
                    <img
                      src={Delete}
                      width="24px"
                      height="24px"
                      onClick={() => handleDeletemachine(machine.id, machine.machines)}
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
                        onClick={() => handleEdit(machine)}
                        style={{ cursor: "pointer" }}
                        alt="Edit"
                      />
                  <img
                    src={Delete}
                    width="24px"
                    height="24px"
                    onClick={() => handleDeletemachine(machine.id, machine.machines)}
                    
                    style={{ cursor: "pointer" }}
                    alt="Delete"
                  />
                </Stack> */}
              </TableCell>
            </TableRow>
          ))}
        
        
                 </TableBody>




            </Table>
        </TableContainer>
    );
}

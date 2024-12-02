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
import MachinesIcon from "../../../assets/Sidebar/MachinesIconSelected.svg";
import { TableStyles } from "../../UI/Styles";

import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";
function createData(
    companyName,
    totalMachines,
    tableotalOperators,
    activeJobSites,
    Users,
    recentUsersPin,
    subscriptionStatus,

) {
    return {
        companyName,
        totalMachines,
        tableotalOperators,
        activeJobSites,
        Users,
        recentUsersPin,
        subscriptionStatus,

    };
}

const rows = [
    createData(
        "OT Tech",
        "643",
        "345",
        "345",
        "3451",
        "3131",
        "123",

    ),
    createData(
        "OT Pro",
        "643",
        "345",
        "345",
        "3451",
        "3123",
        "123",

    ),
];

export default function MachineLogsTable() {
    return (
        <Box sx={{ padding: "1rem 2rem 1rem 1rem", marginRight: "0rem", background: "#FFF" }}>
            <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center" }}> <img src={MachinesIcon} /> </Box>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
                    Machine Logs
                </Typography>
            </Box>
            <TableContainer
                sx={{
                    borderRadius: 0,
                    elevation: 0,
                    borderTop: "1px solid #EAECF0",
                    marginTop: "2.5rem",
                    background: "#FFF",
                    height: "60%",
                    minWidth: "300px", width: "100%"
                    // overflowX: "auto",
                }}
            >
                <Table >
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

                                        Recent Users (4-digit PIN)
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

                                        Maintenance Due (Date/Hours)
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

                                            {row.recentUsersPin}


                                        </Typography>
                                    </Stack>
                                </TableCell>


                                <TableCell align="center" sx={{ margin: "0px", padding: "15px" }}>
                                    <Stack
                                        direction={"row"}
                                        justifyContent={"center"}
                                        sx={{ width: "100%" }}
                                    >
                                        <Typography sx={TableStyles.textStyle} >

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

                                            {row.recentUsersPin}


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

                                            {row.recentUsersPin}


                                        </Typography>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

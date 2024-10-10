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
function createData(
    companyName,
    totalMachines,
    tableotalOperators,
    activeJobSites,
    Users,
    recentUsersPin,
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
        Users,
        recentUsersPin,
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

                                    Company/ User Name
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
                                    <Typography sx={{ color: "#F38712", fontSize: "0.9rem", fontFamily: "Inter", textDecoration: "underline", cursor: "pointer" }}  >
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
    );
}

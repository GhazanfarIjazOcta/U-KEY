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
import { Box, Button, Stack, Typography } from "@mui/material";
import OperatorsIcon from "../../../assets/Sidebar/OperatorsIconSelected.svg";

import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";
import { TableStyles } from "../../UI/Styles";
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

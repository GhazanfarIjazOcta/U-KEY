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
        </TableBody>
      </Table>
    </TableContainer>
  );
}

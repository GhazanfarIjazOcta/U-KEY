import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDown from "../../../assets/Table/arrow-down.png";
import smallArrow from "../../../assets/Table/smallArrow.png";
import { Box, Stack, Typography } from "@mui/material";
import Edit from "../../../assets/Table/Edit.png";
import Delete from "../../../assets/Table/Delete.png";
function createData(
  UserID,
  Name,
  Email,
  Phone_number,
  Role,
  Status,
  Last_Login,
  Action
) {
  return {
    UserID,
    Name,
    Email,
    Phone_number,
    Role,
    Status,
    Last_Login,
    Action,
  };
}

const rows = [
  createData(
    1,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    2,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    3,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    4,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    5,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    6,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    7,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    8,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    9,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Active",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
  createData(
    10,
    "John Doe",
    "john.doe@example.com",
    "555 - 1234",
    "Admin",
    "Inactive",
    "2024-08-05 09:15 AM",
    "Edit/Delete"
  ),
];

export default function TableContent() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 0,
        elevation: 0,
        borderTop: "1px solid #EAECF0",
        height: "54vh",
        width: "99%", overflow: "none",
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
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  User ID
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Name
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Email
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Phone Number
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Role
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Status
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="start">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "start" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
                  Last Login
                </Typography>
                <img src={ArrowDown} height={"16px"} width={"16px"} />
              </Stack>
            </TableCell>
            <TableCell align="center">
              <Stack
                direction={"row"}
                gap={1}
                sx={{ width: "100%", justifyContent: "center" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"12px"}
                  sx={{ color: "#667085" }}
                  fontFamily={"Inter"}
                >
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
                sx={{ margin: "0px", padding: "10px" }}
              >
                <Typography
                  fontWeight={500}
                  fontSize={"14px"}
                  sx={{ color: "#3D4149" }}
                  fontFamily={"Inter"}
                >
                  {row.UserID}
                </Typography>
              </TableCell>
              <TableCell align="start" sx={{ margin: "0px", padding: "13px" }}>
                <Typography
                  fontWeight={400}
                  fontSize={"14px"}
                  sx={{ color: "#3D4149" }}
                  fontFamily={"Inter"}
                >
                  {row.Name}
                </Typography>
              </TableCell>
              <TableCell align="start" sx={{ margin: "0px", padding: "13px" }}>
                <Typography
                  fontWeight={400}
                  fontSize={"14px"}
                  sx={{ color: "#3D4149" }}
                  fontFamily={"Inter"}
                >
                  {row.Email}
                </Typography>
              </TableCell>
              <TableCell align="start" sx={{ margin: "0px", padding: "13px" }}>
                <Typography
                  fontWeight={400}
                  fontSize={"14px"}
                  sx={{ color: "#3D4149" }}
                  fontFamily={"Inter"}
                >
                  {row.Phone_number}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "13px" }}>
                <Stack
                  direction={"row"}
                  gap={1}
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={400}
                    fontSize={"14px"}
                    sx={{ color: "#3D4149" }}
                    fontFamily={"Inter"}
                  >
                    {row.Role}
                  </Typography>
                  <img src={smallArrow} height={"6px"} width={"7px"} />
                </Stack>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "13px" }}>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  sx={{ width: "100%" }}
                >
                  <Box
                    sx={{
                      width: "80px",
                      height: "25px",
                      backgroundColor:
                        row.Status == "Active" ? "#ECFDF3" : "#F2F4F7",
                      borderRadius: "40%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 6, // Adjust size as needed
                        height: 6, // Adjust size as needed
                        borderRadius: "50%",
                        backgroundColor:
                          row.Status == "Active" ? "#28A745" : "#6C757D",
                      }}
                    />
                    <Typography
                      fontWeight={500}
                      fontSize={"14px"}
                      sx={{
                        color: row.Status == "Active" ? "#037847" : "#364254",
                      }}
                      fontFamily={"Inter"}
                    >
                      {row.Status}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="start" sx={{ margin: "0px", padding: "13px" }}>
                <Typography
                  fontWeight={400}
                  fontSize={"14px"}
                  sx={{ color: "#3D4149" }}
                  fontFamily={"Inter"}
                >
                  {row.Last_Login}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ margin: "0px", padding: "13px" }}>
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

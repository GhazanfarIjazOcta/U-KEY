import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import MaintenanceIcon from "../../../assets/Sidebar/MaintenanceIconSelected.svg";
import RadioButtonLogo from "../../../assets/Maintenance_Scheduling/RadioButton.png";
import Vehicle from "../../../assets/Maintenance_Scheduling/Vehicle.png";
import Hardware from "../../../assets/Maintenance_Scheduling/HardwareLogo.png";
import Arrowdown from "../../../assets/Card/fi_chevron-down.png";
import CrossIcon from "../../../assets/Table/CrossIcon.png";
import { useNavigate } from "react-router-dom";
import { maintenanceSchedulingStyles } from "../../UI/Main";
import MaintenanceTableContent from "../Table/MaintenanceTableContent";
import TablePagination from "../Pagination/TablePagination";

function Maintenance() {
  const navigate = useNavigate();
  return (
    <Box mt={12}
      sx={{
        position: "absolute",
        mt: { xs: 5, sm: 5, md: 5, lg: 5 },
        // Adjust padding based on the screen size
        px: { xs: 2, sm: 2, md: 2, lg: 0 }, // Remove padding at larger screens where sidebar becomes toggle
        ml: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, // Leave space for the sidebar on larger screens
        overflow: "none", // Prevent overflowing horizontally and vertically
        width: { lg: "82%", xs: "95%" }, // Ensure it takes full width
        // maxWidth: "1200px", // Set a max width as needed
      }}
    >
      {/* <Paper sx={maintenanceSchedulingStyles.headerMainContainer} >
        <Stack p={3} mr={2} direction={"row"} height={"40px"} >
          <Stack
            width={"30%"}
            direction={"row"}
            alignItems={"center"}
            gap={"8%"}
          >
            <Box sx={maintenanceSchedulingStyles.boxContainer}>
              <img src={MaintenanceLogo} height={"24px"} width={"24px"} />
            </Box>
            <Typography sx={maintenanceSchedulingStyles.mainenanceText}>
              Maintenance Scheduling
            </Typography>
            <Typography sx={maintenanceSchedulingStyles.mainenanceText2}>
              05
            </Typography>
          </Stack>
          <Stack
            width={"70%"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            direction={"row"}
            gap={6}
          >
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <img src={RadioButtonLogo} height={"24px"} width={"24px"} />
              <img src={Vehicle} height={"24px"} width={"24px"} />
              <Typography sx={maintenanceSchedulingStyles.vehicalText}>
                Vehicles
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <img src={RadioButtonLogo} height={"24px"} width={"24px"} />
              <img src={Hardware} height={"24px"} width={"24px"} />
              <Typography sx={maintenanceSchedulingStyles.vehicalText}>
                Devices
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={2} ml={3}>
              <Box>
                <TextField
                  placeholder="Status"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ marginRight: 0 }}>
                        <IconButton sx={{ padding: 0 }}>
                          {
                            <img
                              src={Arrowdown}
                              height={"16px"}
                              width={"20px"}
                            />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "44px", // Adjust the height as needed
                      width: { xs: "100%", sm: "140px" }, // Responsive width
                    },
                  }}
                />
              </Box>
              <Box>
                <TextField
                  placeholder="7/6/2024 - 5/8-2024"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ marginRight: 0 }}>
                        <IconButton sx={{ padding: 0 }}>
                          {
                            <img
                              src={CrossIcon}
                              height={"16px"}
                              width={"16px"}
                            />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "44px", // Adjust the height as needed
                      width: { xs: "100%", sm: "210px" }, // Responsive width
                    },
                  }}
                />
              </Box>
            </Stack>
            <Typography
              sx={maintenanceSchedulingStyles.historyText}
              onClick={() => navigate("/history")}
            >
              Go to History
            </Typography>
          </Stack>
        </Stack>
      </Paper> */}
      <Box sx={{ padding: { lg: "1rem 4rem 1rem 1rem", xs: "1rem 1rem 1rem 1rem" }, marginRight: "2rem", background: "#FFF", }}>
        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center" }}> <img src={MaintenanceIcon} /> </Box>
          <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
            Maintenance Status
          </Typography>
        </Box>
        <MaintenanceTableContent />
        <TablePagination />
      </Box>
    </Box>
  );
}

export default Maintenance;

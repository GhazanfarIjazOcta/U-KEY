import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OutlinedCard from "../Card/Card";
import ActiveLogo from "../../../assets/Card/ActiveLogo.png";
import InActiveLogo from "../../../assets/Card/InActiveLogo.png";
import DevicesLogo from "../../../assets/Card/DevicesLogo.png";
import MachinesIcon from "../../../assets/Sidebar/MachinesIconSelected.svg";
import TableHeader from "../TableHeader/TableHeader";
import TablePagination from "../Pagination/TablePagination";
import { Typography } from "@mui/material";
import MachinesTableContent from "../Table/MachinesTableContent";

export default function Machines() {
  return (
    <Box sx={{
      position: "absolute",
      mt: { xs: 5, sm: 5, md: 5, lg: 5 },
      // Adjust padding based on the screen size
      px: { xs: 2, sm: 2, md: 2, lg: 0 }, // Remove padding at larger screens where sidebar becomes toggle
      ml: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, // Leave space for the sidebar on larger screens
      overflow: "none", // Prevent overflowing horizontally and vertically
      width: { lg: "82%", xs: "95%" }, // Ensure it takes full width
    }} >

      {/* <Grid container
        spacing={2} a
        sx={{
          flexGrow: 1,
          flexWrap: "wrap",
        }}>


        <Grid item xs={13} sm={4} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"All Devices"} icon={DevicesLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Active"} icon={ActiveLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"InActive"} icon={InActiveLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Malfunctioning"} icon={MalfunctioningLogo} />
        </Grid>


      </Grid> */}




      {/* 
      <TableHeader
        text={"Device Management"}
        searchText={"Device"}
        buttonText={"Add Device"}
        icon={DevicesLogo}
        route={"/add-device"}
      />
      <TablePagination count={5} currentPageResults={3} /> */}


      <Box sx={{ padding: { lg: "1rem 4rem 1rem 1rem", xs: "1rem 1rem 1rem 1rem" }, marginRight: "2rem", background: "#FFF", }}>
        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center" }}> <img src={MachinesIcon} /> </Box>
          <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
            Machines
          </Typography>
        </Box>
        <MachinesTableContent />
      </Box>

    </Box>
  );
}

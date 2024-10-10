import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OutlinedCard from "../Card/Card";
import ActiveLogo from "../../../assets/Card/ActiveLogo.png";
import InActiveLogo from "../../../assets/Card/InActiveLogo.png";
import OperatorsIcon from "../../../assets/Sidebar/OperatorsIconSelected.svg";
import TableHeader from "../TableHeader/TableHeader";
import TablePagination from "../Pagination/TablePagination";
import { Button, Typography } from "@mui/material";
import OperatorsTableContent from "../Table/OperatorsTableContent";

export default function Operators() {
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
        spacing={2} 
        sx={{
          flexGrow: 1,
          flexWrap: "wrap",
        }}>

        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"All Drivers"} icon={InActiveLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"On Duty"} icon={ActiveLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Off Duty"} icon={InActiveLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Available"} icon={MalfunctioningLogo} />
        </Grid>

      </Grid> */}



      <Box sx={{ padding: { lg: "1rem 4rem 1rem 1rem", xs: "1rem 1rem 1rem 1rem" }, marginRight: "2rem", background: "#FFF", }}>
        <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center" }}> <img src={OperatorsIcon} /> </Box>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
              Operators
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              height: "38px",
              backgroundColor: "#15294E",
              color: "white",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#15294E",
              },
            }}
          >
            Request To access
          </Button>
        </Box>


        <OperatorsTableContent />
      </Box>



    </Box>
  );
}

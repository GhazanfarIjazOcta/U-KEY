import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OutlinedCard from "../Card/Card";
import UserLogo from "../../../assets/Card/user.png";
import AdminLogo from "../../../assets/Card/adminIcon.png";
import DriverLogo from "../../../assets/Card/DriversLogo.png";
import GuestLogo from "../../../assets/Card/GuestLogo.png";
import TableHeader from "../TableHeader/TableHeader";
import TableContent from "../Table/UserManagmentTableContent";
import TablePagination from "../Pagination/TablePagination";

import { auth } from "../../../firebase";

import { useUser } from "../../../Context/UserContext";


export default function UserManagment() {

  const { user, updateUserData } = useUser(); // Destructure user data from context
  const sidebarWidth = 12; // Adjust this based on your sidebar's width

  console.log("here is the user info " , auth.currentUser)
  return (
    <Box
      sx={{
        position: "absolute",
        mt: { xs: 13, sm: 12, md: 12, lg: 12 },
        // Adjust padding based on the screen size
        px: { xs: 2, sm: 2, md: 2, lg: 0 }, // Remove padding at larger screens where sidebar becomes toggle
        ml: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }, // Leave space for the sidebar on larger screens
        overflow: "none", // Prevent overflowing horizontally and vertically
        width: "82%", // Ensure it takes full width
        // maxWidth: "1200px", // Set a max width as needed

      }}
    >
      <Grid
        container
        spacing={2} a
        sx={{
          flexGrow: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Allow the cards to shrink when zoomed in */}
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"All Users"} icon={UserLogo} />
        </Grid>
        
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Admin"} icon={AdminLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Drivers"} icon={DriverLogo} />
        </Grid>
        <Grid item xs={13} sm={6} md={2.98} sx={{ flexShrink: 1 }}>
          <OutlinedCard text={"Guest"} icon={GuestLogo} />
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Box mt={2} >
          <TableHeader
            text={"User Management"}
            searchText={"User name"}
            buttonText={"Add User"}
            route={"add-user"}
          />
        </Box>

        <Box sx={{ overflowX: "none", width: "100%" }}>
          <TableContent />
        </Box>

        <TablePagination />
      </Box>


    </Box>
  );
}

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import MaintenanceIcon from "../../../assets/Sidebar/MaintenanceIconSelected.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function DashboardMaintenanceCard({ }) {

  const [activeTab, setActiveTab] = useState("history")

  return (
    <Box sx={{ mt: { xs: 1, md: 0 } }}>
      <Card
        variant="outlined"
        sx={{
          border: "none",
          boxShadow: "none",
          height: "350px",
          overflowY: "auto",
          padding: "0.5rem 0.5rem"
        }}
      >
        <>

          <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "start", justifyContent: "space-between", marginBottom: "0rem", padding: "1rem 2rem 0.5rem 1rem", flexFlow: "wrap" }}>
            <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "start", }}>
              <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center" }}> <img src={MaintenanceIcon} /> </Box>
              <Box pt={"0.4rem"}>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
                  Maintenance Status
                </Typography>


                <Box sx={{ border: "1px solid #F3F3F3", marginTop: "1rem", borderRadius: "0.2rem", boxShadow: "0px 1px 8px 0px #00000005", width: 120, padding: "0.3rem", display: "flex", gap: "0.5rem", flexFlow: "wrap", alignItems: "center" }}>
                  <Typography onClick={() => setActiveTab("upcoming")} sx={{ fontFamily: "Inter", fontSize: "0.75rem", color: activeTab === "upcoming" ? "#F38712" : "#7E939A", cursor: "pointer" }}>
                    upcoming
                  </Typography>
                  <Divider orientation="vertical" sx={{ border: "1px solid #E2E2E2", height: "1.2rem" }} />
                  <Typography onClick={() => setActiveTab("history")} sx={{ fontFamily: "Inter", fontSize: "0.75rem", color: activeTab === "history" ? "#F38712" : "#7E939A", cursor: "pointer" }}>
                    History
                  </Typography>
                </Box>
              </Box>

            </Box>

            <Button
              variant="text"
              sx={{
                color: "#F38712",
                textTransform: "none",
                fontWeight: 500,
                fontFamily: "Poppins",
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

          <Box sx={{ display: "flex", flexFlow: "wrap", gap: "2rem", justifyContent: "center", alignItems: "center", padding: "1rem" }}>
            <Box sx={{ borderRadius: "0.75rem", boxShadow: "0px 4px 10.2px 0px #0000000F", minWidth: 210, width: "45%", minHeight: 60, padding: "0.5rem", display: "flex", gap: "0.5rem", flexFlow: "wrap", alignItems: "center", position: "relative" }}>

              <Typography sx={{ position: "absolute", fontFamily: "Inter", fontSize: "0.75rem", color: "#7E939A", top: 10, right: 15 }}>
                12/2/24
              </Typography>
              <Box paddingLeft={"1rem"}>
                <Typography sx={{ color: "#202020", fontFamily: "Poppins", fontSize: "0.75rem", fontWeight: 500 }}>
                  Hydraulic
                </Typography>
                <Typography sx={{ color: "#47464A", fontFamily: "Poppins", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                  Machine / Company
                </Typography>
              </Box>

            </Box>

            <Box sx={{ borderRadius: "0.75rem", boxShadow: "0px 4px 10.2px 0px #0000000F", minWidth: 210, width: "45%", minHeight: 60, padding: "0.5rem", display: "flex", gap: "0.5rem", flexFlow: "wrap", alignItems: "center", position: "relative" }}>

              <Typography sx={{ position: "absolute", fontFamily: "Inter", fontSize: "0.75rem", color: "#7E939A", top: 10, right: 15 }}>
                12/2/24
              </Typography>
              <Box paddingLeft={"1rem"}>
                <Typography sx={{ color: "#202020", fontFamily: "Poppins", fontSize: "0.75rem", fontWeight: 500 }}>
                  Hydraulic
                </Typography>
                <Typography sx={{ color: "#47464A", fontFamily: "Poppins", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                  Machine / Company
                </Typography>
              </Box>

            </Box>
            <Box sx={{ borderRadius: "0.75rem", boxShadow: "0px 4px 10.2px 0px #0000000F", minWidth: 210, width: "45%", minHeight: 60, padding: "0.5rem", display: "flex", gap: "0.5rem", flexFlow: "wrap", alignItems: "center", position: "relative" }}>

              <Typography sx={{ position: "absolute", fontFamily: "Inter", fontSize: "0.75rem", color: "#7E939A", top: 10, right: 15 }}>
                12/2/24
              </Typography>
              <Box paddingLeft={"1rem"}>
                <Typography sx={{ color: "#202020", fontFamily: "Poppins", fontSize: "0.75rem", fontWeight: 500 }}>
                  Hydraulic
                </Typography>
                <Typography sx={{ color: "#47464A", fontFamily: "Poppins", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                  Machine / Company
                </Typography>
              </Box>

            </Box>
            <Box sx={{ borderRadius: "0.75rem", boxShadow: "0px 4px 10.2px 0px #0000000F", minWidth: 210, width: "45%", minHeight: 60, padding: "0.5rem", display: "flex", gap: "0.5rem", flexFlow: "wrap", alignItems: "center", position: "relative" }}>

              <Typography sx={{ position: "absolute", fontFamily: "Inter", fontSize: "0.75rem", color: "#7E939A", top: 10, right: 15 }}>
                12/2/24
              </Typography>
              <Box paddingLeft={"1rem"}>
                <Typography sx={{ color: "#202020", fontFamily: "Poppins", fontSize: "0.75rem", fontWeight: 500 }}>
                  Hydraulic
                </Typography>
                <Typography sx={{ color: "#47464A", fontFamily: "Poppins", fontSize: "0.75rem", marginTop: "0.3rem" }}>
                  Machine / Company
                </Typography>
              </Box>

            </Box>

          </Box>
        </>
      </Card>
    </Box>
  );
}

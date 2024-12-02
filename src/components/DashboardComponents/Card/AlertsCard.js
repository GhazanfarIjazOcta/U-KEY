import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import AlertIcon from '../../../assets/Sidebar/AlertIcon.svg';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import MachinesIcon from "../../../assets/Sidebar/MachinesIconSelected.svg"


function AlertsCard() {



    return (
        <Box sx={{ background: "#FFF", padding: "1rem 1rem", gap: "1.5rem", display: "flex", flexDirection: "column", height: 250, overflowY: "auto" }}>


            <Box sx={{ display: "flex", gap: "1.5rem", alignItems: "center", }}>
                <Box sx={{ width: 44, height: 40, background: "#FEF2E5", borderRadius: "0.7rem", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                    <img src={AlertIcon} />
                    <Box sx={{
                        position: "absolute", borderRadius: "50%", width: 13, height: 13, background: "#F75151", top: -5, right: -5, display: "flex", justifyContent: "center", alignItems: "center"
                    }}>
                        <span style={{ fontSize: "0.6rem", color: "#FFF" }}>10</span>
                    </Box>
                </Box>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "0.8rem", color: "#909097" }}>
                    Alerts
                </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", paddingRight: "0.5rem" }}>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "0.6rem", color: "#7C7C7C" }}>New</Typography>
                <Divider sx={{ background: "1px #7C7C7C", width: "90%", }} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", paddingRight: "1rem" }}>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <img src={MachinesIcon} width={17} />
                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "0.75rem", color: "#373737"
                    }}>Forklift #10 requires engine oil replacement, overdue by 5 days. </Typography>
                </Box>
                <CircleSharpIcon
                    sx={{ color: "#FE9B10", fontSize: "0.5rem" }}
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", paddingRight: "1rem" }}>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <img src={MachinesIcon} width={17} />
                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "0.75rem", color: "#373737"
                    }}>Forklift #10 requires engine oil replacement, overdue by 5 days. </Typography>
                </Box>
                <CircleSharpIcon
                    sx={{ color: "#FE9B10", fontSize: "0.5rem" }}
                />
            </Box>


            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", paddingRight: "0.5rem" }}>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "0.6rem", color: "#7C7C7C" }}>Previous</Typography>
                <Divider sx={{ background: "1px #7C7C7C", width: "90%", }} />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", paddingRight: "1rem" }}>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <img src={MachinesIcon} width={17} />
                    <Typography sx={{
                        fontFamily: "Poppins", fontSize: "0.75rem", color: "#373737"
                    }}>Forklift #10 requires engine oil replacement, overdue by 5 days. </Typography>
                </Box>
                <CircleSharpIcon
                    sx={{ color: "#FE9B10", fontSize: "0.5rem" }}
                />
            </Box>

        </Box>
    )
}

export default AlertsCard

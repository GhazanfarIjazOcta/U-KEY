import React from "react";
import {
    Box,
    Grid2,
} from "@mui/material";

import DashboardCard from "../Card/DashboardCard";
import DevicesCard from "../Card/DevicesCard";
import DevicesLogo from "../../../assets/Card/DevicesLogo.png";
import VehicleLogo from "../../../assets/Card/VehicleLogo.png";
import DriversLogo from "../../../assets/Card/DriversLogo.png";
import user from "../../../assets/Card/user.png";
import DashboardMaintenanceCard from "../Card/DashboardMaintenanceCard";
import DashboardLocationCard from "../Card/DashboardLocationCard";
import MachineLogsTable from "../Table/MachineLogsTable";
import RecentActivityLogsTable from "../Table/RecentActivityLogsTable";
import AllOperatorsTable from "../Table/AllOperatorsTable";
import TotalCard from "../Card/TotalCard";
import AlertsCard from "../Card/AlertsCard";

export default function Main() {
    return (

        <Box sx={{
            flexGrow: 1, position: 'absolute',
            mt: { xs: 0, sm: 0, md: 0, lg: 5 },
            overflowY: "auto",
            height: "85vh",
            background: "#F4F7F7",
            gap: "0.5rem",
            width: { lg: "82%", xs: "100%" },// Prevent overflowing horizontally and vertically
        }} >

            <Grid2
                container
                spacing={1}
                mt={1}
                pr={{ lg: 2 }}
                columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            >


                <Grid2 container size={{ xs: 12, sm: 12, md: 6.5 }}>
                    <Grid2 container spacing={1} style={{ display: 'flex', alignItems: 'stretch', margin: 0, }}>
                        <Grid2 item size={{ xs: 12, sm: 5, md: 5 }} style={{ display: 'flex', padding: 0, }}>
                            <TotalCard
                                icon={"CompaniesIcon"}
                                title={"Total Companies"}
                                totalNumber={"06"}
                                activeNumber={"13"}
                                inactiveNumber={"13"}
                                maintenanceNumber={null}
                            />
                        </Grid2>
                        <Grid2 item size={{ xs: 12, sm: 7, md: 7 }} style={{ display: 'flex', padding: 0, }}>
                            <TotalCard
                                icon={"MachinesIcon"}
                                title={"Total Machines"}
                                totalNumber={"06"}
                                activeNumber={"13"}
                                inactiveNumber={"13"}
                                maintenanceNumber={"12"}
                            />
                        </Grid2>
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <DashboardLocationCard />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <RecentActivityLogsTable />
                    </Grid2>
                </Grid2>


                <Grid2 container spacing={1} size={{ xs: 12, sm: 12, md: 5.5 }}>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} >
                        <AlertsCard />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <AllOperatorsTable />
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                        <DashboardMaintenanceCard />
                    </Grid2>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 12 }} >
                    <MachineLogsTable />
                </Grid2>


            </Grid2>
        </Box >

    );
}


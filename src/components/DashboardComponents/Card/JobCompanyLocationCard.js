import { Box, Typography } from '@mui/material'
import React from 'react'

function JobCompanyLocationCard() {
    return (
        <Box sx={{ padding: "0.5rem", background: "#FFF", height: "100%", maxHeight: 340, boxShadow: "0px 1px 4px 0px #00000014", maxWidth: 250 }}>
            <Box sx={{ gap: "1.5rem", padding: "1rem" }}>
                <Typography sx={{
                    fontFamily: "Inter", fontSize: "0.8rem", color: "#3D4149"
                }} > Company:  <span style={{ color: "#3D4149", fontWeight: 600 }}>Name </span> </Typography>
                <Typography sx={{
                    fontFamily: "Inter", fontSize: "0.8rem", color: "#3D4149"
                }} > Location:   <span style={{ color: "#3D4149", fontWeight: 600 }}>location A BX </span> </Typography>
            </Box>
            <Box height={{ md: "240px", xs: "220px" }} pl={"7px"} pr={"7px"}>
                <iframe
                    width={"100%"}
                    height={"100%"}
                    borderRadius="0px"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: "0px" }}
                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33.6074086!2d73.100091!3dYOUR_ZOOM_LEVEL!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfeb96a77dbcff%3A0x936bce527a1d6838!2sOctathorn+Technologies!5e0!3m2!1sen!2sus!4vYOUR_EMBED_API_KEY"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d330400.5089714776!2d-118.243683!3d34.052235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c5d4b2f1f7db%3A0x8c4f2ef328e24f6c!2sLos+Angeles%2C+CA!5e0!3m2!1sen!2sus!4vYOUR_EMBED_API_KEY"
                    allowFullScreen
                    title="Google Map"
                ></iframe>
            </Box>

        </Box>
    )
}

export default JobCompanyLocationCard

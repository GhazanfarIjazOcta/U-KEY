import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { loginLeftContentContainerItemWidth } from "../../UI/styles/Login";
import Arrowdown from "../../../assets/Card/fi_chevron-down.png";
import { addUserStyles } from "../../UI/Main";

function AddUser() {
  return (
    <Paper sx={addUserStyles.mainContainerStyles}>
      <Box sx={addUserStyles.container} pl={8}>
        <Box>
          <Box sx={loginLeftContentContainerItemWidth}>
            <Typography
              variant="subtitle1"
              mt={4}
              mb={1}
              style={{ fontWeight: 500 }}
            >
              User Id
            </Typography>
            <TextField
              sx={addUserStyles.textFieldStyles}
              label="Enter User ID"
            />
          </Box>
          <Box sx={loginLeftContentContainerItemWidth}>
            <Typography
              variant="subtitle1"
              mt={3}
              mb={1}
              style={{ fontWeight: 500 }}
            >
              Name
            </Typography>
            <TextField sx={addUserStyles.textFieldStyles} label="Enter Name" />
          </Box>
          <Box sx={loginLeftContentContainerItemWidth}>
            <Typography
              variant="subtitle1"
              mt={3}
              mb={1}
              style={{ fontWeight: 500 }}
            >
              Email
            </Typography>
            <TextField sx={addUserStyles.textFieldStyles} label="Enter Email" />
          </Box>
          <Box sx={loginLeftContentContainerItemWidth}>
            <Typography
              variant="subtitle1"
              mt={3}
              mb={1}
              style={{ fontWeight: 500 }}
            >
              Phone number
            </Typography>
            <TextField
              sx={addUserStyles.textFieldStyles}
              label="Enter Phone number"
            />
          </Box>
          <Box sx={loginLeftContentContainerItemWidth}>
            <Typography
              variant="subtitle1"
              mt={3}
              mb={1}
              style={{ fontWeight: 500 }}
            >
              Role
            </Typography>
            <TextField
              placeholder="Select Role"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: 0 }}>
                    <IconButton sx={{ padding: 0 }}>
                      {<img src={Arrowdown} height={"16px"} width={"20px"} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px", // Adjust the height as needed
                  marginLeft: "5px",
                },
                width: "35%",
              }}
            />
          </Box>
          <Box sx={loginLeftContentContainerItemWidth}>
            <Typography
              variant="subtitle1"
              mt={3}
              mb={1}
              style={{ fontWeight: 500 }}
            >
              Status
            </Typography>
            <TextField
              placeholder="Select Status"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ marginRight: 0 }}>
                    <IconButton sx={{ padding: 0 }}>
                      {<img src={Arrowdown} height={"16px"} width={"20px"} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50px", // Adjust the height as needed
                  marginLeft: "5px",
                },
                width: "35%",
              }}
            />
          </Box>
        </Box>
        <Stack
          sx={{
            gap: "24px",
          }}
          mt={6}
          ml={1}
        >
          <Button variant="contained" sx={addUserStyles.buttonStyles}>
            Add
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default AddUser;

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import {
  auth,
  rtdb,
  ref,
  set,
  get,
} from "../../../firebase";
import { useUser } from "../../../Context/UserContext";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete"; // For removing images

function AddMachine() {
  const [formData, setFormData] = useState({
    machineID: "",
    images: [],  // Array to hold image files temporarily
    defaultCode: "",
    assignedTo: " ",
    maintenance: [],
    status: "inactive",
    loginTime: "",
    logoutTime: "",
    organizationID: "",
    recentUsers: [],
    lastLocation: "",
  });

  const { user } = useUser();
  const CurrentUserID = user.uid;
  const CurrentOrganizationID = user.organizationID;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMachine = async () => {
    console.log("Current User UID:", auth.currentUser.uid);
    try {
      const loggedInAdminUid = auth.currentUser?.uid;

      const adminRef = ref(rtdb, `organizations/${CurrentOrganizationID}/users/${loggedInAdminUid}`);
      const adminSnapshot = await get(adminRef);

      if (!adminSnapshot.exists()) throw new Error("Admin details not found.");
      const adminData = adminSnapshot.val();
      const adminOrgId = adminData.organizationID;

      try {
        // Upload images to Cloudinary and get the URLs
        const imageUrls = {};
        for (let i = 0; i < formData.images.length; i++) {
          const formDataCloud = new FormData();
          formDataCloud.append("file", formData.images[i].file);
          formDataCloud.append("upload_preset", "U-KEY-Images");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dbhnt7uqd/image/upload`,
            formDataCloud
          );
          // Assigning each image URL to corresponding image fields (image1, image2, image3)
          imageUrls[`image${i + 1}`] = response.data.secure_url;
        }

        const newMachine = {
          machineID: formData.machineID,
          image: imageUrls,  // Store image URLs under image1, image2, and image3
          defaultCode: formData.defaultCode,
          assignedTo: formData.assignedTo || " ",
          maintenance: formData.maintenance.length
            ? formData.maintenance
            : [{ nextMaintenance: "2024-10-01", recentMaintenance: "2024-08-01", maintenanceDetails: "Oil change and filter replacement", status: "Completed" }],
          status: formData.status,
          loginTime: "",
          logoutTime: "",
          organizationID: adminOrgId,
          recentUsers: formData.recentUsers.length ? formData.recentUsers : [],
          lastLocation: formData.lastLocation || "",
        };

        const newMachineRef = ref(rtdb, `organizations/${adminOrgId}/machines/${newMachine.machineID}`);
        await set(newMachineRef, newMachine);

        console.log("New Machine added successfully!");
        alert("Machine added successfully");

        setFormData({
          machineID: "",
          images: [],  // Clear images after submission
          defaultCode: "machineip",
          assignedTo: "1234",
          maintenance: [],
          status: "inactive",
          loginTime: "NA",
          logoutTime: "NA",
          organizationID: "",
          recentUsers: [],
          lastLocation: "",
        });

      } catch (error) {
        console.error("Error uploading images or adding machine:", error.message);
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      alert(`Failed to add user: ${error.message}`);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const currentImages = formData.images || [];

    if (currentImages.length + files.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    }

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prevData) => ({
      ...prevData,
      images: [...currentImages, ...newImages],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Box>
        {["machineID", "defaultCode", "assignedTo", "lastLocation", "status"].map((field) => (
          <Box key={field} sx={{ marginBottom: 2 }}>
            <Typography>{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
            <TextField
              name={field}
              type={field === "password" ? "password" : "text"}
              value={formData[field]}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        ))}

        {/* Image Upload Section */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography>Upload Images (Max 3)</Typography>
          <input type="file" multiple onChange={handleImageUpload} accept="image/*" />
          <Box display="flex" mt={2}>
            {formData.images.map((img, index) => (
              <Box key={index} sx={{ position: "relative", marginRight: 2 }}>
                <img
                  src={img.preview}
                  alt={`preview-${index}`}
                  width={80}
                  height={80}
                  style={{ borderRadius: 8 }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" onClick={handleAddMachine}>
          Add Machine
        </Button>
      </Stack>
    </Paper>
  );
}

export default AddMachine;

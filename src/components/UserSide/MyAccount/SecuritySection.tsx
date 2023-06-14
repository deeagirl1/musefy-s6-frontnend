import React from "react";
import userService from "../../../services/UserService";
import { getDecodedToken } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";


const SecuritySection: React.FC = () => {
  const navigate = useNavigate();
  const userId = getDecodedToken();
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      const decodedToken = getDecodedToken() as { userId: string };
      const userId = decodedToken.userId// Replace with the appropriate way to retrieve the userId
      console.log(userId);
      userService.deleteUser(userId)
        .then((success) => {
          if (success) {
            // Account deleted successfully, perform any necessary cleanup or redirection
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleExportData = () => {
    userService.downloadData()
      .then((success) => {
        if (success) {
          // Data exported successfully, initiate the download or handle the response
          console.log('Data exported successfully');
        } else {
          // Data export failed
          console.error('Failed to export data');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangePassword = () => {
    // Logic for changing the password
    // Call the changePassword function from your backend API with the userId
  }

  return (
    <Box my={4}>
      <Typography variant="h2">Security</Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1db954" }}
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
      </Box>
      <Box mt={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#1db954" }}
          onClick={handleExportData}
        >
          Download personal data
        </Button>
      </Box>
      <Box mt={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FF0000" }}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
      </Box>
    </Box>
  );
};

export default SecuritySection;

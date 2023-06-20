import React from "react";
import userService from "../../../services/UserService";
import { getDecodedToken } from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { RootState } from "../../../store";
import Cookies from "js-cookie";

const SecuritySection: React.FC = () => {
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  // console.log(userId);

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      userService.deleteUser(userId as string)
        .then((success) => {
          if (success) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

const handleExportData = () => {
  userService.downloadData(userId as string)
    .then((success) => {
      if (success) {
        console.log('Data exported successfully');
      } else {
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
function useSelector(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}


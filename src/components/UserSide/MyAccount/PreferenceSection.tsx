import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";


const PreferencesSection: React.FC = () => {
  return (
    <Box my={4}>
      <Typography variant="h2">Preferences</Typography>
      <Box mt={2}>
        <FormControlLabel control={<Checkbox />} label="Option 1" />
      </Box>
      <Box mt={2}>
        <FormControlLabel control={<Checkbox />} label="Option 2" />
      </Box>
      {/* Add more fields or components for preferences */}
    </Box>
  );
};

export default PreferencesSection;

import React from 'react';
import { Container, Typography } from '@mui/material';
import PersonalInfoSection from '../components/UserSide/MyAccount/PersonalInfoSection';
import PreferencesSection from '../components/UserSide/MyAccount/PreferenceSection';
import SecuritySection from '../components/UserSide/MyAccount/SecuritySection';

const MyAccountPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h1">My Account</Typography>
      <PersonalInfoSection />
      <PreferencesSection />
      <SecuritySection />
    </Container>
  );
};

export default MyAccountPage;

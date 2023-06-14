import React, { useState } from "react";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
import { connect } from "react-redux";
import { useMediaQuery, Container, Typography, TextField, FormControlLabel, Checkbox, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

export const Register: React.FC = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const changeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const changeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleTermsAcceptedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAccepted(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      username &&
      password &&
      email &&
      firstName &&
      lastName &&
      termsAccepted
    ) {
      props.registerUser(username, password, email, firstName, lastName)
        .then((response: any) => {
          navigate("/");
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create an account
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={changeUsername}
        />
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={changeFirstName}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={changeLastName}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={changeEmail}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={changePassword}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={handleTermsAcceptedChange}
            />
          }
          label="I accept the Terms & Conditions"
        />
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={handleOpenDialog}
          sx={{ mt: 2 }}
        >
          View Terms & Conditions
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, bgcolor: "#1db954" }}
        >
          Register
        </Button>

        {/* Terms and Conditions Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullScreen={isMobile}
        >
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogContent dividers>
            <DialogContentText style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <div>
                <Typography variant="h6">1. Introduction</Typography>
                <Typography>
                  By accessing or using the Musefy platform ("Platform") and its
                  services ("Services"), you agree to comply with these Terms
                  and Conditions. These Terms and Conditions govern the use of
                  the Platform and the processing of personal data in accordance
                  with the General Data Protection Regulation (GDPR).
                </Typography>
              </div>
              <div>
                <Typography variant="h6">
                  2. Data Collection and Processing
                </Typography>
                <Typography>
                  Musefy collects and processes personal data in accordance with
                  its Privacy Policy, which outlines the types of data
                  collected, the purposes of processing, and the rights of
                  users. By using the Platform, you consent to the collection
                  and processing of your personal data as described in the
                  Privacy Policy.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">3. User Responsibilities</Typography>
                <Typography>
                  You are responsible for the accuracy and legality of any
                  personal data you provide or upload to the Platform. You
                  should ensure that you have obtained the necessary consents
                  and permissions from individuals whose personal data you share
                  through the Platform.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">4. Security Measures</Typography>
                <Typography>
                  You are responsible for the accuracy and legality of any
                  personal data you provide or upload to the Platform. You
                  should ensure that you have obtained the necessary consents
                  and permissions from individuals whose personal data you share
                  through the Platform. Musefy implements appropriate technical
                  and organizational measures to protect the security and
                  confidentiality of personal data. However, no data
                  transmission or storage system can be guaranteed to be 100%
                  secure. You understand and accept the inherent risks
                  associated with the transmission and storage of personal data.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">5. Data Subject Rights</Typography>
                <Typography>
                  As a user of the Platform, you have the right to access,
                  rectify, erase, restrict processing, and object to the
                  processing of your personal data. You can exercise these
                  rights by contacting Musefy as described in the Privacy
                  Policy.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">
                  6. Third-Party Services and Links
                </Typography>
                <Typography>
                  The Platform may contain links to third-party websites or
                  services that are not controlled or operated by Musefy. Musefy
                  is not responsible for the privacy practices or content of
                  those third-party sites. Your interactions with such sites are
                  governed by their own terms and policies.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">7. Disclaimer of Liability</Typography>
                <Typography>
                  Musefy shall not be liable for any direct, indirect,
                  incidental, consequential, or punitive damages arising out of
                  your use of the Platform or any actions taken in reliance on
                  the content or information provided. Musefy does not guarantee
                  the accuracy, completeness, or reliability of any content or
                  information on the Platform.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">
                  8. Governing Law and Jurisdiction
                </Typography>
                <Typography>
                  These Terms and Conditions are governed by the laws of
                  [Jurisdiction]. Any disputes arising from or relating to these
                  Terms and Conditions shall be subject to the exclusive
                  jurisdiction of the courts in [Jurisdiction].
                </Typography>
              </div>
              <div>
                <Typography variant="h6">9. Modifications</Typography>
                <Typography>
                  Musefy reserves the right to modify or update these Terms and
                  Conditions at any time. Any changes will be effective upon
                  posting on the Platform. Continued use of the Platform after
                  the changes indicates your acceptance of the modified Terms
                  and Conditions.
                </Typography>
              </div>
              <div>
                <Typography variant="h6">Contact</Typography>
                <Typography>
                  If you have any questions or concerns regarding these Terms
                  and Conditions or the privacy practices, please contact Musefy
                  at musefys6@gmail.com.
                </Typography>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Container>
  );
};

const mapDispatchToProps = {
  registerUser,
};

export default connect(null, mapDispatchToProps)(Register);

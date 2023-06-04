import React, { useState } from 'react';
import { TextField, Button, Grid, Modal, Box, Typography } from '@mui/material';
import { User } from '../../../types/index';

type AddUserFormProps = {
  addUser: (user: User) => void;
};

const AddUserForm: React.FC<AddUserFormProps> = ({ addUser }) => {
  const [user, setUser] = useState<User>({ id: '', name: '', email: '' });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(user);
    setUser({ id: '', name: '', email: '' });
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Add User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="ID"
                  name="id"
                  value={user.id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddUserForm;

import React, { useState } from "react";
import AddUserForm from "../../components/AdminSide/UsersTable/AddUserForm";
import UserTable from "../../components/AdminSide/UsersTable/UserTable";
import { User } from "../../types";
import { Typography, Paper } from "@mui/material";

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Add a new user to the list
  const addUser = (user: User) => {
    // Update the users list in the state
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  // Update an existing user in the list
  const updateUser = (updatedUser: User) => {
    // Find the index of the updated user in the list
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);

    // Update the users list in the state
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[userIndex] = updatedUser;
      return updatedUsers;
    });
  };

  // Delete a user from the list
  const deleteUser = (userId: string) => {
    // Remove the user from the users list in the state
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <Typography variant="h5" component="h1" gutterBottom>
        User Management
      </Typography>
      <Paper sx={{ p: 2 }}>
        <AddUserForm addUser={addUser} />
        <UserTable
          users={users}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      </Paper>
    </div>
  );
};

export default UserManagementPage;

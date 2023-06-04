import './App.css';
import NavbarUser from './components/UserSide/Navigation/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import MyAccountPage from './pages/MyAccountPage';
import FavouriteSongsPage from './pages/FavouriteSongsPage';
import { useState, useEffect } from 'react';
import { getRole } from './services/AuthService';
// import Navbar from './components/AdminSide/Navbar/navbar';
import UserManagementPage from './pages/AdminSide/UserManagementPage';
import PlaylistDetailPage from './components/UserSide/Explore/PlaylistDetailPage';

function App() {
    // const [userRole, setUserRole] = useState('');

    // useEffect(() => {
    //   const fetchUserRole = async () => {
    //     const token = getToken();
    //     if (token) {
    //       const role = await getRole(token);
    //       setUserRole(role);
    //     }
    //   };
  
    //   fetchUserRole();
    // }, []);
  
    return (
        <div className="App">
        <BrowserRouter>
        {/* {userRole === 'ADMIN' ? (
          <Navbar />
        ) : userRole === 'USER' ? (
          <NavbarUser />
        ) : (
          <NavbarUser />
        )} */}
        <NavbarUser />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/my-favourite-songs" element={<FavouriteSongsPage />} />
            <Route path="/my-account" element={<MyAccountPage />} />
            <Route path="/users" element={<UserManagementPage />} />
            <Route path="/playlist/:id/songs" element={<PlaylistDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
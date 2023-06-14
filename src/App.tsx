import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PlaylistDetailPage from './components/UserSide/Explore/PlaylistDetailPage';
import UserManagementPage from './pages/AdminSide/UserManagementPage';
import BrowsePage from './pages/BrowsePage';
import FavouriteSongsPage from './pages/FavouriteSongsPage';
import MyAccountPage from './pages/MyAccountPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/UserSide/Navigation/navbar';
import LoginPage from './pages/loginPage';
// import Homepage from './pages/homePage';


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
        <Navbar />
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
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
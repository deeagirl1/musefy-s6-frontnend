import axios from 'axios';
import { User, UserFavouriteSongs, UserInteractionCount } from '../types';
import { getToken, logout} from './AuthService';
import Cookies from "js-cookie";

const API_URL = " http://34.91.28.46/api/users";

const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getUserById: async (id: string): Promise<User | null> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  deleteUser: async (userId: string): Promise<boolean> => {
    try {
      const token = getToken();
  
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${API_URL}/delete?userId=${userId}`, config);
      if (response.status === 200) {
        logout();
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  downloadData: async (userId: string): Promise<string | null> => {
    try {
      const token = getToken();
      const response = await axios.get<Blob>(`${API_URL}/${userId}/download-data`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob',
      });
  
      if (response.data) {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `user_data_${userId}.zip`); // Manually specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Clean up the created URL
        window.URL.revokeObjectURL(downloadUrl);
  
        // Wait for the download to finish
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the timeout as needed
  
        return downloadUrl;
      }
    } catch (error:any) {
      if (error.response && error.response.data) {
        console.error('Error downloading the file:', error.response.data);
      } else {
        console.error('Error:', error);
      }
    }
  
    return null;;
  },

  
  addSongToFavouriteList: async (userFavoriteSongDTO: UserFavouriteSongs): Promise<User | null> => {
    try {
      const token = getToken();
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(`${API_URL}/add-song-to-favourite-list`, userFavoriteSongDTO, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getUserFavoriteSongs: async (userId: string): Promise<string[] | null> => {
    try {
      const token = getToken();
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.get(`${API_URL}/${userId}/favorite-songs`, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  
  handleSongListenedEvent: async (userInteractionDTO: UserInteractionCount): Promise<string | null> => {
    try {
      const token = getToken();
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.post(`${API_URL}/song-listened`, userInteractionDTO, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export default userService;

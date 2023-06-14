import axios, { AxiosRequestConfig } from 'axios';
import { User, UserFavouriteSongs, UserInteractionCount } from '../types';
import { getDecodedToken, getToken, logout } from './AuthService';
import Cookies from "js-cookie";

const API_URL = " http://127.0.0.1:62696/api/users";

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
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${API_URL}/delete?userId=${userId}`, config);
      Cookies.remove("token");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  downloadData: async (): Promise<string | null> => {
    try {
      const response = await axios.get<Blob>(`${API_URL}/download-data`, {
        responseType: 'blob', // Set the response type to blob
      });
  
      if (response.data) {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.download = `user_data.zip`; // Set the desired filename
        link.click();
  
        // Clean up the created URL
        window.URL.revokeObjectURL(downloadUrl);
  
        // Wait for the download to finish
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the timeout as needed
  
        return downloadUrl;
      }
    } catch (error) {
      console.error(error);
    }
  
    return null;
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
  
      const response = await axios.get(`${API_URL}/${userId}/favoritesongs`, config);
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

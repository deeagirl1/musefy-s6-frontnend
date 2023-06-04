import axios, { AxiosRequestConfig } from 'axios';
import { User, UserFavouriteSongs, UserInteractionCount } from '../types';
import { getDecodedToken, getToken, signOut } from './AuthService';

const API_URL = "http://localhost:8085/api/users";

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
      signOut();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  downloadData: async (): Promise<string | null> => {
    try {
      const decodedToken = getDecodedToken() as { userId: string };
      if (decodedToken) {
        const userId = decodedToken.userId;
  
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        };
  
        const response = await axios.get<string>(`${API_URL}/${userId}/download-data`, config);
        if (response.data) {
          const downloadUrl = response.data;
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.target = '_blank';
          link.click();
          
          // Wait for the download to finish
          await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the timeout as needed
  
          return downloadUrl;
        }
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

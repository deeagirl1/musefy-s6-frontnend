import React, { useState } from 'react';
import SearchBar from '../components/UserSide/SearchBar/SearchBar';
import SongCard from '../components/UserSide/Explore/SongCard';
import { Song } from '../types';
import songService from '../services/music-service/SongService';

const SongSearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query: any) => {
    try {
      const response = await songService.searchSongs(query);
      const songs = response.data; // Assuming the API response contains the list of songs
      setSearchResults(songs);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {searchResults.map((song: Song) => (
        <SongCard key={song.songId} song={song} onClick={() => {}} />
      ))}
    </div>
  );
};

export default SongSearchPage;

import { Typography, Box, Grid, Card, Button } from "@mui/material";
import { Album, Playlist, Song } from "../../../types";
import { useState, useEffect } from "react";
import AlbumCard from "../Explore/AlbumCard";
import PlaylistCard from "../Explore/PlaylistCard";
import SongCard from "../Explore/SongCard";
import AlbumService from "../../../services/music-service/AlbumService";
import PlaylistService from "../../../services/music-service/PlaylistService";
import songService from "../../../services/music-service/SongService";
import LoadingPage from "../../../pages/Loading/LoadingPage";
import Playbar from "../PlayBar/Playbar";
import React from "react";
import playlistService from "../../../services/music-service/PlaylistService";

const BrowseComponent: React.FC = () => {

  const [songsData, setSongsData] = useState<Song[]>([]);
  const [playlistsData, setPlaylistsData] = useState<Playlist[]>([]);
  const [albumsData, setAlbumsData] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>(0);


  useEffect(() => {
    const fetchSongsData = async () => {
      try {
        const songResponse = await songService.getSongs();
        if (songResponse.songs.length > 0) {
          setSongsData(songResponse.songs);

          setTotalPages(songResponse.totalPages);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };
    fetchSongsData();
  }, []);

  
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const playlistResponse = await playlistService.getPlaylists();
        setPlaylistsData(playlistResponse);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    fetchPlaylistData();
  }, []);


  useEffect(() => {
    const fetchAlbumsData = async () => {
      try {
        const albumResponse = await AlbumService.getAlbums();
        setAlbumsData(albumResponse);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
      }
    };
    fetchAlbumsData();
  }, []);


  const handleLoadMoreSongs = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const songResponse = await songService.getSongs(nextPage, 4); // Fetch 4 songs per page
      if (songResponse.songs.length > 0) {
        setSongsData((prevSongs) => [...prevSongs, ...songResponse.songs]);
        setCurrentPage(nextPage);
      }
    }
  };
  

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleSongClick = (song: Song) => {
    if (selectedSong && selectedSong.songId === song.songId) {
      setIsPlaying(false); // Pause the song if the same song is clicked again
      setCurrentSongIndex(0); // Reset the current song index to start from the beginning
    } else {
      setSelectedSong(song);
      setIsPlaying(true); // Play the selected song
      const songIndex = songsData.findIndex((s) => s.songId === song.songId);
      setCurrentSongIndex(songIndex);
    }
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };

  const handleVolumeChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setVolume(newValue); // Update the volume value
    }
  };

  const handleSkipPrevious = () => {
    if (selectedSong && songsData.length > 1) {
      const currentIndex = songsData.findIndex(
        (song) => song.songId === selectedSong.songId
      );
      const previousIndex =
        (currentIndex - 1 + songsData.length) % songsData.length;
      const previousSong = songsData[previousIndex];
      setSelectedSong(previousSong);
      setCurrentSongIndex(previousIndex);
      setIsPlaying(true);
    }
  };

  const handleSkipNext = () => {
    if (selectedSong && songsData.length > 1) {
      const currentIndex = songsData.findIndex(
        (song) => song.songId === selectedSong.songId
      );
      const nextIndex = (currentIndex + 1) % songsData.length;
      const nextSong = songsData[nextIndex];
      setSelectedSong(nextSong);
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const chunkSize = 4; // Number of cards per slide
  const songChunks = [];
  for (let i = 0; i < songsData.length; i += chunkSize) {
    songChunks.push(songsData.slice(i, i + chunkSize));
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Songs
      </Typography>
          <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
        {songsData.length ? songsData.map((song) => (
          <Grid item xs={3} style={{ scrollSnapAlign: 'start' }} key={song.songId}>
            <SongCard
              song={song}
              onClick={() => handleSongClick(song)}
            />
          </Grid>
        )) : (
          <Card>
            <Typography variant="body1">No songs available</Typography>
          </Card>
        )}
      </Grid>
              {/* Add the Load more button here */}
        {currentPage < totalPages && (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMoreSongs}
              style={{backgroundColor: '#1DB954', color: 'white'}}
            >
              Load more songs
            </Button>
          </Box>
        )}


      <Typography variant="h4" gutterBottom>
        Playlists
      </Typography>
      <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
        {playlistsData.length ? playlistsData.map((playlist) => (
          <Grid item xs={3} style={{ scrollSnapAlign: 'start' }} key={playlist.id}>
            <PlaylistCard playlist={playlist} />
          </Grid>
        )) : (
          <Card>
            <Typography variant="body1">No playlists available</Typography>
          </Card>
        )}
      </Grid>

      <Typography variant="h4" gutterBottom>
        Albums
      </Typography>
      <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
        {albumsData.length ? albumsData.map((album) => (
          <Grid item xs={3} style={{ scrollSnapAlign: 'start' }} key={album.albumId}>
            <AlbumCard album={album} />
          </Grid>
        )) : (
          <Card>
            <Typography variant="body1">No albums available</Typography>
          </Card>
        )}
      </Grid>

      <Box sx={{ paddingBottom: "10rem" }}>
        {selectedSong && (
          <Playbar
            song={selectedSong}
            isPlaying={isPlaying}
            volume={volume}
            onPlayPause={handlePlayPause}
            onVolumeChange={handleVolumeChange}
            onSkipNext={handleSkipNext}
            onSkipPrevious={handleSkipPrevious}
          />
        )}
      </Box>
    </div>
  );
};

export default BrowseComponent;

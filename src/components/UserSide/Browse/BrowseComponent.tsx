import { Typography, Box, Grid, Card, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
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

const BrowseComponent: React.FC = () => {
    const autoScrollRef = React.useRef<any>(null);
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
    const fetchData = async () => {
      try {
        // Fetch the initial data for albums and playlists
        const playlists = await PlaylistService.getPlaylists();
        const albums = await AlbumService.getAlbums();
        setPlaylistsData(playlists);
        setAlbumsData(albums);

        // Fetch the first page of songs
        const songResponse = await songService.getSongs(1, 4);
        if (songResponse.songs.length > 0) {
          setSongsData(songResponse.songs);
          setCurrentPage(1);
          setTotalPages(songResponse.totalPages);
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScrollRef.current) {
        autoScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, 2000);
      
    return () => clearInterval(interval);
  }, []);


  const handleLoadMoreSongs = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const songResponse = await songService.getSongs(nextPage, 4);
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
    setSelectedSong(song);
    setIsPlaying(true); // Play the selected song when clicked
    const songIndex = songsData.findIndex((s) => s.songId === song.songId);
    setCurrentSongIndex(songIndex);
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
          <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }} ref={autoScrollRef}>
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
      <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }} ref={autoScrollRef}>
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
      <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }} ref={autoScrollRef}>
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

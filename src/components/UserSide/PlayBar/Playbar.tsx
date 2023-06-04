import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Slider, Typography, Stack } from "@mui/material";
import {
  SkipPrevious,
  PlayArrow,
  Pause,
  SkipNext,
  VolumeDown,
  VolumeUp,
} from "@mui/icons-material";
import { Song, UserFavouriteSongs, UserInteractionCount } from "../../../types";
import userService from "../../../services/UserService";
import { getDecodedToken } from "../../../services/AuthService";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PlaybarProps {
  song: Song;
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => void;
  onSkipPrevious: () => void;
  onSkipNext: () => void;
}

const Playbar: React.FC<PlaybarProps> = ({
  song,
  isPlaying,
  volume,
  onPlayPause,
  onVolumeChange,
  onSkipPrevious,
  onSkipNext,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(!isPlaying); // Manage paused state

  useEffect(() => {
    const decodedToken = getDecodedToken() as { userId: string };

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();

        if (decodedToken) {
          const userId = decodedToken.userId;
          const userInteractionDTO: UserInteractionCount = {
            userId,
            songId: song.songId,
          };
          userService.handleSongListenedEvent(userInteractionDTO);
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, song]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    onPlayPause();
  };

  const handleAddToFavorites = async () => {
    const decodedToken = getDecodedToken() as { userId?: string } | null;

    if (decodedToken && decodedToken.userId) {
      const userFavoriteSongDTO: UserFavouriteSongs = {
        userId: decodedToken.userId,
        songId: song.songId,
      };

      console.log(userFavoriteSongDTO);

      const result = await userService.addSongToFavouriteList(
        userFavoriteSongDTO
      );
    }
  };

  const handleSkipPrevious = () => {
    onSkipPrevious();
  };

  const handleSkipNext = () => {
    onSkipNext();
  };

  const handleDurationChange = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      if (audioRef.current) {
        audioRef.current.currentTime = newValue;
        setCurrentTime(newValue);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#2B2929",
        zIndex: 1000,
        paddingBottom: "env(safe-area-inset-bottom)", // Handle safe area for iOS devices
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {song && (
          <audio
            src={song.mp3GCPLink}
            ref={audioRef}
            onEnded={handleSkipNext}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleDurationChange}
          ></audio>
        )}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ color: "#929292" }}
        >
          <IconButton onClick={handleSkipPrevious} sx={{ color: "inherit" }}>
            <SkipPrevious />
          </IconButton>
          <IconButton onClick={handlePlayPause} sx={{ color: "inherit" }}>
            {!isPlaying ? <PlayArrow /> : <Pause />} {/* Update the icon */}
          </IconButton>
          <IconButton onClick={handleSkipNext} sx={{ color: "inherit" }}>
            <SkipNext />
          </IconButton>
          <Typography sx={{ mr: "1rem" }}>{formatTime(currentTime)}</Typography>
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            step={0.01}
            onChange={handleProgressChange}
            onChangeCommitted={handleProgressChange}
            aria-labelledby="playback-slider"
            sx={{ ml: "10px", mr: "10px", color: "inherit", width: 500 }}
          />
          <Typography sx={{ ml: "1rem" }}>
            {formatTime(duration - currentTime)}
          </Typography>
          <IconButton onClick={handleAddToFavorites} sx={{ color: "inherit" }}>
            <FavoriteIcon />
          </IconButton>
          <Box sx={{ width: 200, mt: "100px" }}>
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                aria-label="Volume slider"
                value={volume}
                min={0}
                max={100}
                step={1}
                onChange={onVolumeChange}
                sx={{ color: "#4745A0" }}
                aria-labelledby="volume-slider"
              />
              <VolumeUp />
            </Stack>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={song.imageLink}
              alt="Song Cover"
              style={{ height: 50, width: 50, marginRight: 10 }}
            />
            <Box>
              <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                {song.artist}
              </Typography>
              <Typography variant="body1" sx={{ color: "#fff" }}>
                {song.title}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Playbar;

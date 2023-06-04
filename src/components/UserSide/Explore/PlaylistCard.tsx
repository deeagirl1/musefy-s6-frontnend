import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Playlist } from "../../../types";
import { useNavigate } from "react-router-dom";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/playlist/${playlist.id}/songs`);
  };

  return (
    <Card style={{ width: "300px", margin: "10px" }} onClick={handlePlaylistClick}>
      <CardMedia
        component="img"
        height="140"
        image={playlist.image}
        title={playlist.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {playlist.title}
        </Typography>
        <Typography color="text.secondary">{playlist.created_by}</Typography>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;

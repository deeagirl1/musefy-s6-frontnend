import React from 'react';
import { Typography, Grid, Card, Box, Button } from '@mui/material';

interface CardGridProps<T> {
  title: string;
  data: T[];
  CardComponent: React.ComponentType<any>;
  handleCardClick?: (item: T) => void;
  handleLoadMore?: () => void;
}

const CardGrid = <T,>({
  title,
  data,
  CardComponent,
  handleCardClick,
  handleLoadMore,
}: CardGridProps<T>) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3} style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory' }}>
        {data.length ? (
          data.map((item: T, index: number) => (
            <Grid item xs={3} style={{ scrollSnapAlign: 'start' }} key={index}>
              <CardComponent
                item={item}
                onClick={() => handleCardClick && handleCardClick(item)}
              />
            </Grid>
          ))
        ) : (
          <Card>
            <Typography variant="body1">No {title.toLowerCase()} available</Typography>
          </Card>
        )}
      </Grid>
      {handleLoadMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoadMore}
            style={{ backgroundColor: '#1DB954', color: 'white' }}
          >
            Load more {title.toLowerCase()}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default CardGrid;

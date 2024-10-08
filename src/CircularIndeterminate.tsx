import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box data-testid="circular-progress" sx={{ display: 'flex', padding: "50px" }}>
      <CircularProgress />
    </Box>
  );
}

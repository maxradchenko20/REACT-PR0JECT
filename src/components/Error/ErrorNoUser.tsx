import { AlertTitle, Box, LinearProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import React from 'react';

const ErrorNoUser = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>No matches found!</strong>
      </Alert>
      <LinearProgress />
    </Box>
  );
};

export default ErrorNoUser;

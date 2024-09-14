import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = ({ size = 40, message = "Loading..." }) => {
    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh" 
            flexDirection="column"
        >
            <CircularProgress size={size} />
            <Box mt={2}>
                {message}
            </Box>
        </Box>
    );
};

export default Loader;

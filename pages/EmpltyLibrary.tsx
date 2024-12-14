/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';


const EmptyLibrary = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        margin: 'auto',
        marginTop: 8,
        maxWidth: 600,
        minHeight: 200,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      <FontAwesomeIcon 
        icon={faBookOpen} 
        style={{ 
          fontSize: '48px',
          marginBottom: '16px',
          color: '#9e9e9e'
        }}
      />
      
      <Typography
        variant="h6"
        component="h2"
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          marginBottom: 2
        }}
      >
        Your library is empty. Add some books to get started
      </Typography>
    </Box>
  );
};

export default EmptyLibrary;
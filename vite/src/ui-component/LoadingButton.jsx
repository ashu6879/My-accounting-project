// src/ui-component/LoadingButton.jsx
import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({ loading, children, ...props }) => (
  <Button {...props} disabled={loading || props.disabled}>
    {loading && <CircularProgress size={24} sx={{ mr: 1 }} />}
    {children}
  </Button>
);

export default LoadingButton;

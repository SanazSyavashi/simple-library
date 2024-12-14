/* eslint-disable @typescript-eslint/no-explicit-any */
//NODE-MODULES
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from './Alert';
//IMP-DEPENDENCY
//---------------------------------------------------------------------------------
type TSnackbarSeverity = 'error' | 'success' | 'warning' | 'info';
type TGenericSnackbarProps = {
  severity: TSnackbarSeverity;
  text: string;
  open: boolean;
  handleClose: () => void;
  children?: any;
};

const GenericSnackbar: React.FC<TGenericSnackbarProps> = ({
  severity,
  text,
  open,
  handleClose,
  children,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}>
      <Alert onClose={handleClose} severity={severity} className='w-full'>
        {children ?? text}
      </Alert>
    </Snackbar>
  );
};
export default GenericSnackbar;

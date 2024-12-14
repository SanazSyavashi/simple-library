//NODE-MODULES
import React from 'react';
import { useTheme } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
//IMP-DEPENDENCY
//---------------------------------------------------------------------------------

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  const theme = useTheme();

  return (
    <MuiAlert
      className='flex items-center text-sm'
      closeText={'dismiss'}
      elevation={4}
      ref={ref}
      variant='filled'
      classes={{
        action: 'mb-1',
        message: 'mt-0.5',
      }}
      sx={{
        color: theme.palette.common.white,
      }}
      {...props}
    />
  );
});
export default Alert;

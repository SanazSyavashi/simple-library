//NODE-MODULES
import React from 'react';
import { Box, FormControlLabel, Typography } from '@mui/material';
import { RegisterOptions, ValidationValueMessage } from 'react-hook-form';
//---------------------------------------------------------------------------------

const InputLabel: React.FC<TProps> = ({
  label,
  rules,
  children,
  className,
  labelPlacement = 'top',
  disable = false,
  labelExtraComponent,
}) => {
  const Element = labelExtraComponent;
  return (
    <FormControlLabel
      className={` m-0 whitespace-nowrap gap-y-3 w-full ${
        labelPlacement === 'top'
          ? 'items-start'
          : 'items-center align-middle justify-end '
      } ${className}`}
      sx={{ pointerEvents: 'none' }}
      label={
        <Typography
          variant='body1'
          className='flex justify-between font-medium capitalize'
          sx={{ pointerEvents: 'auto' }}>
          {`${(label)} ${
            (rules?.required as ValidationValueMessage)?.value ? '*' : ''
          }`}
          {!!Element && <Element />}
        </Typography>
      }
      labelPlacement={labelPlacement}
      control={
        <Box
          sx={{ pointerEvents: 'auto' }}
          className={`${
            labelPlacement === 'top' ? 'w-full flex flex-col ' : ''
          }${disable && 'w-min'}`}>
          {children as React.ReactNode}
        </Box>
      }
    />
  );
};
export default InputLabel;
//---------------------------
type TProps = {
  label: string;
  rules: RegisterOptions;
  children: React.ReactNode;
  className?: string;
  labelPlacement?: 'top' | 'bottom' | 'end' | 'start';
  disable?: boolean;
  labelExtraComponent?: () => JSX.Element;
};

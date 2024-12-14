/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Grid, Skeleton } from '@mui/material';

interface FormSkeletonProps {
  isSingleLine: boolean;
  rows: any[]; 
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ isSingleLine, rows }) => {
  return (
    <Grid container spacing={2}>
      {rows.map((row, index) => (
        <Grid item xs={12} key={index}>
          <Grid container direction={isSingleLine ? 'row' : 'column'} alignItems={isSingleLine ? 'center' : 'start'}spacing={1}>
            <Grid item>
              <Skeleton variant="text" width={200}  height={40}/>
            </Grid>
            <Grid item>
              <Skeleton variant="text"  height={!isSingleLine ? 80:40} className='w-[400px] sm:w-[470px]'/>
            </Grid>
          </Grid>
        </Grid>
      ))}
      
    </Grid>
  );
};

export default FormSkeleton;

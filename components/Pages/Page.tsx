import { forwardRef, ReactNode } from 'react';

// next
import Head from 'next/head';

// material-ui
import { Box,  Typography } from '@mui/material';

// ==============================|| Page - SET TITLE & META TAGS ||============================== //

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title, meta, titleComponent, ...other }, ref) => {

  return (
    <Box className="py-5 flex flex-col justify-center w-full lg: py-10 p-16">
      <Head>
        {meta}
      </Head>
      <Box className="items-center sm:items-start sm:my-16 flex   text-md font-semibold my-16 flex-col w-full md:my-16 mb-16">
        <Typography className={'text-3xl font-semibold'}>
             {title }
        </Typography>
        {titleComponent}
        
      </Box>
      <Box className="px-10" ref={ref} {...other}>
        {children}
      </Box>
    </Box>
  );
});

//-------------------------------------------------------------------------------------
interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  title?: string;
  meta?: ReactNode;
  titleComponent?: ReactNode;
}

Page.displayName = 'Page';

export default Page;

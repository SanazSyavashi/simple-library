import { Box, Typography } from "@mui/material";

const TableHeader = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'none', sm: 'row' },
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      py: 2,
    }}
  >
    <Typography
      sx={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'text.secondary',
        width: '26.5%',
        justifyContent:"center"
      }}
    >
      Title
    </Typography>

    <Typography
      sx={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'text.secondary',
        width: '25%',
        justifyContent:'center',
        alignItems:"center"
      }}
    >
      Author
    </Typography>

    <Typography
      sx={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'text.secondary',
        width: '25%'
      }}
    >
      Rating
    </Typography>

    <Box
      sx={{
        width: '25%',
        display: 'flex',
        justifyContent: 'flex-end',
        pr: 2
      }}
    >
    </Box>
  </Box>
);

export default TableHeader;
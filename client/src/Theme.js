import { createTheme, responsiveFontSizes } from "@mui/material";

const Theme = createTheme({
    palette: {
        indigo: {
          main: '#6366F1',
          light: '#9CA3AF',
          dark: '#4f46e5',
          contrastText: '#fff',
        },
      },
});
 
export default responsiveFontSizes(Theme);
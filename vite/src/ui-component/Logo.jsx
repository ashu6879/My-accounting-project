// material-ui
import { useTheme } from '@mui/material/styles';

// Import the logo images
import logoDark from 'assets/images/logo-dark.svg';
import logo from 'assets/images/ekarigarlogo.png';

// ==============================|| LOGO ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * Uncomment the following line to use the image instead of SVG.
     */
    <img src={logo} alt="Logo" width="75" />
  
    
      // Alternatively, you can use the dark logo by uncommenting this line:
     
      // <img src={logoDark} alt="Logo Dark" width="100" />
     
  );
};

export default Logo;

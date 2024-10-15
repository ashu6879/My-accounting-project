// import { Link } from 'react-router-dom';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import useMediaQuery from '@mui/material/useMediaQuery';

// // project imports
// import AuthWrapper1 from '../AuthWrapper1';
// import AuthCardWrapper from '../AuthCardWrapper';
// import AuthLogin from '../authentication/auth-forms/AuthLogin';
// import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// // ================================|| AUTH3 - LOGIN ||================================ //

// const Login = () => {
//   const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

//   return (
//     <AuthWrapper1>
//       <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
//         <Grid item xs={12}>
//           <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
//             <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
//               <AuthCardWrapper>
//                 <Grid container spacing={2} alignItems="center" justifyContent="center">
//                 <Grid item sx={{ mb: 3 }}>
//                     <Link to="/" aria-label="logo"> {/* Adjust link if necessary */}
//                       <Logo />
//                     </Link>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
//                       <Grid item>
//                         <Stack alignItems="center" justifyContent="center" spacing={1}>
//                           <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
//                             Hi, Welcome Back
//                           </Typography>
//                           <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
//                             Enter your credentials to continue
//                           </Typography>
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <AuthLogin />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Divider />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid item container direction="column" alignItems="center" xs={12}>
//                       <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
//                         Don&apos;t have an account?
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </AuthCardWrapper>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
//           <AuthFooter />
//         </Grid>
//       </Grid>
//     </AuthWrapper1>
//   );
// };

// export default Login;





import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles'; // Use styled from @mui/material/styles

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// Styled components
const Container = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}));

const Image = styled('img')(({ theme }) => ({
  maxWidth: '300px', // Adjust the size as needed
  marginBottom: theme.spacing(2),
}));

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Container container>
        <Grid item xs={12}>
          <Image 
            src="https://www.shutterstock.com/shutterstock/photos/1486286573/display_1500/stock-photo-work-in-progress-sorry-for-the-inconvenience-caused-1486286573.jpg" // Replace with your image URL
            alt="Sorry for the inconvenience"
          />
          <Typography variant="h4" color="textSecondary" sx={{ margin: 2 }}>
            Project Under Maintenance
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ margin: 2 }}>
            Sorry for the inconvenience. Please try again later.
          </Typography>
        </Grid>
      </Container>
      
      {/* 
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="/" aria-label="logo"> {/* Adjust link if necessary *}
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Hi, Welcome Back
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
      */}
    </AuthWrapper1>
  );
};

export default Login;


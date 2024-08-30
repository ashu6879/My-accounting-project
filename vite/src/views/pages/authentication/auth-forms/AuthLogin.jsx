import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ alignItems: 'center', display: 'flex' }}>
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Username</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{ username: '', password: '' }} // Updated initial values
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'), // Updated validation
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('Submitting values:', values); // Debugging: Log submitted values

          try {
            const response = await fetch('https://ekarigar-accounts.vercel.app/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: values.username, password: values.password }) // Updated payload
            });

            console.log('Response status:', response.status); // Log status

            // Ensure to check if the response body has been read before reading it again
            const responseText = await response.text();
            console.log('Response body:', responseText); // Log body for detailed error
            
            if (response.ok) {
              const data = JSON.parse(responseText);
              console.log('Response data:', data); // Debugging: Log response data

              // Save the token in local storage
              localStorage.setItem('authToken', data.token); // Save token (assuming the response includes a token)

              // Handle successful login, e.g., store the token and redirect
              navigate('/dashboard'); // Adjust the redirect path as needed
            } else {
              // Display the error to the user
              setError(responseText || 'Login failed. Please try again.');
            }
          } catch (err) {
            console.error('Fetch error:', err); // Debugging: Log fetch errors
            setError('An error occurred. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {error && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{error}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;

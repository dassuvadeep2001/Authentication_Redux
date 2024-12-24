import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile, logout } from '../../Redux/authSlice';
import { Box, Typography, Button, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      // Redirect to login page if user is not authenticated
      navigate('/login');
    } else {
      // Fetch user profile
      dispatch(fetchProfile());
    }
  }, [token, dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login page
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          Failed to load profile: {error}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => dispatch(fetchProfile())}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(to right, #FF7E5F, #FEB47B)", // Orangish gradient
      p: 2,
    }}
  >
    <Box
      sx={{
        maxWidth: 500,
        width: "100%",
        p: 4,
        borderRadius: 2,
        background: "white",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="orange">
          My Account
        </Typography>
      </Box>

      {user?.data.profile_pic && (
        <Avatar
          src={`https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/${user?.data.profile_pic}`}
          alt={user.data.first_name}
          sx={{
            width: 150,
            height: 150,
            mx: "auto",
            mb: 2,
            border: "4px solid #FF7E5F",
          }}
        />
      )}
      <Typography variant="h6" color="textPrimary">
        Name : {user?.data.first_name} {user?.data.last_name}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
        Email : {user?.data.email}
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleLogout}
          sx={{ px: 4, py: 1, fontSize: "1rem" }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  </Box>
  );
};

export default Profile;

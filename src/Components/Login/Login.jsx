import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success("Login Successful!", {
            position: "top-center",
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          setTimeout(() => {
            navigate('/profile'); // Navigate to the profile page
          }, 1000);
        } else if (result.payload?.message === 'Invalid email or password') {
          alert('Invalid email or password');
        } else {
          alert('Login failed: ' + (result.payload?.message || 'Unknown error'));
        }
      })
      .catch((err) => {
        alert('An error occurred: ' + err.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #8e44ad, #3498db)",
        p: 2,
      }}
    >
      <Toaster />
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 2,
          background: "white",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              mx: "auto",
            }}
          >
            <LockIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" mt={1} color={"primary.main"}>
            Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </Button>

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </form>

        <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
          Don't have an account?{" "}
          <a href="/registration" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>
            Register
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;


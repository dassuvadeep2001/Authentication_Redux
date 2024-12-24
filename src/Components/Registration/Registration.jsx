import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import toast, { Toaster } from "react-hot-toast";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('profile_pic', data.profile_pic[0]);

    dispatch(registerUser(formData))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success("Registration Done Successful!", {
            position: "top-center",
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          setTimeout(() => {
            navigate('/'); // Navigate to the login page
          }, 1000);
        }else if (result.payload?.message?.includes('email already exists')) {
          // Set a specific error for the email field
          alert('Registration failed: Email already exists');
        } else {
          alert('Registration failed: ' + (result.payload?.message || 'Unknown error'));
        }
      })
      .catch((error) => {
        alert('An error occurred: ' + error.message);
      });
  };

  return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(to right, #56ab2f, #a8e063)",
          p: 2,
        }}
      >
        <Toaster />
        <Box
          sx={{
            maxWidth: 450,
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
                bgcolor: "success.main",
                width: 60,
                height: 60,
                mx: "auto",
              }}
            >
              <PersonAddAlt1Icon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight="bold" mt={1} color={"success.main"}>
              Create an Account
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              )}
            />
  
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              )}
            />
  
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
                  helperText={
                    errors.email?.message ||
                    (error?.includes("email already exists") && "Email already exists")
                  }
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
  
            <Controller
              name="profile_pic"
              control={control}
              rules={{ required: "Profile picture is required" }}
              render={({ field }) => (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ mt: 2 }}
                    fullWidth
                    color='success'
                  >
                    Upload Profile Picture
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </Button>
                  {field.value && field.value[0] && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <Avatar
                        src={URL.createObjectURL(field.value[0])}
                        alt="Profile Picture"
                        sx={{ width: 100, height: 100, mx: "auto" }}
                      />
                    </Box>
                  )}
                  {errors.profile_pic && (
                    <Typography color="error" variant="body2">
                      {errors.profile_pic.message}
                    </Typography>
                  )}
                </>
              )}
            />
  
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 3, py: 1.5, fontSize: "1rem" }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
  
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </form>
          <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                    Already have an account?{" "}
                    <a href="/" style={{ color: "green", textDecoration: "none", fontWeight: "bold" }}>
                      Login
                    </a>
                  </Typography>
        </Box>
      </Box>
  );
};

export default Registration;


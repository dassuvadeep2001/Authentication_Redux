import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Helper/Helper';
import { reg_end_point, login_end_point, profile_end_point } from '../API/EndPoints/apiEndPoints';

// Async thunks for registration, login, and fetching profile
export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(reg_end_point.registration, userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Pass server error message to the component
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(login_end_point.login, credentials);
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token to localStorage
        return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message); // Return server error message
      }
      return rejectWithValue(error.message);
    }
});

export const fetchProfile = createAsyncThunk('auth/profile', async (profile, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(profile_end_point.profile,profile);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        // Register user
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log(state.user);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Login user
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            console.log("Token:", state.token);
            
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch profile
        builder.addCase(fetchProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            console.log(state.user);
            
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

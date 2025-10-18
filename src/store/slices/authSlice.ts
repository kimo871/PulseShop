import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isSuperAdmin : false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user,token}>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isSuperAdmin = action.payload.user.username==(process.env.EXPO_PUBLIC_ADMIN_USERNAME || 'emilys')
      state.token = action.payload.token;
      state.error = null;
  
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isSuperAdmin = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    
    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isSuperAdmin = false;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export default authReducer;
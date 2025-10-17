import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "../../store/slices/authSlice";
import { useState } from "react";
import { MmkvStorage } from "../storage";
import { authApi } from "../../api/auth";

export const useAuth = ()=>{
    const dispatch = useDispatch();
    const [launching,setIsLaunching] = useState(false);
     const initializeApp = async () => {
    try {
      setIsLaunching(true);
      
      // 1. Check for stored token
      const storedToken = await MmkvStorage.getItem('USER_TOKEN');
      if (!storedToken) {
        console.log('No stored session found');
        dispatch(loginFailure('No stored session'));
        return;
      }
      // 2. Verify token is valid by calling protected endpoint
      console.log('Verifying token validity...');
      const currentUser = await authApi.getCurrentUser();
      // 3. Token is valid - restore session
      dispatch(loginSuccess({
        user: currentUser,
        token: storedToken,
      }));

      // 4. Check if biometric authentication is available and enabled
      const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync() && 
                                  await LocalAuthentication.isEnrolledAsync();
      const isBiometricEnabled = await SecureStore.getItemAsync('biometric_enabled') === 'true';

      if (isBiometricAvailable && isBiometricEnabled) {
        console.log('Biometric authentication required');
        setNeedsBiometric(true);
      } else {
        console.log('Session restored without biometrics');
        setNeedsBiometric(false);
      }
    } catch (error) {
      console.log('Session restoration failed:', error);
      
      // Token is invalid or network error
      await SecureStore.deleteItemAsync('auth_token');
      await SecureStore.deleteItemAsync('user_data');
      dispatch(loginFailure('Session expired or invalid'));
      setNeedsBiometric(false);
    } finally {
      setIsLaunching(false);
    }
  };

  // Handle biometric authentication
  const handleBiometricAuth = async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access your account',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        console.log('Biometric authentication successful');
        setNeedsBiometric(false);
        return true;
      } else {
        console.log('Biometric authentication failed or canceled');
        return false;
      }
    } catch (error) {
      console.error('Biometric auth error:', error);
      return false;
    }
  };

}
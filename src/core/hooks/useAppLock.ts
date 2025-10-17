import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

type Options = {
  inactivityMs?: number;
  autoPromptOnLock?: boolean;
  cancelCooldownMs?: number;
};

export const useAppLock = (opts: Options = {}) => {
  const {
    inactivityMs = 10_000,
    autoPromptOnLock = true,
    cancelCooldownMs = 5_000,
  } = opts;

  const [isLocked, setIsLocked] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const lastActive = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  const authAttemptRef = useRef(0); // Track authentication attempts
  const lastAuthAttemptRef = useRef(0); // Track last attempt time

  // Clear timeout helper
  const clearIdleTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Lock the app
  const lockNow = useCallback(() => {
    setIsLocked(true);
    clearIdleTimeout();
  }, [clearIdleTimeout]);

  // Schedule idle timeout
  const scheduleIdleTimeout = useCallback(() => {
    clearIdleTimeout();
    
    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      
      const idle = Date.now() - lastActive.current;
      
      if (idle >= inactivityMs) {
        lockNow();
      }
    }, inactivityMs);
  }, [clearIdleTimeout, inactivityMs, lockNow]);

  // Reset timer on user activity
  const resetLockTimer = useCallback(() => {
    if (isLocked) return;
    
    console.log('🔄 Resetting lock timer');
    lastActive.current = Date.now();
    scheduleIdleTimeout();
  }, [isLocked, scheduleIdleTimeout]);

  // Manage idle timer based on lock state
  useEffect(() => {
    if (isLocked) {
      clearIdleTimeout();
    } else {
      scheduleIdleTimeout();
    }
    
    return clearIdleTimeout;
  }, [isLocked, clearIdleTimeout, scheduleIdleTimeout]);

  const unlockApp = useCallback(async (): Promise<boolean> => {
    if (isAuthenticating) {
      return false;
    }

    // Prevent too many rapid authentication attempts
    const now = Date.now();
    if (now - lastAuthAttemptRef.current < 1000) {
      return false;
    }

    lastAuthAttemptRef.current = now;
    authAttemptRef.current += 1;

    try {
      setIsAuthenticating(true);

      const [hasHardware, isEnrolled] = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync(),
      ]);

      // If no biometrics enrolled, force device passcode
      if (!isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Unlock PulseShop',
          fallbackLabel: '',
          disableDeviceFallback: false,
        });

        if (result.success) {
          setIsLocked(false);
          resetLockTimer();
          authAttemptRef.current = 0; // Reset attempts on success
          return true;
        } else {
          return false;
        }
      }

      // Normal biometric flow
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock PulseShop',
        fallbackLabel: 'Use Device Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsLocked(false);
        resetLockTimer();
        authAttemptRef.current = 0; // Reset attempts on success
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      if (mountedRef.current) {
        setIsAuthenticating(false);
      }
    }
  }, [isAuthenticating, resetLockTimer]);

  // **SINGLE SOURCE OF TRUTH for triggering authentication**
  useEffect(() => {
    if (!autoPromptOnLock) return;

    const triggerAuth = () => {
      // Only trigger if all conditions are met
      if (
        isLocked && 
        !isAuthenticating && 
        appState.current === 'active' &&
        authAttemptRef.current < 3 // Limit to 3 attempts per lock
      ) {
        unlockApp();
      }
    };

    // Use a single timer to prevent multiple triggers
    const timer = setTimeout(triggerAuth, 1000);
    
    return () => clearTimeout(timer);
  }, [isLocked, isAuthenticating, autoPromptOnLock, unlockApp]);

  // tracking app state change 
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      // Lock when going to background
      if (nextAppState === 'background' && !isLocked) {
        lockNow();
        authAttemptRef.current = 0; // Reset attempts on new lock
      }
      // Reset timer when coming to foreground while unlocked
      if (nextAppState === 'active' && !isLocked) {
        resetLockTimer();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [isLocked, lockNow, resetLockTimer]);

  // Manual lock
  const lock = useCallback(() => {
    lockNow();
    authAttemptRef.current = 0; // Reset attempts on manual lock
  }, [lockNow]);

  // Setup on mount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearIdleTimeout();
    };
  }, [clearIdleTimeout]);

  // Debug state
  useEffect(() => {
    console.log('State - locked:', isLocked, 'authenticating:', isAuthenticating);
  }, [isLocked, isAuthenticating]);

  return {
    isLocked,
    isAuthenticating,
    unlockApp,
    lock,
    resetLockTimer,
  };
};
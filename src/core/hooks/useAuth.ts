import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess} from "../../store/slices/authSlice"; // Add setLoading action
import { useState } from "react";
import { MmkvStorage } from "../storage";
import { authApi } from "../../api/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [launching, setIsLaunching] = useState(false);

  const initializeApp = async () => {
    try {
      setIsLaunching(true); 
      // 1. Check for stored token
      const storedToken = await MmkvStorage.getItem("USER_TOKEN");
      console.log("Stored token found:", !!storedToken);
      
      if (!storedToken) {
        console.log("No stored session found");
        dispatch(loginFailure("No stored session"));
        return;
      }

      // 2. Verify token is valid by calling protected endpoint
      console.log("Verifying token validity...");
      const currentUser = await authApi.getCurrentUser();
      console.log("User data received:", currentUser);
      
      // 3. Token is valid - restore session
      dispatch(
        loginSuccess({
          user: currentUser,
          token: storedToken,
        })
      );
      
      console.log("✅ Session restored successfully");

    } catch (error) {
      console.log("Session restoration failed:", error);
      
      // Token is invalid or network error
      MmkvStorage.clearItems(["USER_TOKEN"]);
      dispatch(loginFailure("Session expired or invalid"));
      
    } finally {
      setIsLaunching(false);
    }
  };

  return {
    launching,
    setIsLaunching,
    initializeApp,
  };
};
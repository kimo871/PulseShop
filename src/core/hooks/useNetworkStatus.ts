import { useState, useEffect } from 'react';
import * as Network from 'expo-network';
import { AppState } from 'react-native';

interface NetworkState {
  isConnected: boolean | undefined;
  isInternetReachable: boolean | undefined;
  type: string | undefined;
  isLoading: boolean;
}

const useNetworkStatus = (): NetworkState => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: undefined,
    isInternetReachable: undefined,
    type: undefined,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const updateNetworkState = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (isMounted) {
          console.log('Updating state with:', state.isConnected);
          setNetworkState({
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
            type: state.type,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Network check failed:', error);
        if (isMounted) {
          setNetworkState({
            isConnected: false,
            isInternetReachable: false,
            type: 'unknown',
            isLoading: false,
          });
        }
      }
    };

    updateNetworkState();

    const subscription = Network.addNetworkStateListener(updateNetworkState);

    const appStateSubscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        updateNetworkState();
      }
    });

    return () => {
      isMounted = false;
      subscription?.remove();
      appStateSubscription.remove();
    };
  }, []);

  return networkState;
}

export default useNetworkStatus;
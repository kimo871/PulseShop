// GlobalActivityBoundary.tsx
import React, { ReactNode } from 'react';
import { View } from 'react-native';// your existing hook
import { useAppLock } from '../core/hooks/useAppLock';

type Props = { children: ReactNode };

export function GlobalActivityBoundary({ children }: Props) {
  const { resetLockTimer } = useAppLock(); // MUST be the same instance used at app root

  return (
    <View
      style={{ flex: 1 }}

      // Called before children decide; we do side-effects then return false so we don't grab the responder.
      onStartShouldSetResponderCapture={() => { resetLockTimer(); return false; }}
      onMoveShouldSetResponderCapture={() => { resetLockTimer(); return false; }}

      // Defensive: if we ever become responder, still count as activity.
      onResponderGrant={resetLockTimer}
      onResponderMove={resetLockTimer}
      onResponderRelease={resetLockTimer}

      // Some platforms fire this reliably on taps.
      onTouchEnd={resetLockTimer}
    >
      {children}
    </View>
  );
}

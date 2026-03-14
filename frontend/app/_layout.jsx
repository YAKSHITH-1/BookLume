import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import useAuthStore from '../stores/authstore';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  console.log('RootLayout:', { userPresent: !!user, tokenPresent: !!token, isCheckingAuth, segments, rootKey: rootNavigationState?.key });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const inAuthscreen = segments[0] === '(auth)';
    const isSignedin = user && token;

    
    const timer = setTimeout(() => {
      if (!isSignedin && !inAuthscreen) {
        router.replace('/(auth)');
      } else if (isSignedin && inAuthscreen) {
        router.replace('/(tabs)');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [user, token, segments, rootNavigationState?.key]);

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

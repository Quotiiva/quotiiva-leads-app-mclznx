
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-reanimated";
import { SystemBars } from "react-native-edge-to-edge";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Stack } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SystemBars style="auto" />
        <Stack>
          <Stack.Screen name="(index)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="login" 
            options={{ 
              presentation: 'modal',
              headerShown: true,
            }} 
          />
          <Stack.Screen 
            name="register" 
            options={{ 
              presentation: 'modal',
              headerShown: true,
            }} 
          />
          <Stack.Screen 
            name="dashboard" 
            options={{ 
              headerShown: true,
            }} 
          />
          <Stack.Screen 
            name="submit-lead" 
            options={{ 
              presentation: 'modal',
              headerShown: true,
            }} 
          />
          <Stack.Screen 
            name="leads-history" 
            options={{ 
              headerShown: true,
            }} 
          />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen name="formsheet" options={{ presentation: "formSheet" }} />
          <Stack.Screen name="transparent-modal" options={{ presentation: "transparentModal" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

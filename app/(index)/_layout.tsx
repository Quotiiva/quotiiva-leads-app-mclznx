
import React from 'react';
import { Stack } from 'expo-router';
import { WidgetProvider } from "@/contexts/WidgetContext";

export default function AppIndexLayout() {
  return (
    <WidgetProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            title: 'Welcome'
          }} 
        />
      </Stack>
    </WidgetProvider>
  );
}

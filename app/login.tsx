
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { Button } from '@/components/button';
import { commonStyles, colors } from '@/styles/commonStyles';
import { useAuth } from '@/hooks/useAuth';
import { BodyScrollView } from '@/components/BodyScrollView';
import { IconSymbol } from '@/components/IconSymbol';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    
    // For demo purposes, we'll create a mock user
    // In a real app, this would authenticate with a backend
    const mockUser = {
      id: Date.now().toString(),
      firstName: 'John',
      lastName: 'Doe',
      email: email.trim(),
      phone: '(555) 123-4567',
      dealership: 'Demo Dealership',
      createdAt: new Date(),
    };

    const success = await login(mockUser);
    
    if (success) {
      router.replace('/dashboard');
    } else {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Login',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      <BodyScrollView style={commonStyles.wrapper}>
        <View style={commonStyles.container}>
          <View style={commonStyles.content}>
            <View style={styles.logoContainer}>
              <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
            </View>

            <View style={commonStyles.section}>
              <Text style={commonStyles.title}>Welcome Back</Text>
              <Text style={commonStyles.text}>
                Enter your email to access your account
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={[commonStyles.input, styles.input]}
                placeholder="Email Address"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Button
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
                textStyle={styles.buttonText}
              >
                Login
              </Button>
            </View>

            <View style={styles.registerSection}>
              <Text style={commonStyles.textSecondary}>
                Don&apos;t have an account?{' '}
              </Text>
              <Button
                onPress={() => router.push('/register')}
                variant="secondary"
                style={styles.registerButton}
                textStyle={styles.buttonTextSecondary}
              >
                Create Account
              </Button>
            </View>
          </View>
        </View>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
});

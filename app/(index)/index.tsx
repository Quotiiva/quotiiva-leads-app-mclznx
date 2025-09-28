
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { Button } from '@/components/button';
import { commonStyles, colors } from '@/styles/commonStyles';
import { useAuth } from '@/hooks/useAuth';
import { BodyScrollView } from '@/components/BodyScrollView';

export default function WelcomeScreen() {
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && user) {
      // If user is already logged in, redirect to dashboard
      router.replace('/dashboard');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <Text style={commonStyles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <BodyScrollView style={commonStyles.wrapper}>
      <View style={commonStyles.container}>
        <View style={commonStyles.content}>
          {/* Logo placeholder - using text for now since we can't use the image file */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Quotiiva</Text>
            <Text style={styles.logoSubtext}>Lead Tracking</Text>
          </View>

          <View style={commonStyles.section}>
            <Text style={commonStyles.title}>Welcome to Quotiiva</Text>
            <Text style={commonStyles.text}>
              Track your leads and referral payments with ease. 
              Submit customer information and monitor your earnings.
            </Text>
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              onPress={() => router.push('/login')}
              style={styles.loginButton}
              textStyle={styles.buttonText}
            >
              Login
            </Button>
          </View>

          <View style={commonStyles.buttonContainer}>
            <Button
              onPress={() => router.push('/register')}
              variant="secondary"
              style={styles.registerButton}
              textStyle={styles.buttonTextSecondary}
            >
              Create Account
            </Button>
          </View>

          <View style={styles.infoSection}>
            <Text style={commonStyles.textSecondary}>
              Earn $25 for every qualified lead you submit
            </Text>
          </View>
        </View>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  logoSubtext: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.secondary,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  registerButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

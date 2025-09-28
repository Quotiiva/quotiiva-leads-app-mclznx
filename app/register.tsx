
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { Button } from '@/components/button';
import { commonStyles, colors } from '@/styles/commonStyles';
import { useAuth } from '@/hooks/useAuth';
import { BodyScrollView } from '@/components/BodyScrollView';
import { IconSymbol } from '@/components/IconSymbol';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dealership, setDealership] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !dealership.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    const newUser = {
      id: Date.now().toString(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dealership: dealership.trim(),
      createdAt: new Date(),
    };

    const success = await login(newUser);
    
    if (success) {
      Alert.alert(
        'Success', 
        'Account created successfully!',
        [{ text: 'OK', onPress: () => router.replace('/dashboard') }]
      );
    } else {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Create Account',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      <BodyScrollView style={commonStyles.wrapper}>
        <View style={commonStyles.container}>
          <View style={commonStyles.content}>
            <View style={styles.logoContainer}>
              <IconSymbol name="person.badge.plus" size={80} color={colors.primary} />
            </View>

            <View style={commonStyles.section}>
              <Text style={commonStyles.title}>Join Quotiiva</Text>
              <Text style={commonStyles.text}>
                Create your account to start tracking leads and earnings
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={[commonStyles.input, styles.input]}
                placeholder="First Name"
                placeholderTextColor={colors.textSecondary}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
              />

              <TextInput
                style={[commonStyles.input, styles.input]}
                placeholder="Last Name"
                placeholderTextColor={colors.textSecondary}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
              />

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

              <TextInput
                style={[commonStyles.input, styles.input]}
                placeholder="Phone Number"
                placeholderTextColor={colors.textSecondary}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <TextInput
                style={[commonStyles.input, styles.input]}
                placeholder="Dealership Name"
                placeholderTextColor={colors.textSecondary}
                value={dealership}
                onChangeText={setDealership}
                autoCapitalize="words"
              />

              <Button
                onPress={handleRegister}
                loading={loading}
                style={styles.registerButton}
                textStyle={styles.buttonText}
              >
                Create Account
              </Button>
            </View>

            <View style={styles.loginSection}>
              <Text style={commonStyles.textSecondary}>
                Already have an account?{' '}
              </Text>
              <Button
                onPress={() => router.push('/login')}
                variant="secondary"
                style={styles.loginButton}
                textStyle={styles.buttonTextSecondary}
              >
                Login
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
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  loginButton: {
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
  loginSection: {
    alignItems: 'center',
    marginTop: 20,
  },
});

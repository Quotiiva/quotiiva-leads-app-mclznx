
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { quotiivaOrange, quotiivaBlueDark, quotiivaBlueLight } from '@/constants/Colors';

export const colors = {
  primary: quotiivaOrange,      // Quotiiva Orange
  secondary: quotiivaBlueDark,  // Quotiiva Dark Blue
  accent: quotiivaBlueLight,    // Quotiiva Light Blue
  background: '#FFFFFF',        // White background for light theme
  backgroundAlt: '#F8F9FA',     // Light grey background
  text: '#212529',              // Dark text for light theme
  textSecondary: '#6C757D',     // Secondary text color
  grey: '#E9ECEF',              // Light grey
  card: '#FFFFFF',              // White card background
  border: '#DEE2E6',            // Light border color
  success: '#28A745',           // Success green
  warning: '#FFC107',           // Warning yellow
  error: '#DC3545',             // Error red
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundAlt,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  input: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    width: '100%',
    marginBottom: 12,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 30,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

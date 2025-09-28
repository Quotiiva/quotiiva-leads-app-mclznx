
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
import { Button } from '@/components/button';
import { commonStyles, colors } from '@/styles/commonStyles';
import { useAuth } from '@/hooks/useAuth';
import { useLeads } from '@/hooks/useLeads';
import { BodyScrollView } from '@/components/BodyScrollView';
import { IconSymbol } from '@/components/IconSymbol';

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const { stats, loading } = useLeads(user?.id);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  if (!user) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Dashboard',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={styles.logoutButton}>
              <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      <BodyScrollView style={commonStyles.wrapper}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={commonStyles.title}>
              Welcome, {user.firstName}!
            </Text>
            <Text style={commonStyles.textSecondary}>
              {user.dealership}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={commonStyles.statsCard}>
                <Text style={commonStyles.statsNumber}>
                  {loading ? '...' : stats.totalLeads}
                </Text>
                <Text style={commonStyles.statsLabel}>Total Leads</Text>
              </View>
              
              <View style={commonStyles.statsCard}>
                <Text style={commonStyles.statsNumber}>
                  {loading ? '...' : stats.weeklyLeads}
                </Text>
                <Text style={commonStyles.statsLabel}>This Week</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={commonStyles.statsCard}>
                <Text style={commonStyles.statsNumber}>
                  {loading ? '...' : stats.monthlyLeads}
                </Text>
                <Text style={commonStyles.statsLabel}>This Month</Text>
              </View>
              
              <View style={commonStyles.statsCard}>
                <Text style={[commonStyles.statsNumber, { color: colors.success }]}>
                  ${loading ? '...' : stats.totalEarnings}
                </Text>
                <Text style={commonStyles.statsLabel}>Total Earnings</Text>
              </View>
            </View>

            <View style={styles.earningsCard}>
              <Text style={styles.earningsTitle}>Earnings Breakdown</Text>
              <View style={styles.earningsRow}>
                <Text style={styles.earningsLabel}>Pending:</Text>
                <Text style={[styles.earningsAmount, { color: colors.warning }]}>
                  ${loading ? '...' : stats.pendingEarnings}
                </Text>
              </View>
              <View style={styles.earningsRow}>
                <Text style={styles.earningsLabel}>Paid:</Text>
                <Text style={[styles.earningsAmount, { color: colors.success }]}>
                  ${loading ? '...' : stats.paidEarnings}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <Button
              onPress={() => router.push('/submit-lead')}
              style={styles.submitButton}
              textStyle={styles.buttonText}
            >
              Submit New Lead
            </Button>

            <Button
              onPress={() => router.push('/leads-history')}
              variant="secondary"
              style={styles.historyButton}
              textStyle={styles.buttonText}
            >
              View Lead History
            </Button>
          </View>

          <View style={styles.infoCard}>
            <IconSymbol name="info.circle" size={24} color={colors.primary} />
            <Text style={styles.infoText}>
              You earn $25 for each qualified lead you submit. 
              Payments are processed weekly.
            </Text>
          </View>
        </View>
      </BodyScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  earningsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  earningsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  earningsAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  actionsContainer: {
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  historyButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

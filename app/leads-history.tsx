
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { commonStyles, colors } from '@/styles/commonStyles';
import { useAuth } from '@/hooks/useAuth';
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types';
import { IconSymbol } from '@/components/IconSymbol';

export default function LeadsHistoryScreen() {
  const { user } = useAuth();
  const { leads, loading } = useLeads(user?.id);

  const renderLead = ({ item }: { item: Lead }) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    const statusColor = item.status === 'paid' ? colors.success : 
                       item.status === 'processed' ? colors.warning : colors.textSecondary;
    
    return (
      <View style={styles.leadCard}>
        <View style={styles.leadHeader}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.leadDetails}>
          <Text style={styles.detailText}>
            Marketing Rep: {item.marketingRepFirstName} {item.marketingRepLastName}
          </Text>
          <Text style={styles.detailText}>
            Vehicle: {item.vehicleYear} {item.vehicleMake} {item.vehicleModel}
          </Text>
          <Text style={styles.detailText}>Phone: {item.customerPhone}</Text>
          <Text style={styles.detailText}>Email: {item.customerEmail}</Text>
        </View>
        
        <View style={styles.leadFooter}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.feeText}>${item.referralFee}</Text>
        </View>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="doc.text" size={64} color={colors.textSecondary} />
      <Text style={styles.emptyTitle}>No Leads Yet</Text>
      <Text style={styles.emptyText}>
        Start submitting leads to see them here
      </Text>
    </View>
  );

  if (!user) {
    return null;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Lead History',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      <View style={commonStyles.wrapper}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={commonStyles.title}>Your Leads</Text>
            <Text style={commonStyles.textSecondary}>
              {loading ? 'Loading...' : `${leads.length} total leads`}
            </Text>
          </View>

          <FlatList
            data={leads}
            renderItem={renderLead}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={leads.length === 0 ? styles.emptyList : undefined}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
    marginBottom: 20,
  },
  leadCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  leadDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  leadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  dateText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  feeText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.success,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyList: {
    flex: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

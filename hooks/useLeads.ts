
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lead, LeadStats } from '@/types';

export const useLeads = (salesProfessionalId?: string) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    totalLeads: 0,
    weeklyLeads: 0,
    monthlyLeads: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (salesProfessionalId) {
      loadLeads();
    }
  }, [salesProfessionalId]);

  const loadLeads = async () => {
    try {
      const leadsData = await AsyncStorage.getItem('leads');
      const allLeads: Lead[] = leadsData ? JSON.parse(leadsData) : [];
      
      // Filter leads for current sales professional
      const userLeads = allLeads.filter(lead => lead.salesProfessionalId === salesProfessionalId);
      setLeads(userLeads);
      
      // Calculate stats
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const weeklyLeads = userLeads.filter(lead => new Date(lead.createdAt) >= oneWeekAgo).length;
      const monthlyLeads = userLeads.filter(lead => new Date(lead.createdAt) >= oneMonthAgo).length;
      
      const totalEarnings = userLeads.length * 25; // $25 per lead
      const paidEarnings = userLeads.filter(lead => lead.status === 'paid').length * 25;
      const pendingEarnings = totalEarnings - paidEarnings;
      
      setStats({
        totalLeads: userLeads.length,
        weeklyLeads,
        monthlyLeads,
        totalEarnings,
        pendingEarnings,
        paidEarnings,
      });
    } catch (error) {
      console.log('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt' | 'status' | 'referralFee'>) => {
    try {
      const newLead: Lead = {
        ...leadData,
        id: Date.now().toString(),
        createdAt: new Date(),
        status: 'pending',
        referralFee: 25,
      };

      const leadsData = await AsyncStorage.getItem('leads');
      const allLeads: Lead[] = leadsData ? JSON.parse(leadsData) : [];
      allLeads.push(newLead);
      
      await AsyncStorage.setItem('leads', JSON.stringify(allLeads));
      await loadLeads(); // Reload to update stats
      
      return true;
    } catch (error) {
      console.log('Error adding lead:', error);
      return false;
    }
  };

  return {
    leads,
    stats,
    loading,
    addLead,
    refreshLeads: loadLeads,
  };
};

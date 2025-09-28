
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Switch, Pressable, Image } from 'react-native';
import { router, Stack } from 'expo-router';
import { Button } from '@/components/button';
import { commonStyles, colors } from '@/styles/commonStyles';
import { useAuth } from '@/hooks/useAuth';
import { useLeads } from '@/hooks/useLeads';
import { BodyScrollView } from '@/components/BodyScrollView';
import { IconSymbol } from '@/components/IconSymbol';
import * as ImagePicker from 'expo-image-picker';

export default function SubmitLeadScreen() {
  const { user } = useAuth();
  const { addLead } = useLeads(user?.id);
  
  // Marketing Rep Info
  const [marketingRepFirstName, setMarketingRepFirstName] = useState('');
  const [marketingRepLastName, setMarketingRepLastName] = useState('');
  
  // Customer Info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  // Vehicle Info
  const [vehicleVin, setVehicleVin] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleMileage, setVehicleMileage] = useState('');
  
  // Consent and Images
  const [customerConsent, setCustomerConsent] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Validation
    if (!marketingRepFirstName.trim() || !marketingRepLastName.trim()) {
      Alert.alert('Error', 'Please enter marketing representative name');
      return;
    }
    
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      Alert.alert('Error', 'Please fill in all customer information');
      return;
    }
    
    if (!vehicleVin.trim() || !vehicleYear.trim() || !vehicleMake.trim() || !vehicleModel.trim() || !vehicleMileage.trim()) {
      Alert.alert('Error', 'Please fill in all vehicle information');
      return;
    }
    
    if (!customerConsent) {
      Alert.alert('Error', 'Customer consent is required');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User not found');
      return;
    }

    setLoading(true);

    const leadData = {
      salesProfessionalId: user.id,
      marketingRepFirstName: marketingRepFirstName.trim(),
      marketingRepLastName: marketingRepLastName.trim(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      vehicleVin: vehicleVin.trim(),
      vehicleYear: vehicleYear.trim(),
      vehicleMake: vehicleMake.trim(),
      vehicleModel: vehicleModel.trim(),
      vehicleMileage: vehicleMileage.trim(),
      customerConsent,
      images,
    };

    const success = await addLead(leadData);
    
    if (success) {
      Alert.alert(
        'Success',
        'Lead submitted successfully! You will earn $25 for this qualified lead.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } else {
      Alert.alert('Error', 'Failed to submit lead. Please try again.');
    }
    
    setLoading(false);
  };

  if (!user) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Submit Lead',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }} 
      />
      <BodyScrollView style={commonStyles.wrapper}>
        <View style={styles.container}>
          <Text style={commonStyles.title}>Submit New Lead</Text>
          
          {/* Marketing Rep Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Marketing Representative</Text>
            
            <TextInput
              style={commonStyles.input}
              placeholder="First Name"
              placeholderTextColor={colors.textSecondary}
              value={marketingRepFirstName}
              onChangeText={setMarketingRepFirstName}
              autoCapitalize="words"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Last Name"
              placeholderTextColor={colors.textSecondary}
              value={marketingRepLastName}
              onChangeText={setMarketingRepLastName}
              autoCapitalize="words"
            />
          </View>

          {/* Customer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Information</Text>
            
            <TextInput
              style={commonStyles.input}
              placeholder="Customer Name"
              placeholderTextColor={colors.textSecondary}
              value={customerName}
              onChangeText={setCustomerName}
              autoCapitalize="words"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Phone Number"
              placeholderTextColor={colors.textSecondary}
              value={customerPhone}
              onChangeText={setCustomerPhone}
              keyboardType="phone-pad"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Email Address"
              placeholderTextColor={colors.textSecondary}
              value={customerEmail}
              onChangeText={setCustomerEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Vehicle Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Information</Text>
            
            <TextInput
              style={commonStyles.input}
              placeholder="VIN Number"
              placeholderTextColor={colors.textSecondary}
              value={vehicleVin}
              onChangeText={setVehicleVin}
              autoCapitalize="characters"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Year"
              placeholderTextColor={colors.textSecondary}
              value={vehicleYear}
              onChangeText={setVehicleYear}
              keyboardType="numeric"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Make"
              placeholderTextColor={colors.textSecondary}
              value={vehicleMake}
              onChangeText={setVehicleMake}
              autoCapitalize="words"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Model"
              placeholderTextColor={colors.textSecondary}
              value={vehicleModel}
              onChangeText={setVehicleModel}
              autoCapitalize="words"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Mileage"
              placeholderTextColor={colors.textSecondary}
              value={vehicleMileage}
              onChangeText={setVehicleMileage}
              keyboardType="numeric"
            />
          </View>

          {/* Images Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Images</Text>
            
            <Pressable style={styles.imageButton} onPress={pickImage}>
              <IconSymbol name="camera" size={24} color={colors.primary} />
              <Text style={styles.imageButtonText}>Add Image</Text>
            </Pressable>
            
            {images.length > 0 && (
              <View style={styles.imagesContainer}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.image} />
                    <Pressable 
                      style={styles.removeButton}
                      onPress={() => removeImage(index)}
                    >
                      <IconSymbol name="xmark.circle.fill" size={24} color={colors.error} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Consent Section */}
          <View style={styles.section}>
            <View style={styles.consentContainer}>
              <Switch
                value={customerConsent}
                onValueChange={setCustomerConsent}
                trackColor={{ false: colors.grey, true: colors.primary }}
                thumbColor={customerConsent ? '#FFFFFF' : '#FFFFFF'}
              />
              <Text style={styles.consentText}>
                Customer consents to be contacted for insurance quotes
              </Text>
            </View>
          </View>

          <Button
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
            textStyle={styles.buttonText}
          >
            Submit Lead ($25)
          </Button>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  consentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    padding: 16,
    borderRadius: 8,
  },
  consentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

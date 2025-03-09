import React from 'react';
import { View, Text } from 'react-native';

const HospitalBedScreen = ({ bedAvailability }: { bedAvailability: number }) => {
  return (
    <View>
      <Text>Hospital Bed Availability: {bedAvailability}</Text>
    </View>
  );
};

export default HospitalBedScreen;
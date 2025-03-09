import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons

// Define a color palette
const colors = {
  primary: '#007AFF', // Example primary color
  secondary: '#f8f8f8', // Example secondary color
  available: 'green',
  occupied: 'red',
  cardBackground: '#fff',
  textColor: '#333',
};

const dummyData = [
  { id: '1', name: 'Bed A', availability: 'Available' },
  { id: '2', name: 'Bed B', availability: 'Occupied' },
  { id: '3', name: 'Bed C', availability: 'Available' },
  // Add more dummy data as needed
];

const HospitalBeds = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hospital Beds</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.availability === 'Available' ? styles.available : styles.occupied]}>
            <Text style={styles.bedName}>{item.name}</Text>
            <Text style={styles.availability}>{item.availability}</Text>
            <MaterialIcons 
              name={item.availability === 'Available' ? 'check-circle' : 'cancel'} 
              size={24} 
              color={item.availability === 'Available' ? colors.available : colors.occupied} 
            />
          </View>
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.secondary, // Use the defined secondary color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.textColor, // Use the defined text color
  },
  card: {
    backgroundColor: colors.cardBackground, // Use the defined card background color
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  bedName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textColor, // Use the defined text color
  },
  availability: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.textColor, // Use the defined text color
  },
  available: {
    borderColor: colors.available,
    borderWidth: 2,
  },
  occupied: {
    borderColor: colors.occupied,
    borderWidth: 2,
  },
});

export default HospitalBeds;
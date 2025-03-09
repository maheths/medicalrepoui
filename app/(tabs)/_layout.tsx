import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons
import { Tabs } from 'expo-router';
import { Stethoscope, Pill as Pills, Search, User, Building2 } from 'lucide-react-native';

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
              color={item.availability === 'Available' ? 'green' : 'red'} 
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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
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
  },
  availability: {
    fontSize: 16,
    marginBottom: 8,
  },
  available: {
    borderColor: 'green',
    borderWidth: 2,
  },
  occupied: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

const TabLayout = () => {
    useEffect(() => {
        document.title = "Your App Name"; // Set the title of the browser tab
    }, []);

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                tabBarActiveTintColor: '#007AFF',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Symptoms',
                    tabBarIcon: ({ color, size }) => <Stethoscope size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="hospitals"
                options={{
                    title: 'Hospitals',
                    tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="hospitalBeds"
                options={{
                    title: 'Your App Name',
                    tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="medicines"
                options={{
                    title: 'Medicines',
                    tabBarIcon: ({ color, size }) => <Pills size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
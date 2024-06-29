import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../../constants/colors";

const LogoutScreen = () => {
  const navigation = useNavigation();

  const handleCancel = () => {
    // Handle cancel button press to close the container
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleLogout = () => {
    // Handle logout button press to navigate to Welcome page
    navigation.navigate('Welcome'); // Navigate to Welcome screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logout</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.secondary }]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.primary }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
  },
  button: {
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
  },
});

export default LogoutScreen;

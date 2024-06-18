import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../constants/colors';

const Aboutus = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.paragraph}>
            Welcome to our job portal app! Our mission is to connect job seekers with their dream careers and help employers find the best talent for their organizations.
          </Text>
          <Text style={styles.paragraph}>
            At our job portal, we strive to provide a seamless and user-friendly experience for both employers and job seekers. Whether you're looking for your next job opportunity or trying to fill a position at your company, we've got you covered.
            At our job portal, we strive to provide a seamless and user-friendly experience for both employers and job seekers. Whether you're looking for your next job opportunity or trying to fill a position at your company, we've got you covered.
          </Text>
          <Text style={styles.paragraph}>
            Our platform offers a wide range of features, including job search and filtering options, resume uploading, employer profiles, and more. We're constantly working to improve and enhance our services to better serve our users.
          </Text>
          <Text style={styles.paragraph}>
            Thank you for choosing our job portal app. We're excited to help you on your journey to success!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
  },
});

export default Aboutus;

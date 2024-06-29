import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../constants/colors';

const Aboutus = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/hero1.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.paragraph}>
            Welcome to our job portal app! Our mission is to connect job seekers with their dream careers and help employers find the best talent for their organizations.
          </Text>
          <Text style={styles.paragraph}>
            At our job portal, we strive to provide a seamless and user-friendly experience for both employers and job seekers. Whether you're looking for your next job opportunity or trying to fill a position at your company, we've got you covered.
          </Text>
          <Text style={styles.paragraph}>
            Our platform offers a wide range of features, including job search and filtering options, resume uploading, employer profiles, and more. We're constantly working to improve and enhance our services to better serve our users.
          </Text>
          <Text style={styles.paragraph}>
            Thank you for choosing our job portal app. We're excited to help you on your journey to success!
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => Linking.openURL('https://yourwebsite.com')}>
            <Text style={styles.linkText}>Visit our website</Text>
          </TouchableOpacity>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  content: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingVertical: 20,
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
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
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.primary,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Aboutus;

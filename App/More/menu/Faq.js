import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../../constants/colors';


const faq = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Frequently Asked Questions</Text>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>Q: How do I create an account?</Text>
            <Text style={styles.answer}>A: To create an account, navigate to the signup page and fill out the required information.</Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>Q: Can I upload my resume?</Text>
            <Text style={styles.answer}>A: Yes, you can upload your resume through the profile settings page after logging in.</Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>Q: How do I search for jobs?</Text>
            <Text style={styles.answer}>A: You can search for jobs by using the search bar on the home page and applying filters such as location, job title, and company.</Text>
          </View>

          {/* Add more FAQ items as needed */}
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
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.secondary,
  },
  answer: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default faq;

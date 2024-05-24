import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";

const Postjob = ({ navigation }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [experience, setExperience] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [contact, setContact] = useState("");
  const [validity, setValidity] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobHour, setJobHour] = useState("");

  const handlePostJob = () => {
    // Add job posting logic here
    navigation.navigate("JobListings"); // Assuming there's a JobListings screen to navigate to
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.title}>Post a Job</Text>

          <TextInput
            placeholder="Job Title *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setJobTitle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Job Category *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setJobCategory(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Address *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Company Name *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setCompanyName(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Experience Required *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setExperience(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Minimum Salary *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setMinSalary(text)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Maximum Salary *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setMaxSalary(text)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Contact *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Validity Period *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setValidity(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Job Description *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setDescription(text)}
            style={[styles.input, styles.textArea]}
            multiline
          />
          <TextInput
            placeholder="Job Type *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setJobType(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Job Hours *"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setJobHour(text)}
            style={styles.input}
          />

          <Button
            title="Post Job"
            onPress={handlePostJob}
            filled
            style={styles.button}
          />
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
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
  },
});

export default Postjob;

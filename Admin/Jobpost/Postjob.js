import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import SERVER from "../../constants/server";

const Postjob = ({ navigation }) => {
  const [job_title, setJobTitle] = useState("");
  const [job_category, setJobCategory] = useState("");
  const [job_address, setAddress] = useState("");
  const [job_company_name, setCompanyName] = useState("");
  const [job_experience, setExperience] = useState("");
  const [job_max_salary, setMaxSalary] = useState("");
  const [job_min_salary, setMinSalary] = useState("");
  const [job_contact, setContact] = useState("");
  const [job_validity, setValidity] = useState("");
  const [job_description, setDescription] = useState("");
  const [job_type, setJobType] = useState("");
  const [job_hour, setJobHour] = useState("");

  const handlePostJob = () => {
    const jobData = {
      job_title,
      job_category,
      job_address,
      job_company_name,
      job_experience,
      job_max_salary,
      job_min_salary,
      job_slug: job_title.toLowerCase().replace(/ /g, "-"),
      job_status: "Open",
      job_contact,
      job_validity,
      job_description,
      job_type,
      job_hour,
    };
    console.log(jobData);
    fetch(`${SERVER.primaryUrl}/job/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // navigation.navigate("Success");
      })
      .then((json) => {
        console.log("Job posted successfully", json);
        navigation.navigate("Success", {
          title: "Job posted successfully",
          description: "Your job details has been successfully posted.",
          navigation2: "Employernav",
          buttonText1: "View List",
          navigation2: "Postjob",
          buttonText2: "Post More",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
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

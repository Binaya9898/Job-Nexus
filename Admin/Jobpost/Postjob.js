import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker"; // Ensure correct import

import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import SERVER from "../../constants/server";

const Postjob = ({ navigation }) => {
  const [job_title, setJobTitle] = useState("");
  const [job_category, setJobCategory] = useState("");
  const [categories, setCategories] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // State for loading
  const [job_address, setAddress] = useState("");
  const [job_company_name, setCompanyName] = useState("");
  const [job_experience, setExperience] = useState("");
  const [job_max_salary, setMaxSalary] = useState("");
  const [job_min_salary, setMinSalary] = useState("");
  const [job_contact, setContact] = useState("");
  const [job_validity, setValidity] = useState("");
  const [job_description, setDescription] = useState("");
  const [job_requirements, setRequirements] = useState("");
  const [job_type, setJobType] = useState("");
  const [job_hour, setJobHour] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetch(`${SERVER.primaryUrl}/category`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setCategories(data);
        } else {
          setCategories([]); // Ensure it is set to an empty array if no data
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        Alert.alert("Error", "Failed to fetch categories.");
        setLoading(false);
        setCategories([]); // Ensure it is set to an empty array on error
      });
  }, []);

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
      job_requirements,
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
      })
      .then((json) => {
        console.log("Job posted successfully", json);
        navigation.navigate("Success", {
          title: "Job posted successfully",
          description: "Your job details have been successfully posted.",
          navigation2: "Employernav",
          buttonText1: "View List",
          navigation2: "Postjob",
          buttonText2: "Post More",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "Failed to post job.");
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setValidity(currentDate.toISOString().split("T")[0]); // Set the date in your desired format
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const renderFields = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    switch (currentPage) {
      case 0:
        return (
          <>
            <TextInput
              placeholder="Job Title *"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setJobTitle(text)}
              style={styles.input}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={job_category}
                style={styles.picker}
                onValueChange={(itemValue) => setJobCategory(itemValue)}
              >
                <Picker.Item label="Select Category *" value="" />
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.category_title}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
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
          </>
        );
      case 1:
        return (
          <>
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
            <TouchableOpacity onPress={showDatepicker} style={styles.input}>
              <Text style={styles.dateText}>
                {job_validity || "Validity Period *"}
              </Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            <TextInput
              placeholder="Job Description *"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setDescription(text)}
              style={[styles.input, styles.textArea]}
              multiline
            />
            <TextInput
              placeholder="Job Requirements *"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setRequirements(text)}
              style={[styles.input, styles.textArea]}
              multiline
            />
          </>
        );
      case 2:
        return (
          <>
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.title}>Post a Job</Text>
          {renderFields()}
          <View style={styles.paginationButtons}>
            {currentPage > 0 && (
              <Button
                title="Previous"
                onPress={() => setCurrentPage(currentPage - 1)}
                style={styles.paginationButton}
              />
            )}
            {currentPage < 2 && (
              <Button
                title="Next"
                onPress={() => setCurrentPage(currentPage + 1)}
                style={styles.paginationButton}
              />
            )}
            {currentPage === 2 && (
              <Button
                title="Post Job"
                onPress={handlePostJob}
                style={styles.paginationButton}
              />
            )}
          </View>
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
<<<<<<< HEAD
    paddingHorizontal: 20,
    marginBottom: 20,
=======
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
>>>>>>> 27adb14cd6d30577fe5e2fd20e57f5cf6a6f938a
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paginationButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  submitButton: {
    flex: 1,
    marginTop: 20,
  },
  pickerContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    height: 50,
    width: "100%",
    color: COLORS.dark,
  },
  dateText: {
    color: COLORS.dark,
  },
});

export default Postjob;

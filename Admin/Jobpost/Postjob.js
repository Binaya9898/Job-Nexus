import React, { useState, useEffect, useContext } from "react";
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
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../../constants/UserContext";
import { Ionicons } from "@expo/vector-icons";

import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import SERVER from "../../constants/server";

const Postjob = ({ navigation }) => {
  const [job_title, setJobTitle] = useState("");
  const [job_category, setJobCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [job_experience, setExperience] = useState("");
  const [job_max_salary, setMaxSalary] = useState("");
  const [job_min_salary, setMinSalary] = useState("");
  const [job_validity, setValidity] = useState("");
  const [job_description, setDescription] = useState("");
  const [job_requirements, setRequirements] = useState("");
  const [job_type, setJobType] = useState("");
  const [job_hour, setJobHour] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState({});

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { userData } = useContext(UserContext);

  const user_id = userData.user.id;

  useEffect(() => {
    fetchCategories();
    fetchEmployerData(user_id);
  }, [user_id]);

  const fetchCategories = () => {
    fetch(`${SERVER.primaryUrl}/category`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        Alert.alert("Error", "Failed to fetch categories.");
        setLoading(false);
        setCategories([]);
      });
  };

  const fetchEmployerData = (user_id) => {
    fetch(`http://192.168.1.65:8000/api/employer/mobile/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log("Employer Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching employer data:", error);
        Alert.alert("Error", "Failed to fetch employer data.");
      });
  };

  const handlePostJob = () => {
    const jobData = {
      job_title,
      job_category,
      job_address: data.employer_address || "",
      job_company_name: data.employer_company_name || "",
      job_experience,
      job_max_salary,
      job_min_salary,
      job_slug: job_title.toLowerCase().replace(/ /g, "-"),
      job_status: "Open",
      job_contact: data.user ? data.user.contact : "",
      job_validity,
      job_requirements,
      job_description,
      job_type,
      job_hour,
      job_posted_by: data.user.id,
    };

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
        return response.json();
      })
      .then((json) => {
        console.log("Job posted successfully", json);
        navigation.navigate("Success", {
          title: "Job posted successfully",
          description: "Your job details have been successfully posted.",
          navigation2: "Employernav", // Check if navigation2 is intended to be used twice
          buttonText1: "View List",
          navigation2: "Postjob", // Ensure correct navigation key
          buttonText2: "Post More",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "Failed to post job.");
      });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setValidity(currentDate.toISOString().split("T")[0]); // Set the date in your desired format
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const renderFields = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    switch (currentPage) {
      case 0:
        return (
          <>
            <View style={styles.header}>
              <Text style={styles.brandText}>JobNexus</Text>
              <View style={styles.headerIcons}>
                <Ionicons
                  name="person-circle-outline"
                  size={24}
                  color={COLORS.white}
                />
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={COLORS.white}
                />
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={24}
                  color={COLORS.white}
                />
              </View>
            </View>
            <TextInput
              placeholder="Job Title *"
              placeholderTextColor={COLORS.bright}
              onChangeText={setJobTitle}
              style={styles.input}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={job_category}
                style={styles.picker}
                onValueChange={setJobCategory}
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

            <Picker
              selectedValue={job_experience}
              style={styles.picker}
              onValueChange={setExperience}
            >
              <Picker.Item label="Experience Required *" value="" />
              <Picker.Item label="6 months" value="6 months" />
              <Picker.Item label="1 year" value="1 year" />
              <Picker.Item label="2 years" value="2 years" />
              <Picker.Item label="3 years" value="3 years" />
              <Picker.Item label="4 years" value="4 years" />
              <Picker.Item label="5 years" value="5 years" />
            </Picker>
            <TextInput
              placeholder="Minimum Salary *"
              placeholderTextColor={COLORS.bright}
              onChangeText={setMinSalary}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Maximum Salary *"
              placeholderTextColor={COLORS.bright}
              onChangeText={setMaxSalary}
              style={styles.input}
              keyboardType="numeric"
            />
          </>
        );
      case 1:
        return (
          <>
            <TouchableOpacity onPress={showDatepicker} style={styles.input}>
              <Text style={styles.dateText}>
                {job_validity || "Validity Period *"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
            <TextInput
              placeholder="Job Description *"
              placeholderTextColor={COLORS.bright}
              onChangeText={setDescription}
              style={[styles.input, styles.textArea]}
              multiline
            />
            <TextInput
              placeholder="Job Requirements *"
              placeholderTextColor={COLORS.bright}
              onChangeText={setRequirements}
              style={[styles.input, styles.textArea]}
              multiline
            />

            <Picker
              selectedValue={job_type}
              style={styles.picker}
              onValueChange={setJobType}
            >
              <Picker.Item label="Job Type *" value="" />
              <Picker.Item label="Part Time" value="Part Time" />
              <Picker.Item label="Full Time" value="Full Time" />
            </Picker>
            <TextInput
              placeholder="Job Hours *"
              placeholderTextColor={COLORS.bright}
              onChangeText={setJobHour}
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
            {currentPage < 1 && (
              <Button
                title="Next"
                onPress={() => setCurrentPage(currentPage + 1)}
                style={styles.paginationButton}
              />
            )}
            {currentPage === 1 && (
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
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
  brandText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
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
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paginationButton: {
    flex: 1,
    marginHorizontal: 5,
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

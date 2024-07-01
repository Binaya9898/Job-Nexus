import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SERVER from "../../constants/server";

// Static imports for avatars
import avatar1 from "../../assets/avatar/avatar1.png";
import avatar2 from "../../assets/avatar/avatar2.jpg";
import avatar3 from "../../assets/avatar/avatar3.png";
import avatar4 from "../../assets/avatar/avatar4.png";
import avatar5 from "../../assets/avatar/avatar5.png";

const avatarOptions = [
  { id: 1, name: "avatar1.png", image: avatar1 },
  { id: 2, name: "avatar2.jpg", image: avatar2 },
  { id: 3, name: "avatar3.png", image: avatar3 },
  { id: 4, name: "avatar4.png", image: avatar4 },
  { id: 5, name: "avatar5.png", image: avatar5 },
];

const CompleteProfile = ({ route, navigation }) => {
  const { id } = route.params; // Extract id from route params
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [participation, setParticipation] = useState("");
  const [training, setTraining] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const handleAvatarSelect = (avatarName) => {
    setImage(avatarName);
  };

  const handleCompleteProfile = () => {
    if (!address || !description) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const profileData = {
      user_id: id, // Use the dynamic id here
      employee_address: address,
      employee_description: description,
      employee_education: education,
      employee_work_experience: workExperience,
      employee_participation: participation,
      employee_training: training,
      employee_fb_link: fbLink,
      employee_linkedin_link: linkedinLink,
      employee_slug: "slug" + id,
      employee_status: "verified",
      employee_image: image,
    };
    console.log(profileData);

    fetch(`${SERVER.primaryUrl}/employee/complete-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log("User Added Successfully", data);
        Alert.alert("Added Successfully");
        navigation.navigate("Login"); // Navigate to Home on success
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        Alert.alert("Error", "Failed to register user.");
      });
  };

  const handleSkip = () => {
    navigation.navigate("Login"); // Navigate to Home on skip
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.gradientBackground}
        >
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Complete Your Profile</Text>

            <Text style={styles.label}>Select Avatar:</Text>
            <View style={styles.avatarContainer}>
              {avatarOptions.map((avatar) => (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    styles.avatarOption,
                    image === avatar.name && styles.avatarSelected,
                  ]}
                  onPress={() => handleAvatarSelect(avatar.name)}
                >
                  <Image source={avatar.image} style={styles.avatarImage} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="home-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Address *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setAddress(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Description *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="school-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Education"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setEducation(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="briefcase-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Work Experience"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setWorkExperience(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="people-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Participation"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setParticipation(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="medal-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Training"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setTraining(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="logo-facebook" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Facebook Link"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setFbLink(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="logo-linkedin" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="LinkedIn Link"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setLinkedinLink(text)}
                style={styles.input}
              />
            </View>

            <Button
              title={loading ? "Updating..." : "Complete Profile"}
              onPress={handleCompleteProfile}
              filled
              disabled={loading}
              style={{ marginTop: 20 }}
            />

            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.imagePickerText}>
                {"Skip? You won't be able to apply for jobs"}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  avatarOption: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    padding: 5,
  },
  avatarSelected: {
    borderColor: COLORS.primary,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  imagePickerText: {
    color: COLORS.primary,
    textAlign: "center",
  },
});

export default CompleteProfile;

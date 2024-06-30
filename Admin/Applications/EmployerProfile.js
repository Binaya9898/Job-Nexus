import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const EmployerProfile = ({ route }) => {
  const navigation = useNavigation();
  const { applicantId } = route.params;

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await fetch(
        `http://192.168.0.108:8000/api/checkEmployee/${applicantId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }
      const data = await response.json();
      if (data.exists) {
        setEmployee(data.data);
      } else {
        throw new Error("Employee does not exist");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPress = () => {
    if (employee && employee.user && employee.user.email) {
      Linking.openURL(`mailto:${employee.user.email}`);
    }
  };

  const handleSocialMediaPress = (url) => {
    Linking.openURL(url);
  };

  const handleAcceptProfile = () => {
    console.log("Accept Candidate");
  };

  const handleRejectProfile = () => {
    console.log("Reject Candidate");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No employee data available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={24} color={COLORS.primary} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: `https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png`,
          }}
          style={styles.profileImage}
        />
        <View style={styles.contactContainer}>
          <Text style={styles.name}>{employee.user && employee.user.name}</Text>
          <Text style={styles.contact}>
            {employee.user && employee.user.email}
          </Text>
          <Text style={styles.contact}>
            {employee.user && employee.user.contact}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Work Experience</Text>
          <Text style={styles.detailText}>
            {employee.employee_work_experience}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Education</Text>
          <Text style={styles.detailText}>{employee.employee_education}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Participation</Text>
          <Text style={styles.detailText}>
            {employee.employee_participation}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Training</Text>
          <Text style={styles.detailText}>{employee.employee_training}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Description</Text>
          <Text style={styles.detailText}>{employee.employee_description}</Text>
        </View>
      </View>

      <View style={styles.socialContainer}>
        {employee.employee_linkedin_link && (
          <TouchableOpacity
            onPress={() =>
              handleSocialMediaPress(employee.employee_linkedin_link)
            }
          >
            <FontAwesome
              name="linkedin"
              size={30}
              color="#0077B5"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        )}
        {employee.employee_fb_link && (
          <TouchableOpacity
            onPress={() => handleSocialMediaPress(employee.employee_fb_link)}
          >
            <FontAwesome
              name="facebook-square"
              size={30}
              color="#4267B2"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={handleAcceptProfile}
        >
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonReject}
          onPress={handleRejectProfile}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: COLORS.primary,
    marginLeft: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  contactContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  contact: {
    fontSize: 16,
    color: "#555",
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 24,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: "#555",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  socialIcon: {
    marginHorizontal: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonAccept: {
    backgroundColor: "#39B68D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  buttonReject: {
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#D9534F",
  },
});

export default EmployerProfile;

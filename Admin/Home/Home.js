import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors';


const Home = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(null);

  const mockData = {
    companyName: 'Tech Solutions',
    companyEmail: 'contact@techsolutions.com',
    totalApplications: 120,
    totalJobsPosted: 15,
    recentApplications: [
      { id: 1, name: 'John Doe', position: 'IT Teacher', profileImage: require('../../assets/hero1.jpg') },
      { id: 2, name: 'Jane Smith', position: 'IT Teacher', profileImage: require('../../assets/hero2.jpg') },
      { id: 3, name: 'Michael Johnson', position: 'Software Engineer', profileImage: require('../../assets/hero3.jpg') },
      { id: 4, name: 'Emily Davis', position: 'Product Manager', profileImage: require('../../assets/hero1.jpg') },
      { id: 5, name: 'William Brown', position: 'Designer', profileImage: require('../../assets/hero2.jpg') },
    ],
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleNavigation = (section) => {
    switch (section) {
      case 'postedJobs':
        navigation.navigate('Postjob');
        break;
      case 'allApplicants':
        navigation.navigate('Applications');
        break;
      default:
        setActiveSection(section);
        break;
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'recentApplicants':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Applicants</Text>
            {mockData.recentApplications.map((applicant) => (
              <View key={applicant.id} style={styles.applicantCard}>
                <Image source={applicant.profileImage} style={styles.applicantImage} />
                <View style={styles.applicantInfo}>
                  <Text style={styles.applicantName}>{applicant.name}</Text>
                  <Text style={styles.applicantPosition}>{applicant.position}</Text>
                </View>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Image source={require("../../assets/hero3.jpg")} style={styles.companyLogo} />
        <Text style={styles.welcomeText}>Hey, {mockData.companyName}</Text>
        <Text style={styles.emailText}>{mockData.companyEmail}</Text>
      </View>

      <View style={styles.dashboardSection}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Applications Received</Text>
          <Text style={styles.cardNumber}>{mockData.totalApplications}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Jobs Posted</Text>
          <Text style={styles.cardNumber}>{mockData.totalJobsPosted}</Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleNavigation('recentApplicants')}>
          <Image source={require("../../assets/recent.png")} style={styles.icon} />
          <Text style={styles.iconText}>Recent Applicants</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Postjob')}>
          <Image source={require("../../assets/post.png")} style={styles.icon} />
          <Text style={styles.iconText}>Posted Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigation('Application')}>
          <Image source={require("../../assets/all.png")} style={styles.icon} />
          <Text style={styles.iconText}>All Applicants</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        onChangeText={handleSearch}
        value={searchTerm}
        placeholder="Search by Name, Gender, Job..."
      />

      {renderSectionContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  companyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.black,
  },
  emailText: {
    fontSize: 16,
    color: COLORS.grey,
  },
  dashboardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: '48%',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.black,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  iconText: {
    textAlign: 'center',
    marginTop: 5,
    color: COLORS.black,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  applicantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  applicantPosition: {
    fontSize: 14,
    color: COLORS.grey,
  },
  input: {
    height: 40,
    marginVertical: 20,
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.grey,
    borderRadius: 10,
  },
  applicantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  applicantInfo: {
    marginLeft: 15,
    flex: 1,
  },
});

export default Home;

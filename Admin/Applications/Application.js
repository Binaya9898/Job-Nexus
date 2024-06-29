import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import COLORS from '../../constants/colors';

const jobs = [
  { id: '1', title: 'Assistant Compliance', company: 'A Highly Reputed Construction Company', location: 'Kathmandu' },
  { id: '2', title: 'Senior SEO Specialist', company: 'Outpace', location: 'Kathmandu' },
  { id: '3', title: 'Project Officer', company: 'PRACTICAL ACTION', location: 'Dhangadhi' },
  { id: '4', title: 'REQUEST FOR PROPOSAL', company: 'Lutheran World Relief', location: 'Lalitpur' },
  { id: '5', title: 'Expression of Interest', company: 'dZi Foundation', location: 'Lalitpur' },
  { id: '6', title: 'Auditor', company: 'PP Pradhan & Co.', location: 'Lalitpur' },
  { id: '7', title: 'Project Manager (SIK)', company: 'World Vision International Nepal', location: 'Bardibas' },
  { id: '8', title: 'REQUEST FOR PROPOSAL', company: 'World Vision International Nepal', location: 'Jumla' },
  { id: '9', title: 'Communications Officer', company: 'United Mission to Nepal', location: 'Kathmandu' },
  { id: '10', title: 'Finance and Administration Officer', company: 'PRACTICAL ACTION', location: 'Kathmandu' },
];

const mockApplicants = [
  { id: '1', name: 'John Doe', email: 'john@example.com', profileImage: require('../../assets/hero1.jpg') },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', profileImage: require('../../assets/hero2.jpg') },
  { id: '3', name: 'Michael Johnson', email: 'michael@example.com', profileImage: require('../../assets/hero3.jpg') },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', profileImage: require('../../assets/hero1.jpg') },
  { id: '5', name: 'William Brown', email: 'william@example.com', profileImage: require('../../assets/hero2.jpg') },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeJob, setActiveJob] = useState(null);
  const [activeApplicant, setActiveApplicant] = useState(null);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const handleAccept = () => {
    Alert.alert('Application Accepted', `${activeApplicant.name} has been accepted for the position.`);
    setActiveApplicant(null);
  };

  const handleReject = () => {
    Alert.alert('Application Rejected', `${activeApplicant.name} has been rejected for the position.`);
    setActiveApplicant(null);
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity onPress={() => setActiveJob(item)}>
      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.jobCompany}>{item.company}</Text>
        <Text style={styles.jobLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderApplicantItem = ({ item }) => (
    <TouchableOpacity onPress={() => setActiveApplicant(item)}>
      <View style={styles.applicantCard}>
        <Image source={item.profileImage} style={styles.applicantImage} />
        <View style={styles.applicantInfo}>
          <Text style={styles.applicantName}>{item.name}</Text>
          <Text style={styles.applicantEmail}>{item.email}</Text>
        </View>
        <TouchableOpacity onPress={() => setActiveApplicant(item)}>
          <Text style={styles.viewProfileText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderJobList = () => (
    <FlatList
      data={jobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()))}
      keyExtractor={item => item.id}
      renderItem={renderJobItem}
      contentContainerStyle={styles.jobList}
    />
  );

  const renderApplicantList = () => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActiveJob(null)}>
        <Text style={styles.backButton}>Back to Jobs</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Applicants for {activeJob.title}</Text>
      <FlatList
        data={mockApplicants}
        keyExtractor={item => item.id}
        renderItem={renderApplicantItem}
        contentContainerStyle={styles.applicantList}
      />
    </View>
  );

  const renderApplicantProfile = () => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActiveApplicant(null)}>
        <Text style={styles.backButton}>Back to Applicants</Text>
      </TouchableOpacity>
      <Image source={activeApplicant.profileImage} style={styles.profileImage} />
      <Text style={styles.name}>{activeApplicant.name}</Text>
      <Text style={styles.email}>{activeApplicant.email}</Text>
      <Text style={styles.phone}>Phone: 123-456-7890</Text>
      <Text style={styles.experience}>Experience: 5 years</Text>
      <Text style={styles.skills}>Skills: React Native, JavaScript, HTML, CSS</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.primary }]} onPress={handleAccept}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.grey }]} onPress={() => setActiveApplicant(null)}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchTerm}
          placeholder="Search by Name, Gender, Job..."
        />
      </View>
      {activeApplicant ? renderApplicantProfile() : activeJob ? renderApplicantList() : renderJobList()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.grey,
    borderRadius: 10,
  },
  jobList: {
    paddingBottom: 20,
  },
  jobCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  jobCompany: {
    fontSize: 14,
    color: COLORS.grey,
  },
  jobLocation: {
    fontSize: 14,
    color: COLORS.grey,
  },
  applicantList: {
    paddingBottom: 20,
  },
  applicantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
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
  applicantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  applicantEmail: {
    fontSize: 14,
    color: COLORS.grey,
  },
  viewProfileText: {
    color: COLORS.primary,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.black,
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.grey,
  },
  phone: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.grey,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  backButton: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 10,
  },
});

export default Home;
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import COLORS from '../../constants/colors';


const jobs = [
  { id: 1, title: "Senior Developer" },
  { id: 2, title: "Junior Developer" },
  { id: 3, title: "Project Manager" },
  { id: 4, title: "UX Designer" },
  { id: 5, title: "Data Scientist" },
];

const applicants = [
  {
    id: 1,
    name: "Mark Doe",
    position: "CEO",
    appliedFor: "Senior Developer",
    image: "https://bootdey.com/img/Content/avatar/avatar7.png",
    about:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  },
  {
    id: 2,
    name: "John Doe",
    position: "CTO",
    appliedFor: "Junior Developer",
    image: "https://bootdey.com/img/Content/avatar/avatar1.png",
    about:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  },
  {
    id: 3,
    name: "Jane Doe",
    position: "Project Manager",
    appliedFor: "Project Manager",
    image: "https://bootdey.com/img/Content/avatar/avatar6.png",
    about:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  },
  {
    id: 4,
    name: "Emily Doe",
    position: "UX Designer",
    appliedFor: "UX Designer",
    image: "https://bootdey.com/img/Content/avatar/avatar5.png",
    about:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  },
  {
    id: 5,
    name: "Michael Doe",
    position: "Data Scientist",
    appliedFor: "Data Scientist",
    image: "https://bootdey.com/img/Content/avatar/avatar4.png",
    about:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  },
];

const Application = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userSelected, setUserSelected] = useState(null);

  const selectUser = (user) => {
    setUserSelected(user);
    setModalVisible(true);
  };

  const handleAccept = () => {
    alert(`Accepted ${userSelected.name}`);
    setModalVisible(false);
  };

  const handleReject = () => {
    alert(`Rejected ${userSelected.name}`);
    setModalVisible(false);
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity style={styles.jobCard} onPress={() => setSelectedJob(item)}>
      <View style={styles.jobCardContent}>
        <Image style={styles.jobLogo} source={{ uri: item.logo }} />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobDescription}>{item.description}</Text>
          <Text style={styles.jobLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderApplicantItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => selectUser(item)}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
        <Text style={styles.appliedFor}>Applied for: {item.appliedFor}</Text>
        <TouchableOpacity style={styles.profileButton} onPress={() => selectUser(item)}>
          <Text style={styles.profileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredApplicants = applicants.filter(
    (applicant) => applicant.appliedFor === selectedJob?.title
  );

  return (
    <View style={styles.container}>
      {selectedJob ? (
        <>
          <TouchableOpacity onPress={() => setSelectedJob(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Jobs</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Applicants for {selectedJob.title}</Text>
          <FlatList
            style={styles.userList}
            contentContainerStyle={styles.listContainer}
            data={filteredApplicants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderApplicantItem}
          />
        </>
      ) : (
        <>
          <Text style={styles.header}>Job Listings</Text>
          <FlatList
            style={styles.jobList}
            contentContainerStyle={styles.listContainer}
            data={jobs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderJobItem}
          />
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <ScrollView contentContainerStyle={styles.modalInfo}>
              {userSelected && (
                <>
                  <Image style={styles.modalImage} source={{ uri: userSelected.image }} />
                  <Text style={styles.name}>{userSelected.name}</Text>
                  <Text style={styles.position}>{userSelected.position}</Text>
                  <Text style={styles.about}>{userSelected.about}</Text>
                </>
              )}
            </ScrollView>
            <View style={styles.popupButtons}>
              <TouchableOpacity onPress={handleAccept} style={[styles.btnAction, styles.btnAccept]}>
                <Text style={styles.txtAction}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReject} style={[styles.btnAction, styles.btnReject]}>
                <Text style={styles.txtAction}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnClose}>
                <Text style={styles.txtClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Application;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: COLORS.grey,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 10,
  },
  jobList: {
    flex: 1,
  },
  userList: {
    flex: 1,
  },
  listContainer: {
    justifyContent: "space-between",
  },
  jobCard: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
  },
  card: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    flexBasis: "48%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  cardContent: {
    marginLeft: 20,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    color: COLORS.black,
  },
  appliedFor: {
    fontSize: 14,
    color: COLORS.black,
  },
  profileButton: {
    marginTop: 10,
    height: 35,
    width: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.secondary,
  },
  profileButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    textAlign: "center",
  },
  popupOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 7,
    padding: 20,
  },
  popupContent: {
    margin: 5,
    height: 250,
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    justifyContent: "center",
  },
  btnAction: {
    flex: 1,
    height: 40,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  btnAccept: {
    backgroundColor: COLORS.primary,
  },
  btnReject: {
    backgroundColor: "#FF0000",
  },
  btnClose: {
    backgroundColor: COLORS.secondary,
  },
  txtAction: {
    color: COLORS.white,
  },
  txtClose: {
    color: COLORS.white,
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
});

import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { UserContext } from "../../constants/UserContext";
import SERVER from "../../constants/server";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const TotalJob = () => {
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  const [jobData, setJobData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchJobData();
    setRefreshing(false);
  };

  const fetchJobData = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/jobdetail/mobile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job data");
      }
      const data = await response.json();
      setJobData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandText}>Applications</Text>
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
      <FlatList
        data={jobData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>Job Title: {item.job_title}</Text>
            <Text style={styles.text}>Company: {item.job_company_name}</Text>
            <Text style={styles.text}>Address: {item.job_address}</Text>
            <Text style={styles.text}>
              Salary Range: {item.job_min_salary} - {item.job_max_salary}
            </Text>
            <Text style={styles.text}>Job Type: {item.job_type}</Text>
            <Text style={styles.text}>Status: {item.job_status}</Text>
            <Text style={styles.text}>Description: {item.job_description}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
    marginTop: 25,
  },
  itemContainer: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
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
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TotalJob;

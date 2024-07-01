import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { UserContext } from "../../constants/UserContext";
import SERVER from "../../constants/server";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const TotalApplication = () => {
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  const [applicationData, setApplicationData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchApplicationData();
    setRefreshing(false);
  };

  const fetchApplicationData = async () => {
    try {
      const response = await fetch(
        `${SERVER.primaryUrl}/application/list/mobile/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch application data");
      }
      const data = await response.json();
      setApplicationData(data);
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
        data={applicationData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>Job ID: {item.job_id}</Text>
            <Text style={styles.text}>Status: {item.applicant_status}</Text>
            <Text style={styles.text}>
              Description: {item.applicant_description}
            </Text>
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
    marginTop: 20,
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

export default TotalApplication;

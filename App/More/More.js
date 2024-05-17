import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const More = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching");
        const response = await axios.get("http://127.0.0.1:8000/api/job-api");
        console.log(jobs);
        setJobs(response.data);
        console.log(jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log("Jobs Fetched ", jobs);
  }, []);
  const renderItem = ({ item }) => (
    <View>
      {/* style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }} */}
      <Text>{item.job_title}</Text>
      <Text>{item.job_description}</Text>
      <Text>{item.job_category}</Text>
      <Text>{item.job_address}</Text>
    </View>
  );
  return (
    <View>
      <Text>Jobs List</Text>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
  return <Text>More Page</Text>;
};

export default More;

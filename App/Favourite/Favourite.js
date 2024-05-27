import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SERVER from "../../constants/server";

const Favourite = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleRegisterNow = async () => {
    const url = `${SERVER.primaryUrl}/job/save`;

    const jobData = {
      job_title: "Geceptionist",
      job_category: "Marketing",
      job_address: "123 Main Street, Kathmandu",
      job_company_name: "KTM Consulting",
      job_experience: "1 year",
      job_max_salary: 30000,
      job_min_salary: 15000,
      job_slug: "receptionist-marketing-ktm-consulting",
      job_status: "Open",
      job_contact: "9816188459",
      job_validity: "2024-05-20",
      job_description:
        "This is the job description for a receptionist position at KTM Consulting. The candidate will be responsible for managing the front desk and handling client inquiries.",
      job_type: "Part Time",
      job_hour: "1pm-9pm",
    };

    console.log("Sending job data:", jobData);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log("Job registration successful", json);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={handleRegisterNow}>
        <Text>Hello</Text>
      </TouchableOpacity>
      {loading && <Text>Loading...</Text>}
    </View>
  );
};

export default Favourite;

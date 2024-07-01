const fetchApplicationData = async () => {
  try {
    const response = await fetch(
      `${SERVER.primaryUrl}/application/list/mobile/{user_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch application data");
    }
    const data = await response.json();
    // console.log("Job API Response:", data);
    setApplicationData(data);
    console.log("Auna parni data " + applicationData);
  } catch (error) {
    console.error(error);
  }
};

const getTotalApplication = () => aaplicationData.length;
const getPendingApplications = () =>
  jobData.filter((application) => application.applicant_status === "pending")
    .length;
const getRejectedApplications = () =>
  jobData.filter((application) => application.applicant_status === "rejected")
    .length;
const getVerifiedApplications = () =>
  jobData.filter((application) => application.applicant_status === "verified")
    .length;

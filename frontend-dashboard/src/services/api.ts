import axios from "axios";

const apiBaseURL = "https://671f301ee7a5792f052d41f2.mockapi.io/API/v1/"; // Replace with actual endpoint if available

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${apiBaseURL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};


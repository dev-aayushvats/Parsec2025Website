import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FormPage() {
  const [formData, setFormData] = useState({
    userName: "",
    collegeName: "",
    mobileNumber: "",
    accommodation: "",
  });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("googleId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert("Google ID not found. Please log in again.");
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Google ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/users/forms`,
        { ...formData, userId }
      );
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800/30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-hero text-white mb-6">Event Registration</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="userName"
            placeholder="Name"
            value={formData.userName}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <select
            name="accommodation"
            value={formData.accommodation}
            onChange={handleChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Accommodation Preference</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-6 py-3 font-semibold"
          >
            Submit
          </button>
          <a
            href="/"
            className="text-sm text-gray-200 underline hover:text-white text-center"
          >
            Back to Home
          </a>
        </form>
      </div>
    </div>
  );
}

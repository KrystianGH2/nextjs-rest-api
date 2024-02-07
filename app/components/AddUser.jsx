"use client";
import React, { useState } from "react";

const AddUserForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User added successfully");
        alert("User added successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const data = await response.json();
        console.log("Error adding user:", data.message);
        // Optionally, you can handle the error and provide user feedback
      }
    } catch (error) {
      console.error("Error adding user:", error.message);
      // Handle unexpected errors
    }
  };

  return (
    <div className="">
      <h2>Add User</h2>
      <label>
        Email:
        <input
          className="text-black"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          className="text-black"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          className="text-black"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUserForm;

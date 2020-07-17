import React, { useState, useEffect } from "react";
import User from "../models/User";

const AddNewUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const addUser = async () => {
    await fetch("/api/users/add-user", {
      method: "post",
      body: JSON.stringify(new User({ firstName, lastName, age, email })),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
  };

  return (
    <div id="add-user-form">
      <h3>Add a User</h3>
      <form onSubmit={() => addUser()}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={event => setAge(event.target.value)}
          />
        </label>
        <button>Add User</button>
      </form>
    </div>
  );
};

export default AddNewUserForm;

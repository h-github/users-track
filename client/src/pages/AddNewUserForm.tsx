import React, { useState, useEffect } from "react";
import User from "../models/User";
import { useLocation, useParams } from "react-router-dom";

const AddNewUserForm = ({ history }: { history: any }) => {
  const params = useParams<{ email: string }>();

  useEffect(() => {
    if (params.email) {
      const fetchUser = async () => {
        const result = await fetch(`/api/users/${params.email}`);
        const body = await result.json();
        resetState(new User(body));
      };
      fetchUser();
    } else {
      resetState();
    }
  }, [params.email]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [btnText, setBtnText] = useState("Add User");

  const addUser = async () => {
    await fetch("/api/users/add-user", {
      method: "post",
      body: JSON.stringify(new User({ firstName, lastName, age, email })),
      headers: {
        "Content-Type": "application/json",
      },
    });
    resetState();
  };

  const updateUser = async () => {
    await fetch(`/api/users/${params.email}`, {
      method: "post",
      body: JSON.stringify(new User({ firstName, lastName, age, email })),
      headers: {
        "Content-Type": "application/json",
      },
    });
    resetState();
    history.push("/");
  };

  const resetState = (user?: User) => {
    setFirstName(user ? user.firstName : "");
    setLastName(user ? user.lastName : "");
    setEmail(user ? user.email : "");
    setAge(user ? user.age.toString() : "");
    setBtnText(user ? "Update User" : "Add User");
  };

  return (
    <div id="add-user-form">
      <h3>{btnText}</h3>
      <form
        onSubmit={() => (btnText === "Add User" ? addUser() : updateUser())}
      >
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
        <button>{btnText}</button>
      </form>
    </div>
  );
};

export default AddNewUserForm;

import React, { useState, useEffect } from "react";
import User from "../models/User";
import DeleteUser from "../components/DeleteUser";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsersList] = useState([] as User[]);
  const [userDeleted, setUserDeleted] = useState("");
  const [userUpdated, setUserUpdated] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/users`);
      const body = await result.json();
      const userList: User[] = [];

      body.map((usr: any) => userList.push(new User(usr)));
      setUsersList(userList);
    };
    fetchData();
  }, [userDeleted, userUpdated]);

  return (
    <>
      {users.map((user: User, index: number) => (
        <div key={index} className="user">
          <h4>{`${user.firstName} ${user.lastName}`}</h4>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>

          <div className="btn-wrapper" style={{ float: "right" }}>
            <DeleteUser userKey={user.email} setUsersList={setUsersList} />
            <Link to={`/update-user/${user.email}`}>Update</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default UsersPage;

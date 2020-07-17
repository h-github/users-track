import React, { useState, useEffect } from "react";
import User from "../models/User";

const UsersPage = () => {
  const [users, setUsersList] = useState([] as User[]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/users`);
      const body = await result.json();
      const userList: User[] = [];

      body.map((usr: any) => userList.push(new User(usr)));
      setUsersList(userList);
    };
    fetchData();
  }, []);

  return (
    <>
      {users.map((user: User, index: number) => (
        <div key={index} className="user">
          <h4>{`${user.firstName} ${user.lastName}`}</h4>
          <p>Email:{user.email}</p>
          <p>Age:{user.age}</p>
        </div>
      ))}
    </>
  );
};

export default UsersPage;

import React, { useState, useEffect } from "react";

const DeleteUser = ({
  userKey,
  setUsersList,
}: {
  userKey: string;
  setUsersList: any;
}) => {
  const handleDeleteUser = async () => {
    const result = await fetch(`/api/users/${userKey}`, {
      method: "delete",
    });
    const body = await result.json();

    setUsersList(body);
  };

  return (
    <button className="warning" onClick={() => handleDeleteUser()}>
      Delete
    </button>
  );
};

export default DeleteUser;

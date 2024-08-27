import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-4 grid grid-cols-2 gap-3">
      <div>
        <p>FirstName</p>
        <p>lastName</p>
        <p>Email</p>
        <p>Phone</p>
      </div>
      <div>
        <p>{session?.user.firstName}</p>
        <p>{session?.user.lastName}</p>
        <p>{session?.user.email}</p>
        <p>{session?.user.phone}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

import React from "react";

export default function HomePage() {
  const authUser = localStorage.getItem("authUser");

  return (
    <h3 className="my-3 text-center">
      {authUser
        ? `Welcome ${JSON.parse(authUser).name} Go to the Todos Tab to Manage Your Todos`
        : "Welcome guest, Login/SignUp to Manage your Todos"}
    </h3>
  );
}

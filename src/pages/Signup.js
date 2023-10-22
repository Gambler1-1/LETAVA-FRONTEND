import React from "react";
import SignupForm from "../components/SignupForm";
import Navbarr from "../components/Navbarr";
export default function Signup() {
  return (
    <main>
      <Navbarr active="signupPage" />
      <SignupForm />
    </main>
  );
}

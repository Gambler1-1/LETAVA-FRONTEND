import React from "react";
import LoginForm from "../components/LoginForm";
import Navbarr from "../components/Navbarr";
export default function Login() {
  return (
    <main>
      <Navbarr active="loginPage" />
      <LoginForm />
    </main>
  );
}

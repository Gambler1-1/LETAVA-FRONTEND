import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FlashMessage from "react-flash-message";
import "../components/UpdatePostSignup.css";
import { Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Navbarr.css";
import UserContext from "../pages/UserContext";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import TimezoneSelect from "react-timezone-select";

import { useLocation } from 'react-router-dom';

export default function UpdatePostSignup() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get('user');
  console.log("USSSSSSSSSSER",user)
  const queryParameters = new URLSearchParams(window.location.search);
  var msg = queryParameters.get("msg");
  //   console.log(msg, "MSG");

  let message = localStorage.getItem("msg");

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("msg");
    }, 3000);
  }, []);

  const [data, setData] = useState({
    timezone: "",
    phoneNumber: "",
    id:user
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (value, dataOrEventType, event) => {
    if (dataOrEventType && dataOrEventType.name) {
      setData({ ...data, phoneNumber: value });
    }
  };

  const handleTimezoneChange = (selectedOption) => {
    setData({ ...data, timezone: selectedOption });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data, "SHOOOOOOOOOOOOM");
    
    try {

      const url = "https://letava.ai.paklogics.com/app/auth/updateProfile";
      const response = await axios.post(url, data,  {headers: {
        'Content-Type': 'application/json'
      }});

      console.log(response, "RESPONSE");

      localStorage.setItem("msg", response.data.message);

      // const user = JSON.stringify(response.data.user);
      // localStorage.setItem("user", user);
      // localStorage.setItem("token", response.data.token);
      // console.log(JSON.parse(localStorage.getItem("user")), "USER");

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.msg);
      }
    }
  };
  
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Letava.ai</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />.
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="login">
        <div className="col-md-4 mx-auto my-5">
          <div className="formContainer">
            {message && (
              <FlashMessage duration={3000}>
                <Alert variant="success">
                  <strong>{message}</strong>
                </Alert>
              </FlashMessage>
            )}
            {msg && (
              <FlashMessage duration={3000}>
                <Alert variant="success">
                  <strong>{msg}</strong>
                </Alert>
              </FlashMessage>
            )}
            <h1>Update Profile Information</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicNumber">

                <Form.Label>Contact Number</Form.Label>
                <PhoneInput
                required
                  value={data.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                  inputProps={{
                    required: true,
                    placeholder: "Enter your number",
                  }}
                  style={{
                    width: "100%"
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTimezone">
                <Form.Label>Time Zone</Form.Label>
                <TimezoneSelect
                required
                  value={data.timezone}
                  onChange={handleTimezoneChange}
                  name="timezone"
                  placeholder="Select Time Zone"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTimezone">
                {/* Add any additional form groups here if necessary */}
              </Form.Group>

              {error && (
                <div className="formError">
                  <Alert className="alert" variant="danger">
                    <strong>{error}</strong>
                  </Alert>
                </div>
              )}

              <Button variant="dark" size="sm" type="submit">
                Submit
              </Button>

            </Form>
          </div>
        </div>
      </Container>
    </>
  );
}

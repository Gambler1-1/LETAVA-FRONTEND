import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";


const Profile = () => {
    return (
        <Container fluid>
          <Nav className="flex-column sidebar">
            <Nav.Link href="#personal-info">Personal Information</Nav.Link>
            <Nav.Link href="#contact-details">Contact Details</Nav.Link>
            <Nav.Link href="#account-settings">Account Settings</Nav.Link>
          </Nav>
        </Container>
      );
}

export default Profile
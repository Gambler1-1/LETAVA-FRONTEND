import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Navbarr.css";
import UserContext from "../pages/UserContext";

export default function Navbarr(props ) {
 console.log("NAV RE-RENDERED");
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [crtItms, setCrtItms] = useState(0);

 var auth =false;
 console.log("USER IN FssRONT", user)
  const navigate = useNavigate();
  if(user !== "null"){
   auth = true
  }

  const logout = async () => {
    window.open(`https://letava.ai.paklogics.com/app/auth/logout`, "_self");
    localStorage.removeItem("user");
    setUser("null")
  };


  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Letava.ai</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />.
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {/* <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}

              {!auth && (
                <>
                  <Link to="/signup"  className={` ${props.active === "signupPage" ? 'btn btn-dark active' : 'btn btn-dark'}`}>
                    Signup
                  </Link>
                  <Link
                  to="/login"
                  className={` ${props.active === "loginPage" ? 'btn btn-dark active' : 'btn btn-dark'}`}
                >
                  Login
                </Link>
                </>
              )}
              {auth && (
                <>
                  <div>
                    {crtItms && (
                      <div className="num-of-order text-white">
                        <h5>{crtItms}</h5>
                      </div>
                    )}

                    <FontAwesomeIcon
                      onClick={() => navigate("/cart")}
                      className="icon "
                      icon={faCartShopping}
                      size="xl"
                    ></FontAwesomeIcon>
                  </div>
                  <NavDropdown
                    title={user.name}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="#action/3.2">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/myOrders")}
>
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Link onClick={logout}>Logout</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
  
}

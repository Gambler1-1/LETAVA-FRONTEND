import React from "react";
import axios from "axios";
import "../pages/home.css";
import {
  Container,
  Pagination,
  Button,
  ButtonGroup,
  ToggleButton,
  Form,
  Alert,
} from "react-bootstrap";
import FlashMessage from "react-flash-message";
import Product from "../components/Product";
import Navbarr from "../components/Navbarr";
import UserContext from "./UserContext";

import { useEffect, useState ,useContext } from "react";

export default function Home() {
  console.log('HOME CALLED')
  let message = localStorage.getItem("msg");

  const [products, setProducts] = useState([]);
  const [crtItms, setCrtItms] = useState(0);

  useEffect(() => {

  }, []);

  return (
    <>
      <Navbarr crtItms={crtItms} />

      {message && (
        <FlashMessage duration={3000}>
          <Alert variant="success">
            <strong>{message}</strong>
          </Alert>
        </FlashMessage>
      )}
    </>
  );
}

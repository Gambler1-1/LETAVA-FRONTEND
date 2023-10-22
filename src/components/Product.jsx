import { React, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/Product.css";
import axios from "axios";
import UserContext from "../pages/UserContext";

export default function Product({
  name,
  _id,
  category,
  imageUrl,
  price,
  description,
  setCrtItms,
  onClick,
}) {
  const { user } = useContext(UserContext);


  const navigate = useNavigate();

  let userId;
  // const user =JSON.parse(localStorage.getItem('user'))
  !user ? (userId = "null") : (userId = user.sub);

  const handleClick = async () => {
    if (!user) {
      navigate("/login");
    }
    try {
      const url = `https://letava.ai.paklogics.com/addToCart?id=${_id}&userId=${userId}`;
      const response = await axios.get(url);
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };
  let image = `https://letava.ai.paklogics.com/images/${imageUrl}`;

  return (
    <div>
      <Card className="product">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Title>Rs.{price}</Card.Title>
          <Button onClick={handleClick} variant="dark">
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

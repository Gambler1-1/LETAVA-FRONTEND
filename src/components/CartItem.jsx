import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import {
  MDBBtn,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,

} from "mdb-react-ui-kit";
import UserContext from "../pages/UserContext";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export default function CartItem(item,onClick) {
  const navigate = useNavigate();

  const [itmQty, setItmQty] = useState(item.quantity);
  const [itmTotal, setItmTotal] = useState(item.product.price*item.quantity);
  const { user } = useContext(UserContext);

  const removeFromCart= async()=>{
    try {
      const url = `https://letava.ai.paklogics.com/removeFromCart?id=${item.product._id}&userId=${user.sub}`;
      const response = await axios.get(url);
      const url2 = ` https://letava.ai.paklogics.com/cart?userId=${user.sub}`;
      const response2 = await axios.get(url2);
      setItmQty(response.data.newQty);
      setItmTotal(response.data.newQty*item.product.price)
      item.onClick(response2.data.totalPrice)

    } catch (error) {
      console.log(error);
    }
  }
  const addToCart= async()=>{
    try {
      const url = `https://letava.ai.paklogics.com/addToCart?id=${item.product._id}&userId=${user.sub}`;
      const response = await axios.get(url);
      const url2 = ` https://letava.ai.paklogics.com/cart?userId=${user.sub}`;
      const response2 = await axios.get(url2);
      setItmQty(response.data.newQty);
      setItmTotal(response.data.newQty*item.product.price)
      item.onClick(response2.data.totalPrice)

    } catch (error) {
      console.log(error);
    }
  }

  var image = `https://letava.ai.paklogics.com/images/${item.product.imageUrl}`;
  return (
    <>
      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
        <MDBCol md="2" lg="2" xl="2">
          <MDBCardImage
            src={image}
            fluid
            className="rounded-3"
            alt="Cotton T-shirt"
          />
        </MDBCol>
        <MDBCol md="3" lg="3" xl="3">
          <MDBTypography tag="h6" className="text-muted">
            {item.product.category}
          </MDBTypography>
          <MDBTypography tag="h6" className="text-black mb-0">
            {item.product.name}
          </MDBTypography>
          <MDBTypography tag="h8" className="text-black mb-0">
            Rs.{item.product.price}
          </MDBTypography>
        </MDBCol>
        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
        <button  onClick={removeFromCart} color="link" className="btn btn-danger px-1 py-1">-
          {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-minus" /> */}
          </button>

          <MDBInput
            type="number"
            min="0"
            value={itmQty}
            size="sm"
            style={{width: "50px"}}
          />
          <button   onClick={addToCart} color="link" className="btn btn-success px-1 py-1">+
          {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-plus" /> */}
          </button>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="text-end">
          <MDBTypography tag="h6" className="mb-0">
            Item Total: Rs.{itmTotal}
          </MDBTypography>
        </MDBCol>
        <MDBCol md="1" lg="1" xl="1" className="text-end">
          <a href="#!" className="text-muted">
            <MDBIcon fas icon="times" />
          </a>
        </MDBCol>
      </MDBRow>
      <hr className="my-4" />
    </>
  );
}

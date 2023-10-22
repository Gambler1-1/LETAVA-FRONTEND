import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import React from "react";
import Navbarr from "../components/Navbarr";
import "./Cart.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import CartItem from "../components/CartItem";
import UserContext from "./UserContext";

export default function QuantityEdit() {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const userId = user.sub;

  const fetchCart = async () => {
    try {
      
      const url = ` https://letava.ai.paklogics.com/cart?userId=${userId}`;
      const response = await axios.get(url);
      console.log(response.data,"RESP DATA OF FETCH CART")
      setCartItems(response.data.cartItems);
      setCart(response.data);
      setCartTotal(response.data.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {

    try {
      const url = ` https://letava.ai.paklogics.com/placeOrder?cartId=${cart.cartId}&totalPrice=${cart.totalPrice}&userId=${user.sub}`;
      const response = await axios.get(url);
      console.log(response,"RESP")
      if(response.status ===200){
        localStorage.setItem("msg", response.data.msg);
        // alert('ORDER PLACED SUCCESSFULLY')
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
    setTimeout(() => {
      localStorage.removeItem("msg");
    
    }, 3000);
  }, [cartTotal]);

  return (<>
  <Navbarr/>
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {cartItems.length} Items
                        </MDBTypography>
                      </div>

                      <hr className="my-4" />

                      {cartItems.length !== 0 ? (
                        cartItems.map((item) => (
                          <CartItem
                            key={item._id}
                            {...item}
                            onClick={setCartTotal}
                          />
                        ))
                      ) : (
                        <div>No items in cart</div>
                      )}

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="http://localhost:3000/" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  {cartItems.length > 0 && (
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total Items : {cartItems.length}
                        </MDBTypography>
                        <MDBTypography tag="h5">{cartTotal}/-</MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Shipping
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select
                          className="select p-2 rounded bg-grey"
                          style={{ width: "100%" }}
                        >
                          <option value="1">Standard-Delivery- €5.00</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="4">Four</option>
                        </select>
                      </div>

                      <MDBTypography tag="h5" className="text-uppercase mb-3">
                        Give code
                      </MDBTypography>

                      <div className="mb-5">
                        <MDBInput size="lg" label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">Rs.{cartTotal}</MDBTypography>
                      </div>

                      <Button onClick={placeOrder} variant="dark">BUY NOW</Button>
                    </div>
                  </MDBCol>
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </> );
}

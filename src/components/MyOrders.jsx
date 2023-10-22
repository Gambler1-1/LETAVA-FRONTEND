import React from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Navbarr from "./Navbarr";
import "../components/MyOrders.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UserContext from "../pages/UserContext";

const MyOrders = () => {
  const [data, setData] = useState([]);

  const { user } = useContext(UserContext);

  const userId = user.sub;
  const fetchOrders = async () => {
    try {
      const url = ` https://letava.ai.paklogics.com/myOrders?userId=${userId}`;
      const response = await axios.get(url);
      // console.log(response,"RESPONSE")
      setData(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(data, "DAAATTAA");
  }, [data]);
  return (
    <>
      <Navbarr />
      <div>
        {data.map((order) => {
          return (
            <div>
              {order.cart.items.map((item) => {
                return <>{/* <h1>{item.product.name}</h1> */}</>;
              })}
            </div>
          );
        })}
      </div>

      <div className="ordersTable">
        <Container>
        <h2>YOUR ORDERS</h2>

          <Table striped bordered hover >
            <thead>
              <tr>
                <th>#OrderID</th>
                <th>Details</th>
                <th>Total Price</th>
                <th>Ordered At</th>
                <th>Fulfilled</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              {data.sort((a, b) => new Date(a.orderedAt) - new Date(b.orderedAt)).map((order) => {
                return (
                  <>
                    <tr>
                      <td>{order._id}</td>
                      <td>
                        {" "}
                        <Table striped bordered hover>

                          <thead>
                            <tr>
                              <th>Items</th>
                              <th>Image</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.cart.items.map((item) => {
                              return (
                                <>
                                  {/* <h1>{item.product.name}</h1> */}
                                  <tr>
                                    <td>{item.product.name}</td>
                                    <td>
                                      <img
                                        src={`https://letava.ai.paklogics.com/images/${item.product.imageUrl}`}
                                        className="img-fluid rounded-3"
                                        alt="Cotton T-shirt"
                                        style={{
                                          width: "100px",
                                          height: "75px",
                                        }}
                                      />
                                    </td>
                                    <td>{item.product.price}</td>
                                    <td>{item.quantity}</td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </Table>
                      </td>
                      <td>Rs.{order.totalPrice}</td>
                      <td>{order.created_at}</td>
                      <td>{order.orderFulfilled ? "Yes" : "No"}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default MyOrders;

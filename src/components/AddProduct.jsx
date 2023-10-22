import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../components/SignupForm.css";
import FlashMessage from "react-flash-message";

export default function AddProduct() {
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleFileChange = (e) => {
    setData({ ...data, image: e.target.files[0]});
  };
  const handleSelect = (e) => {
    setData({ ...data, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://letava.ai.paklogics.com/admin/postAddProduct";

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response, "RESPONSE");
      // alert(response.data.msg);
      localStorage.setItem("msg", response.data.msg);
      navigate("/login");
    } catch (error) {
      // alert(error.response.data.msg);
      console.log(error.response.data.msg);
      setError(error.response.data.msg);
    }
  };

  return (
    <>
      <Container>
        <div className="col-md-4 mx-auto my-5">
          <h1>Add PRODUCT</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product Name"
                name="name"
                onChange={handleChange}
                value={data.name}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                required
                

              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product des ription"
                name="description"
                onChange={handleChange}
                value={data.description}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                placeholder="Select Category"
                type="category"
                name="category"
                value={data.category}
                onChange={handleSelect}
              >
                <option value="not provided">Select Category</option>
                <option value="Clothes">Clothes</option>
                <option value="Electronics">Electronics</option>
                <option value="Crockery">Grocery</option>
                <option value="Other">Other</option>
                <option value="Shoes">Shoes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter product price"
                name="price"
                onChange={handleChange}
                value={data.price}
              />
            </Form.Group>

            {error && (
              <div className="formError">
                <Alert variant="danger">
                  <strong>{error}</strong>
                </Alert>
              </div>
            )}
            <Button className="mt-3" variant="dark" type="submit">
              ADD
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
}

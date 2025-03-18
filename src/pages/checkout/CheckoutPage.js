import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from 'axios'

const CheckoutPage = ({ cartItems }) => {
    const [paymentMethod, setPaymentMethod] = useState("cod");

    const placeOrder = async () => {
        const token = localStorage.getItem('authToken')
        console.log(token);

        try {
            if (!selectedAddress) {
                alert('Please select a delivery address');
                return;
            }
            const resp = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/orders/create`,
                {
                    items: Array.isArray(cartItems?.cartItems)
                        ? cartItems.cartItems.map(item => ({
                            product: item._id || '65f8a6d9f1a2c34b2e',
                            quantity: item.quantity,
                            price: item.price,
                            size: item?.size
                        }))
                        : [],
                    shippingAddress: {
                        street: selectedAddress.street,
                        city: selectedAddress.city,
                        state: selectedAddress.state,
                        pincode: selectedAddress.pincode,
                        country: selectedAddress.country || "India",
                    },
                    paymentMethod: "cod", // Default for now
                    totalAmount: cartItems?.cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            console.log(resp);



            // alert("Order Placed! ✅ Order ID: ");
            toast.success("Order Placed Success ✅")
            navigate('profile/orders')
        } catch (error) {
            console.error("Order Failed", error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                {/* Left Side: Payment Options */}
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Select Payment Method</Card.Title>
                            <Form>
                                <Form.Check
                                    type="radio"
                                    label="Cash on Delivery (COD)"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Credit/Debit Card"
                                    name="payment"
                                    value="card"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <Form.Check
                                    type="radio"
                                    label="UPI / Net Banking"
                                    name="payment"
                                    value="upi"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </Form>
                            <Button variant="primary" className="mt-3" onClick={handleOrder}>
                                Order Now
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Right Side: Cart Summary */}
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between mb-2">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>₹{item.price * item.quantity}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No items in cart</p>
                            )}
                            <hr />
                            <h5>
                                Total: ₹
                                {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                            </h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;

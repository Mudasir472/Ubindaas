import { useState } from "react";

function Payment() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const [selectedPayment, setSelectedPayment] = useState(null);

    const totalMRP = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + (item.price - item.salePrice) * item.quantity, 0);
    const totalAmount = totalMRP - totalDiscount;

    return (
        <div className="container mt-4">
            <div className="d-flex gap-5">
                {/* Left Side - Payment Options */}
                <div className="d-flex flex-column w-50">
                    <h5 className="mb-3">Select Payment Method</h5>

                    {/* Cash on Delivery */}
                    <div className={`p-3 border rounded ${selectedPayment === "cod" ? "border-dark" : ""}`}
                        onClick={() => setSelectedPayment("cod")}
                        style={{ cursor: "pointer" }}>
                        <h6 className="m-0">Cash on Delivery</h6>
                    </div>
                    {selectedPayment === "cod" && (
                        <button className="btn btn-dark mt-2" style={{ width: "150px" }}>Continue</button>
                    )}

                    {/* Online Payment */}
                    <div className={`p-3 border rounded mt-3 ${selectedPayment === "online" ? "border-dark" : ""}`}
                        onClick={() => setSelectedPayment("online")}
                        style={{ cursor: "pointer" }}>
                        <h6 className="m-0">Online Payment</h6>
                    </div>
                    {selectedPayment === "online" && (
                        <button className="btn btn-dark mt-2" style={{ width: "150px" }}>Continue</button>
                    )}
                </div>

                {/* Right Side - Payment Details */}
                <div className="d-flex flex-column w-50">
                    <div className="col-md-10">
                        <div className="mt-3 p-3 border rounded">
                            <h6 className="mb-2">Payment Details</h6>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Total MRP</td>
                                        <td className="text-end">₹{totalMRP}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount</td>
                                        <td className="text-end">- ₹{totalDiscount}</td>
                                    </tr>
                                    <tr>
                                        <td>Platform Fee</td>
                                        <td className="text-end">Free</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Fee</td>
                                        <td className="text-end">Free</td>
                                    </tr>
                                    <tr className="fw-bold">
                                        <td>Total Amount</td>
                                        <td className="text-end">₹{totalAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Payment;

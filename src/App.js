import React, { useEffect, useState } from 'react';
import '@fontsource/poppins'; // Defaults to weight 400 (Regular)
import '@fontsource/poppins/700.css'; // Optional: Import a specific weight
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Profile/ProfileDashboard'; // This will be the main profile page
import Orders from './pages/Profile/Orders';
import Profile from './pages/Profile/Profile';
import Wishlist from './pages/Profile/Wishlist';
import Addresses from './pages/Profile/Addresses';
import ProtectedRoute from './components/ProtectedRoute';
import SizeGuide from './pages/Others/SizeGuide';
import FAQs from "./pages/Others/FAQs";
import ContactUs from "./pages/Others/ContactUs";
import AboutUs from "./pages/Others/AboutUs";
import ShippingPolicy from "./pages/Others/ShippingPolicy";
import ReturnPolicy from "./pages/Others/ReturnPolicy";
import PrivacyPolicy from "./pages/Others/PrivacyPolicy";
import TermConditions from "./pages/Others/TermConditions";
import AddressConfirmation from './pages/checkout/AddressConfirmation';
import toast, { Toaster } from "react-hot-toast";
import CollectionDetails from './components/layout/CollectionDetails';
import Payment from './pages/checkout/Payment';
import WomenDressCategory from './pages/Others/WomenDressCategory';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);


  return (
    <BrowserRouter>
      <div className="app">
        <Toaster reverseOrder={false} />
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/collections/:collectionId" element={<CollectionDetails />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/sizeguide' element={<SizeGuide />} />
            <Route path='/FAQs' element={<FAQs />} />
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/ShippingPolicy' element={<ShippingPolicy />} />
            <Route path='/ReturnPolicy' element={<ReturnPolicy />} />
            <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
            <Route path='/TermConditions' element={<TermConditions />} />
            <Route path='/women' element={<WomenDressCategory />} />






            {/* Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />

            {/* Profile Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile/settings" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/profile/wishlist" element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } />
            <Route path="/profile/addresses" element={
              <ProtectedRoute>
                <Addresses />
              </ProtectedRoute>
            } />
            <Route
              path="/checkout/address"
              element={
                <ProtectedRoute>
                  <AddressConfirmation cartItems={cartItems} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
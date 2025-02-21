// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { 
//   FiSearch, 
//   FiUser, 
//   FiShoppingCart, 
//   FiHeart, 
//   FiPackage, 
//   FiMapPin, 
//   FiLogOut,
//   FiMenu,
//   FiX
// } from 'react-icons/fi';
// import CategoryNav from './CategoryNav';
// import '../../styles/components/navbar.css';

// function Navbar() {
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const [showSearchOverlay, setShowSearchOverlay] = useState(false);
//   const isAuthenticated = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     if (isAuthenticated) {
//       navigate('/profile');
//     } else {
//       navigate('/login', { state: { from: '/profile' } });
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setShowProfileMenu(false);
//     window.location.href = '/';
//   };

//   const toggleMobileMenu = () => {
//     setShowMobileMenu(!showMobileMenu);
//     setShowProfileMenu(false);
//   };

//   return (
//     <header className="navbar">
//       <div className="navbar-top">
//         {/* Mobile Menu Button */}
//         <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
//           {showMobileMenu ? <FiX /> : <FiMenu />}
//         </button>
        
//         <Link to="/" className="logo">
//           <img 
//             src="/logo.jpeg" 
//             alt="UbinDaas Logo" 
//             style={{ height: "50px", width: "auto" }} 
//           />
//         </Link>
        
//         <div className="nav-actions">
//           {/* Desktop Search */}
//           <div className="search-container">
//             <input type="text" placeholder="What are you looking for?" />
//             <FiSearch className="search-icon" />
//           </div>

//           {/* Mobile Search Icon */}
//           <button 
//             className="search-icon-mobile" 
//             onClick={() => setShowSearchOverlay(true)}
//           >
//             <FiSearch />
//           </button>
          
//           <div className="profile-container">
//             <button 
//               className="profile-btn nav-icon" 
//               onClick={handleProfileClick}
//             >
//               <FiUser />
//             </button>
            
//             {showProfileMenu && isAuthenticated && (
//               <div className="profile-menu">
//                 <Link to="/profile" className="menu-item">
//                   <FiUser />
//                   <span>My Profile</span>
//                 </Link>
//                 <Link to="/profile/orders" className="menu-item">
//                   <FiPackage />
//                   <span>My Orders</span>
//                 </Link>
//                 <Link to="/profile/wishlist" className="menu-item">
//                   <FiHeart />
//                   <span>Wishlist</span>
//                 </Link>
//                 <Link to="/profile/addresses" className="menu-item">
//                   <FiMapPin />
//                   <span>Addresses</span>
//                 </Link>
//                 <button 
//                   className="menu-item logout"
//                   onClick={handleLogout}
//                 >
//                   <FiLogOut />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           <Link to="/cart" className="cart-icon">
//             <FiShoppingCart />
//             <span className="cart-count">0</span>
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {showMobileMenu && (
//         <div className="mobile-menu">
//           <div className="mobile-menu-content">
//             <Link 
//               to="/" 
//               className="mobile-menu-item"
//               onClick={() => setShowMobileMenu(false)}
//             >
//               Women
//             </Link>
//             <Link 
//               to="/" 
//               className="mobile-menu-item"
//               onClick={() => setShowMobileMenu(false)}
//             >
//               Men
//             </Link>
//             {/* Add more menu items as needed */}
//           </div>
//         </div>
//       )}

//       {/* Mobile Search Overlay */}
//       {showSearchOverlay && (
//         <div className="search-overlay active">
//           <div className="search-overlay-header">
//             <button 
//               className="close-search"
//               onClick={() => setShowSearchOverlay(false)}
//             >
//               <FiX />
//             </button>
//             <input 
//               type="text" 
//               placeholder="What are you looking for?"
//               autoFocus
//             />
//           </div>
//         </div>
//       )}

//       <CategoryNav />
//     </header>
//   );
// }

// export default Navbar;



import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import '../../styles/components/navbar.css';
import logo from "../../assets/logo.jpeg";
import WishlistIcon from "../../assets/heart-solid.svg";
import ProfileIcon from "../../assets/user-solid.svg";
import CartIcon from "../../assets/cart-shopping-solid (1).svg";



// Categories data from your original Navbar.js
const categories = {
 
"Women's Fashion": {
    subcategories: [
      {
        title: "Shop All Ethnic Wear",
        items: ["Kurtis & Kurtas", "Suits", "Sarees", "Lehengas", "Bottoms", "Blouses & Fabrics", "Dupattas", "Ethnic dresses"]
      },
      {
        title: "Shop All Western Wear",
        items: ["Tops & T-shirts", "Dresses", "Jeans", "Shirts", "Trousers", "Skirts", "Shorts", "Jackets & Blazers", "Leggings", "Capris", "Jumpsuits", "Shrugs", "Sweaters", "Sweatshirts"]
      },
      {
        title: "Activewear & Sportswear",
        items: ["T-shirts", "Shorts", "Sets", "Jackets", "Track Pants", "Innerwear"]
      },
      
      {
        title: "Lingerie & Lounge Sets",
        items: ["Bras", "Panties", "Lingerie Sets", "Camisoles", "Sleepwear & Robes", "Shapewear", "Swimwear"]
      },

      {
        title: "Shop All Footwear",
        items: ["Casual Footwear", "Boots", "Sneakers", "Flip Flops", "Sports Shoes", "Ethnic Footwear"]
      },

      {
        title: "Bags, Wallets & Clutches",
        items: ["Handbags", "Tote Bags", "Sling Bags", "Backpacks", "Wallets", "Clutches", "Premium Handbags"]
      },

      {
        title: " Jewellery",
        items: ["Gold", "Silver", "Diamond", "Fashion Jewellery"]
      },

      {
        title: "Watches",
        items: ["Smart Watches", "Work Watches", "Casual Watches", "Party Watches", "Digital Watches"]
      }


    ]
  },
  "Men's Fashion": {
    subcategories: [

      {
        title: "Tops",
        items: ["T-shirts", "Polo T-shirts", "Shirts", "Formal Shirts", "Sweatshirts", "Jackets", "Suits", "Blazers"]
      },
      {
        title: "Bottoms",
        items: ["Jeans", "Chinos", "Trousers", "Formal Trousers", "Shorts", "Joggers", "Trackpants"]
      },
      {
        title: "Activewear",
        items: ["T-Shirts & Jerseys", "Sports Shorts", "Sports Jackets", "Joggers"]
      },
      
      {
        title: "Innerwear",
        items: ["Boxers", "Briefs", "Trunks", "Vests", "Night Suits"]
      },

      {
        title: "Footwear",
        items: ["Casual Shoes", "Sneakers", "Formal Shoes", "Running Shoes", "Training Shoes", "Sports Shoes", "Boots", "Flip Flops", "Sandals & Floaters"]
      },

      {
        title: "Watches",
        items: ["Smartwatches", "Work Watches", "Casual Watches", "Party Watches", "Digital watches", "Multifunctional Watches"]
      },

      {
        title: " Bags, Backpacks & Wallets",
        items: ["Backpacks", "Wallets", "Messenger Bags", "Crossbody Bags", "Fashion Accessories", "Belts", "Ties", "Cufflinks", "Sunglasses", "Caps", "Sports & Fitness"]
      }

    ]
  },
  "Kid's Ware": {
    subcategories: [

      {
        title: "Girls Clothing",
        items: ["Tops", "Jeans & Trousers", "Dresses", "Activewear", "Jumpsuits & Dungarees", "Skirts, Shorts & Jumpsuits", "Ethnic Wear", "Matching Sets", "Sleepwear", "Winter Wear"]
      },
      {
        title: "Boys Clothing",
        items: ["T-shirts & Polos", "Shirts", "Jeans & Trousers", "Shorts & Dungarees", "Activewear", "Ethnic Wear", "Inner Wear", "Sleepwear", "Winter Wear"]
      },
      
      {
        title: "Infants",
        items: ["Jeans & Trousers", "Tops & T-shirts", "Matching Sets", "Jumpsuits & Dungarees", "Dresses","Shirts", "Ethnic Wear", "Shorts & Jumpsuits", "Winter Wear", "0 - 6 Months", "6 - 12 Months", "12 - 24 Months"]
      },

      {
        title: "Shop By Age",
        items: ["2 - 6 Years", "6 - 12 Years", "12 - 16 Years"]
      }

    ]
  },
  "Home & Kitchen": {
    subcategories: [

      {
        title: "Bedding & Linen",
        items: ["Bedsheets", "Bedding Sets", "Bed Covers", "Pillows & Mattresses", "Pillow Covers", "Comforters", "Quilts & Rajais", "Dohars", "Kids Bedding Linen"]
      },
      {
        title: "Bath Linen & Accessories",
        items: ["Towels", "Hand Towels", "Face Towels", "Bath Mats & Rugs", "Bathrobes", "Kids Bath Linen", "Laundry & Storage"]
      },
      {
        title: "Room Furnishings",
        items: ["Cushion Covers", "Cushion Fillers", "Rugs & Dhurries", "Carpets", "Doormats", "Curtains"]
      },
      
      {
        title: "Lamps & Lighting",
        items: ["Table Lamps", "Ceiling Lamps", "Wall Lamps", "Floor Lamps", "Decorative Lights", "Chandeliers"]
      },

      {
        title: "Kitchen",
        items: ["Kitchen Appliances", "Pots & Pans", "Tawas", "Kadhai & Woks", "Pressure Cookers", "Casseroles", "Cookware Sets", "Bakeware", "Kitchen Tools", "Storage Containers"]
      },

      {
        title: "Tableware",
        items: ["Glassware & Bar", "Serveware", "Tea & Coffee Sets", "Dinnerware", "Table Linen"]
      },

      {
        title: "Home Decor",
        items: ["Showpieces", "Wall Decor", "Vases", "Photo Frames", "Candles & Holders", "Room Fragrances"]
      }

    ]
  },


  "Beauty": {
    subcategories: [

      {
        title: "Fragrance Store",
        items: ["Perfumes", "Gift Sets", "Deodorants & Anti-Perspirants", "Body Mists", "All Fragrances"]
      },
      {
        title: "Makeup",
        items: ["Eyes", "Face", "Lips", "Nails", "All Makeup"]
      },
      
      {
        title: "Skin",
        items: ["Cleansers", "Moisturizers & Serums", "Facial Peels & Masks", "Eye creams", "Combo Sets","Men's Skin care", "Homegrown Brands", "K-Skin care", "Derma Skin care", "All skin"]
      },

      {
        title: "Hair",
        items: ["Shampoos & Conditioners", "Hair Styling & Care", "Hair Oils", "Hair Masks", "Professional Hair care", "Natural Hair care", "All Hair"]
      },

      {
        title: "Men's Grooming",
        items: ["Shaving", "Beard & Moustache Care", "Grooming Kits","All Men's Grooming", "Tools & Accessories", "Bath & Body", "All Beauty & Grooming"]
      }

    ]
  },

  "Furniture": {
    subcategories: [



      {
        title: "Bed Room Furniture",
        items: ["Beds", "Mattresses", "Wardrobes"]
      },
      {
        title: "Living Room Furniture",
        items: ["Sofa", "Sofa Beds"]
      },
      {
        title: "Dining Tables & Chairs",
        items: ["Coffee Tables", "Shoe Racks"]
      },
      

      {
        title: "Office & Study Furniture",
        items: []
      },
      {
        title: "Kids Room Furniture",
        items: []
      },
      {
        title: "DIY Furniture",
        items: ["Bean Bags", "Collapsible Wardrobes"]
      }



    ]
  },

  

};


// Memoized Navigation Icons component
const NavigationIcons = memo(() => (
  <div className="navbar-right">
    <Link to="/cart" className="icon-link" aria-label="Shopping Cart">
      <img src={CartIcon} alt="" width={20} height={20} />
    </Link>
    <Link to="/wishlist" className="icon-link" aria-label="Wishlist">
      <img src={WishlistIcon} alt="" width={20} height={20} />
    </Link>
    <Link to="/profile" className="icon-link" aria-label="Profile">
      <img src={ProfileIcon} alt="" width={20} height={20} />
    </Link>
  </div>
));

const DashNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveCategory(null);
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>

          <div className="categories-wrapper">
            <div className="dropdown">
              <button className="dropdown-btn">
                <span>Categories </span>
                <ChevronDown size={16} />
              </button>
              <div className="dropdown-content">
                {Object.entries(categories).map(([category, { subcategories }]) => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    {subcategories.length > 0 && (
                      <div className="subcategories-panel">
                        <div className="subcategories-grid">
                          {subcategories.map((section, idx) => (
                            <div key={idx} className="subcategory-column">
                              <h3>{section.title}</h3>
                              <ul>
                                {section.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <Link to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-center">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              aria-label="Search"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>

        <NavigationIcons />

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search for products, brands and more" />
          </div>

          <div className="mobile-categories">
            {Object.entries(categories).map(([category, { subcategories }]) => (
              <div key={category} className="mobile-category">
                <button 
                  className="mobile-category-btn"
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category}</span>
                  <ChevronDown 
                    className={`transform transition-transform ${
                      activeCategory === category ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {activeCategory === category && subcategories.length > 0 && (
                  <div className="mobile-subcategories">
                    {subcategories.map((section, idx) => (
                      <div key={idx} className="mobile-subcategory-section">
                        <h3>{section.title}</h3>
                        <ul>
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link to={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mobile-links">
            <Link to="/Cart" className="mobile-link">Cart</Link>
            <Link to="/wishlist" className="mobile-link">Wishlist</Link>
            <Link to="/profile" className="mobile-link">Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(DashNavBar);

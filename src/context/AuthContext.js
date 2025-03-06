// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("authToken"); // Convert to boolean

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import { createContext, useState } from "react";

// Context creation
export const LoginContext = createContext(null);

const ContextProvider = ({ children }) => {
  // State for login data
  const [loginData, setLoginData] = useState(null); // Change based on the actual data structure you expect
  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
};
export default ContextProvider;

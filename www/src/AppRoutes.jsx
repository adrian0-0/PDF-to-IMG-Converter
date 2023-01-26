import App from "./App";
import UserAuthentication from "./UserAuthentication";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

// const ProtectedRoute = ({ isEnabled, ...props }) => {
//   return isEnabled ? <Route {...props} /> : <Redirect to="/login" />;
// };

function isAuthenticated() {}

function AppRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App></App>}></Route>
          <Route
            path="/login"
            element={<UserAuthentication></UserAuthentication>}
          ></Route>
          {/* <ProtectedRoute
            path="/test"
            isEnabled={isAuthenticated()}
          ></ProtectedRoute> */}
        </Routes>
      </Router>
    </div>
  );
}

export default AppRoutes;

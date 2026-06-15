import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import EditJob from "./pages/EditJob";
const PrivateRoutes = ({ children }) => {
  const {token} = useAuth();
  return token ? children : <Navigate to="/login" />;
};
export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            ></Route>
            <Route path="/edit"
            element={
              <PrivateRoutes>
                <EditJob/>
              </PrivateRoutes>
            }
            >

            </Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

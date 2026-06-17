import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import EditJob from "./pages/EditJob";
const PrivateRoutes = () => {
  const {token} = useAuth();
  return token ? <Outlet/> : <Navigate to="/login" />;
};
const PublicRoute =()=>{
 const {token} = useAuth();
  return token ? <Navigate to="/dashboard" /> :<Outlet/>;
}
export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute/>}>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoutes/>}>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/edit" element={<EditJob/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/login" />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

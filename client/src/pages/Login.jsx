import api from "../services/api";
import {useAuth} from "../context/AuthContext"
import {useNavigate} from "react-router-dom"
import { useState } from "react";

export default  function Login() {
  const navigate=useNavigate();
  const {login} =useAuth()
  const [error, setError] = useState("")
  const [loading,setLoading]=useState(false)
  const handleLogin= async (e)=>{
    e.preventDefault();
    setError("");
    setLoading(true)
    const formData= new FormData(e.currentTarget);
    const data=Object.fromEntries(formData.entries());
    try{
    const response=await api.post("/auth/login/",data);
    login(response.data.token,response.data.user.id);
    navigate("/dashboard")
    }catch(err){
      console.error(err)
      if(err.response?.status === 401){
        setError("Invalid email or password. Please try again.");
      } else if(err.response?.data?.message){
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }finally{
      setLoading(false)
    }

    
  }
  return (
    <>
      <div className="auth-page">
        <section className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form action="" onSubmit={handleLogin} className="form-stack">
          <label htmlFor="email">Enter Email</label>
          <input id="email" type="text" name="email" required onChange={() => setError("")} />
          <label htmlFor="password">Enter Password here</label>
          <input id="password" type="password" name="password" required onChange={() => setError("")} />
          <button>{loading?"Loading..":"Login"}</button>
          <button type="button" className="secondary-button" onClick={()=>navigate("/register")}>Register Here!</button>
        </form>
        </section>
      </div>
    </>
  );
}

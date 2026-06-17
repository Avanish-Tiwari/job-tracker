import {useAuth} from "../context/AuthContext"
import api from "../services/api";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const {login}=useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await api.post("/auth/register/", data);
      console.log(response.data);
      login(response.data.token, response.data.user.id);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="auth-page">
      <section className="auth-card">
      <p className="eyebrow">Create account</p>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit} className="form-stack">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button>Register</button>
        <button type="button" className="secondary-button" onClick={()=>navigate("/login")}>Go To Login Page</button>
      </form>
      </section>
    </div>
  );
}

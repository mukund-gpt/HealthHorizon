import React, { useEffect } from "react";
import "../assets/css/Signup.css";
import { useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(0);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    document.head.appendChild(link);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      toast.info("Fill all the details🤬");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(res);

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <span className="fa fa-envelope"></span>
              <input
                type="text"
                value={formData.email || ""}
                onChange={handleChange}
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input
                type={showPassword ? "text" : "password"}
                className="pass-key"
                value={formData.password || ""}
                onChange={handleChange}
                name="password"
                placeholder="Password"
              />
              <span
                className="show"
                onClick={() => setShowPassword(!showPassword)}
              >
                SHOW
              </span>
            </div>

            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>

            <div className="field">
              <input type="submit" value="Login" />
            </div>
          </form>

          <div className="login">Or login with</div>
          <div className="links">
            <div className="facebook">
              <i className="fab fa-facebook-f">
                <span>Facebook</span>
              </i>
            </div>
            <div className="instagram">
              <i className="fab fa-instagram">
                <span>Instagram</span>
              </i>
            </div>
          </div>
          <div className="signup">
            New User. &nbsp;
            <a
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

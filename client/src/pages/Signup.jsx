import React, { useEffect } from "react";
import "../assets/css/Signup.css";
import { useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(0);
  const [gender, setGender] = useState("");
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    document.head.appendChild(link);
  }, []);

  const handleGenderSelector = (e) => {
    const { value } = e.target;
    setGender(value);
    formData.gender = value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.age ||
      !formData.gender
    ) {
      toast.info("Fill all the details🤬");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
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
        toast.success("Registration Successful");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-img">
        <div className="content">
          <header>SignUp Form</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <span className="fa fa-user"></span>
              <input
                type="text"
                value={formData.username || ""}
                onChange={handleChange}
                name="username"
                placeholder="Username"
              />
            </div>
            <br />
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
            <br />

            <div className="gender">
              <div>
                <input
                  type="checkbox"
                  name="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderSelector}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderSelector}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <br />
            <div className="field">
              <span className="fa fa-arrow-up-9-1"></span>
              <input
                type="number"
                value={formData.age || ""}
                onChange={handleChange}
                name="age"
                min={0}
                placeholder="Enter your age"
              />
            </div>

            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>

            <div className="field">
              <input type="submit" value="SignUp" />
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
            Already have an account?
            <a
              onClick={() => {
                navigate("/login");
              }}
            >
              Login Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

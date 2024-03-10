import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const locations = useLocation();
  const [names, Setname] = useState("");
  const [email, Setemail] = useState("");
  const [pass, Setpass] = useState("");

  async function Senddata() {
    await axios
      .post(`${import.meta.env.VITE_API_URL}sign-up/`, {
        name: names,
        username: email,
        password: pass,
      })
      .then(function (_response: any) {
        // handle success
        // console.log("Status : " + response.status);
        // console.log("Response : " + response.data);
        alert("Account Created");

        navigate("/", { state: { from: locations }, replace: true });
      })
      .catch(function (_error: any) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
        Setemail("");
        Setname("");
        Setpass("");
      });
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Sign-up</h1>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={(e) => {
              Setname(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Username or Email
          </label>
          <input
            name="user"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              Setemail(e.target.value);
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="pass"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              Setpass(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={Senddata}>
          Sign Up
        </button>
        <Link
          className="nav-link link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover "
          to="/"
        >
          have a Account?
        </Link>
      </div>
    </>
  );
}

export default Signup;

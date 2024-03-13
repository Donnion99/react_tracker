import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

// Create your own history instance.
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

function Login() {
  const [email, Setemail] = useState("demo@demo.com");
  const [pass, Setpass] = useState("demo");
  const [User, Setuser] = useState("");
  const [Redirect, setRedirect] = useState(Boolean);
  const navigate = useNavigate();
  const locations = useLocation();
  Redirect;

  async function Senddata() {
    await axios
      .post(`${import.meta.env.VITE_API_URL}login/`, {
        username: email,
        password: pass,
      })
      .then(function (response: any) {
        // handle success
        // console.log("Status : " + response.status);
        // console.log("Response : " + response.data.access);

        Setuser(response.data.access);
        if (response.data.status == 201) {
          localStorage.setItem("login-state", JSON.stringify("True"));
          localStorage.setItem("username", JSON.stringify(response.data.user));
          localStorage.setItem("owner", JSON.stringify(response.data.ownerno));

          localStorage.setItem(
            "login-token",
            JSON.stringify(response.data.access)
          );
          setRedirect(true);
          navigate("/dashboard", { state: { from: locations }, replace: true });
          // history.push("/home");
          // window.location.reload();
          // console.log("reloaded");
        } else {
          alert("Wrong Credentials");
        }
      })
      .catch(function (_error: any) {
        // handle error
        // console.log(error);
        navigate("/", { state: { from: locations }, replace: true });
      })
      .finally(function () {
        // always executed
        Setemail("");
        Setpass("");
      });
  }

  return (
    <>
      <Navbar />
      {User != null && User}

      <div className="container">
        <h1>Login</h1>
        <div id="emailHelp" className="form-text">
          <h5>sample Account username : demo@demo.com ,password :demo</h5>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="user"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email && email}
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
            value={pass && pass}
            onChange={(e) => {
              Setpass(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={Senddata}>
          Log in
        </button>
        <Link
          className="nav-link link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover "
          to="/signup"
        >
          Create Account Here :D
        </Link>
      </div>
    </>
  );
}

export default Login;

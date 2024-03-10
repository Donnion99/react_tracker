import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
// Create your own history instance.
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();

function Logout() {
  const navigate = useNavigate();
  const locations = useLocation();

  localStorage.setItem("login-token", JSON.stringify(undefined));
  localStorage.setItem("login-state", JSON.stringify(undefined));
  localStorage.setItem("username", JSON.stringify(undefined));
  localStorage.setItem("owner", JSON.stringify(undefined));

  useEffect(() => {
    navigate("/", { state: { from: locations }, replace: true });
  });

  return null;
}

export default Logout;

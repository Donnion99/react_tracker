import Signup from "./Components/signup";
import Login from "./Components/login";
import Logout from "./Components/logout";
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Routes,
  // redirect,
} from "react-router-dom";
import Home from "./Components/home";
import Transaction from "./Components/Transactions";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />}></Route>

          <Route path="/signup" element={<Signup />}></Route>

          <Route path="/" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/Transactions" element={<Transaction />}></Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;

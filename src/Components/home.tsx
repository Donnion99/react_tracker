import Transactions from "./List_tans";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Networth from "./Networth";
// import MultiForm from "./multiform";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import MultiForm2 from "./multiform2";

function Home() {
  const username = localStorage.getItem("username");
  const names = username?.replace(/['"]+/g, "");

  const [TotalExpense, setTotalExpense] = useState();
  const [TotalIncome, setTotalIncome] = useState();

  // Function to update data
  const updateExpense = (newData: SetStateAction<undefined>) => {
    setTotalExpense(newData);
  };
  const updateIncome = (newData: SetStateAction<undefined>) => {
    setTotalIncome(newData);
  };
  let data = {
    Expense: TotalExpense,
    Income: TotalIncome,
  };

  const [Expensedata, setExpensedata] = useState(null);
  const [Incomedata, setIncomedata] = useState(null);

  const owner_no = localStorage.getItem("owner");
  const owner = owner_no?.replace(/['"]+/g, "");

  useEffect(() => {
    async function fetchData() {
      const tokens = localStorage.getItem("login-token");
      // Remove any remaining quotation marks from the string
      const TOKEN = tokens?.replace(/['"]+/g, "");

      // Now you have the token without quotation marks
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };

      await axios
        .get(`${import.meta.env.VITE_API_URL}Expense/?owner_no=${owner}`, {
          headers,
        })
        .then(function (response) {
          // handle success
          setExpensedata(response.data);
          // console.log("reuest send");
        })
        .catch(function (_error) {
          // handle error
          // console.log(error);
        })
        .finally(function () {
          // always executed
          // window.location.href = "http://localhost:5173/login";
        });
    }
    fetchData();

    // Set up interval to call fetchData every 2 seconds

    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const tokens = localStorage.getItem("login-token");
      // Remove any remaining quotation marks from the string
      const TOKEN = tokens?.replace(/['"]+/g, "");

      // Now you have the token without quotation marks
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };

      await axios
        .get(`${import.meta.env.VITE_API_URL}Income/?owner_no=${owner}`, {
          headers,
        })
        .then(function (response) {
          // handle success
          setIncomedata(response.data);
        })
        .catch(function (_error) {
          // handle error
          // console.log(error);
        })
        .finally(function () {
          // always executed
          // window.location.href = "http://localhost:5173/login";
        });
    }
    fetchData();

    // Set up interval to call fetchData every 2 seconds

    const intervalId = setInterval(fetchData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Navbar />

      {Expensedata == null ? (
        <div className="alert alert-primary" role="alert">
          <Link className="nav-link" to="/">
            Please Login to continue 𝐶̲𝑙̲𝑖̲𝑐̲𝑘̲ 𝐻̲𝑒̲𝑟̲𝑒̲.̲
          </Link>
        </div>
      ) : (
        <>
          <h1 className="m-3"> {names ? `Welcome ${names}!` : ""}</h1>
          <Networth data={data} />
          <br />
          <MultiForm2
            expense={
              <Transactions
                updateex={updateExpense}
                data={Expensedata}
                keyurl={"ex"}
              />
            }
            income={
              <Transactions
                updatein={updateIncome}
                data={Incomedata}
                keyurl={"in"}
                name={"Income"}
              />
            }
          />
          <MultiForm2 />

          <br />
        </>
      )}
    </>
  );
}

export default Home;

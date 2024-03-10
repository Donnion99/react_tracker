import { useState } from "react";
import axios from "axios";

function Add_Expense() {
  const [Amount, SetAmount] = useState<string>("");
  const [Category, SetCategory] = useState<string>("");
  const [date, Setdate] = useState<string>("");
  const [Desc, SetDesc] = useState<string>("");
  const name = localStorage.getItem("owner");
  const owner_no = name?.replace(/['"]+/g, "");

  async function Senddata() {
    const tokens = localStorage.getItem("login-token");
    // Remove any remaining quotation marks from the string
    const TOKEN = tokens?.replace(/['"]+/g, "");

    // Now you have the token without quotation marks
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    //posting data

    await axios
      .post(
        `${import.meta.env.VITE_API_URL}Expense/`,
        {
          Amount: Amount,
          Category: Category,
          Date: date,
          Desc: Desc,
          owner: owner_no,
        },
        { headers }
      )
      .then(function (_response: any) {
        // handle success
        // console.log("Status : " + response.status);
        // console.log("Response : " + response.data);
        // console.log(response);
        // alert(response.data);
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      });
  }

  return (
    <>
      <div className="container mb-5">
        <h1>Add Expense</h1>

        <div className="mb-3">
          <input
            name="user"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              SetAmount(e.target.value);
            }}
            placeholder="Amount"
          />
        </div>
        <div className="mb-3">
          <input
            name="user"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              SetDesc(e.target.value);
            }}
            placeholder="Description"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              SetCategory(e.target.value);
            }}
          >
            <option selected>Select Category</option>
            <option value="BILLS">BILLS</option>
            <option value="RENT">RENT</option>
            <option value="EDUCATION">EDUCATION</option>
            <option value="FOOD">FOOD</option>
            <option value="TRANSPORT">TRANSPORTATION</option>
            <option value="MISC">MISC</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            name="user"
            type="date"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              Setdate(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={Senddata}>
          Post Data
        </button>
      </div>
    </>
  );
}
export default Add_Expense;

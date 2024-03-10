import { useState } from "react";
import axios from "axios";

function Adduser() {
  const [name, Setname] = useState("");

  async function Senddata() {
    await axios
      .post(`${import.meta.env.VITE_API_URL}test/create/`, {
        id: 3,
        username: name,
        email: "",
      })
      .then(function (response) {
        // handle success
        console.log("Status : " + response.status);
        console.log("Response : " + response.data);
        alert(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  return (
    <>
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
        <button onClick={Senddata}>Add user</button>
      </div>
    </>
  );
}

export default Adduser;

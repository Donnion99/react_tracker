import { useState } from "react";
import axios from "axios";

function Updateuser() {
  const [name, Setname] = useState("");
  const [id, Setid] = useState("");

  async function Senddata(id: string) {
    await axios
      .post(`${import.meta.env.VITE_API_URL}test/update/${id}`, {
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
        <label htmlFor="exampleInputEmail1" className="form-label">
          Id
        </label>
        <input
          name="name"
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          onChange={(e) => {
            Setid(e.target.value);
          }}
        />
        <button onClick={() => Senddata(id)}>Update user</button>
      </div>
    </>
  );
}

export default Updateuser;

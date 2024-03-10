import axios from "axios";
import { useState, useEffect } from "react";

function Transactions({ data, name, keyurl, updatein, updateex }: any) {
  const [Income, setIncome] = useState();
  Income;

  async function Delete(id: any) {
    if (confirm("This will Delete your Transaction!")) {
      await axios
        .delete(`${import.meta.env.VITE_API_URL}delete/${keyurl}/${id}`)
        .then(function (_response: any) {
          // handle success
          // console.log("Status : " + response.status);
          // console.log("Response : " + response.data);
          // alert(response.data);
        })
        .catch(function (_error: any) {
          // handle error
          // console.log(error);
        });
    }
  }

  useEffect(() => {
    // Calculate the total Income amount
    if (data != null) {
      const totalAmount = data.reduce(
        (total: any, item: { Amount: any }) => total + item.Amount,
        0
      );

      // Update the Income state
      setIncome(totalAmount);
      if (!name) {
        updateex(totalAmount);
      } else {
        updatein(totalAmount);
      }
    }
  }, [data]);

  return (
    <>
      {data.length != 0 ? (
        <h1 className="m-3">{!name ? "Expenses" : name}</h1>
      ) : (
        <h4> No Enteries yet</h4>
      )}
      <div className="m-3">
        <ul>
          {data &&
            data.map((item: any, index: any) => (
              <div key={index}>
                <div className="list-group">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action flex-column align-items-start"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">
                        {item.Date} : {item.Desc}
                      </h5>
                      <small>Amount : {item.Amount}</small>
                      <button onClick={() => Delete(item.id)}>Delete</button>
                    </div>
                  </a>
                </div>
              </div>
            ))}
        </ul>
        {/* {Income} rs. */}
      </div>
    </>
  );
}

export default Transactions;

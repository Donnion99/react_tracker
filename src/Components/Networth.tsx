function Networth({ data }: any) {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          Income : {data.Income ? data.Income : "..."}₹
        </li>
        <li className="list-group-item">
          Spendings : {data.Expense ? data.Expense : "..."}₹
        </li>
        <li className="list-group-item">
          Balance :{" "}
          {data.Income && data.Expense ? data.Income - data.Expense : "..."}₹
        </li>
      </ul>
    </>
  );
}

export default Networth;

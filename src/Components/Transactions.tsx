import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./styles.css";
import { useCallback } from "react";
import { PieChart, Pie, Sector } from "recharts";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/Components/Shadui/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

// import { DatePickerWithRange } from "./Shadui/ui/datepick";

//cahrt
interface MyData {
  name: string;
  value: string;
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"fill"}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#FF0000"}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} ₹`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {` ${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};
interface MyItem {
  Desc: string;
  Amount: number;
  Category: string;
  Date: Date;
  // Other properties if exist
}

function Transaction() {
  //chart
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: SetStateAction<number>) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  //else
  const [data, setdata] = useState<MyData[] | undefined>(undefined);

  const [Expensedata, setExpensedata] = useState<MyItem[]>([]);
  const [Incomedata, setIncomedata] = useState<MyItem[]>([]);
  const [selectedMethod, setSelectedMethod] = useState("method1");
  const [combinedData, setCombinedData] = useState<MyItem[]>([]);
  const [TotalIncome, setTotalIncome] = useState();
  const [TotalExpense, setTotalExpense] = useState();

  const [filteredbydate, setFilteredbydate] = useState<MyItem[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const owner_no = localStorage.getItem("owner");
  const owner = owner_no?.replace(/['"]+/g, "");

  function resetdate() {
    setEndDate("");
    setStartDate("");
    setSearch("");
    setSelectedMethod("method1");
  }

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
          const totalAmount = response.data.reduce(
            (total: any, item: { Amount: any }) => total + item.Amount,
            0
          );
          setTotalExpense(totalAmount);
          // console.log("Api request sent");
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

    // Set up interval to call fetchData every 5 seconds

    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);

    // console.log(Expensedata);
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
          const totalAmount = response.data.reduce(
            (total: any, item: { Amount: any }) => total + item.Amount,
            0
          );
          setTotalIncome(totalAmount);
          // console.log("income request");
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

    // Set up interval to call fetchData every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Combine data1 and data2 into combinedData
    if (Expensedata !== null && Incomedata !== null) {
      setCombinedData(Expensedata.concat(Incomedata));

      if (TotalExpense != null && TotalIncome != null) {
        const data = [
          { name: "INCOME", value: TotalIncome },
          { name: "EXPENSE", value: TotalExpense },
        ];
        setdata(data);
      }
      // console.log(combinedData);
    }
  }, [Expensedata, Incomedata]);

  useEffect(() => {
    const filterDataByDate = () => {
      if (combinedData != null) {
        const filtered = combinedData.filter((item) => {
          const itemDate = item.Date; // Assuming 'date' is the date property in your API data
          const startDateObject = new Date(startDate); // Convert startDate string to Date object
          const endDateObject = new Date(endDate); // Convert endDate string to Date object

          return itemDate >= startDateObject && itemDate <= endDateObject;
        });
        setFilteredbydate(filtered);
        // console.log(filtered);
      }
    };
    filterDataByDate();
    // console.log(startDate);
    // console.log(endDate);
  }, [Expensedata, Incomedata]);

  const [search, setSearch] = useState("");

  //Catogory filter
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(combinedData);

  let filters = [
    "TRANSPORT",
    "EDUCATION",
    "FOOD",
    "RENT",
    "MISC",
    "BILLS",
    "JOB",
    "BUSINESS",
    "OTHER",
  ];

  const handleFilterButtonClick = (selectedCategory: string) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = combinedData.filter(
          (item) => item.Category === selectedCategory
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems(combinedData);
    }
  };

  return (
    <div>
      <Navbar />
      {Expensedata == null ? (
        <div className="alert alert-primary" role="alert">
          <Link className="nav-link" to="/">
            Please Login to continue 𝐶̲𝑙̲𝑖̲𝑐̲𝑘̲ 𝐻̲𝑒̲𝑟̲𝑒̲.̲
          </Link>
        </div>
      ) : (
        <>
          <Container>
            {combinedData.length != 0 ? (
              ""
            ) : (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Oops</AlertTitle>
                <AlertDescription>Add New Entries</AlertDescription>
              </Alert>
            )}
            <h1 className="text-center mt-4">Transactions</h1>
            {combinedData.length != 0 ? (
              <PieChart width={400} height={370}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx={200}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                />
              </PieChart>
            ) : (
              ""
            )}
            <Form>
              <InputGroup className="my-3">
                {/* onChange for search */}
                <Form.Control
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedMethod("method1");
                  }}
                  placeholder="Search Transaction"
                />
              </InputGroup>
            </Form>{" "}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort By Category
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="buttons-container">
                  {filters.map((category, idx) => (
                    <button
                      onClick={() => {
                        handleFilterButtonClick(category);
                        setSelectedMethod("method2");
                      }}
                      className={`btn btn-primary dropdown-item ${
                        selectedFilters?.includes(category) ? "active" : ""
                      }`}
                      key={`filters-${idx}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="container p-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setSelectedMethod("method3");
                }}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setSelectedMethod("method3");
                }}
              />
              <button className="m-2" onClick={() => resetdate()}>
                Reset Filters
              </button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Desc</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {combinedData && selectedMethod === "method1" && (
                  <>
                    {combinedData
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.Desc.toLowerCase().includes(
                              search.toLowerCase()
                            ) || item.Amount.toString().includes(search);
                      })
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.Desc}</td>
                            <td>{item.Amount}</td>

                            <td>{item.Category}</td>
                            <td>{item.Date.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                  </>
                )}

                {filteredItems && selectedMethod === "method2" && (
                  <>
                    {filteredItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Desc}</td>
                        <td>{item.Amount}</td>

                        <td>{item.Category}</td>
                        <td>{item.Date.toLocaleString()}</td>
                      </tr>
                    ))}
                  </>
                )}
                {filteredbydate && selectedMethod === "method3" && (
                  <>
                    {filteredbydate.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Desc}</td>
                        <td>{item.Amount}</td>

                        <td>{item.Category}</td>
                        <td>{item.Date.toLocaleString()}</td>
                      </tr>
                    ))}
                  </>
                )}
                <tr>
                  <th scope="row">Total</th>
                  <td></td>
                  <td></td>
                  <td>
                    {selectedMethod === "method1" && (
                      <p>
                        {combinedData
                          .filter((item) => {
                            return (
                              search.toLowerCase() === "" ||
                              item.Desc.toLowerCase().includes(
                                search.toLowerCase()
                              ) ||
                              item.Amount.toString().includes(search)
                            );
                          })
                          .reduce((acc, item) => acc + item.Amount, 0)}
                      </p>
                    )}

                    {selectedMethod === "method2" && (
                      <p>
                        {filteredItems.reduce(
                          (acc, item) => acc + item.Amount,
                          0
                        )}
                      </p>
                    )}
                    {selectedMethod === "method3" && (
                      <p>
                        {filteredbydate.reduce(
                          (acc, item) => acc + item.Amount,
                          0
                        )}
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </>
      )}
      {/* <DatePickerWithRange /> */}
    </div>
  );
}
export default Transaction;

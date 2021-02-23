import logo from "./logo.svg";
import "./App.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value] = useDebounce(search, 1000);

  useEffect(() => {
    if (!value) {
      return;
    }
    setLoading(true);
    callApi();
  }, [value]);

  const callApi = async () => {
    await axios.get(`http://127.0.0.1:5000/data?query=${value}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </InputGroup>
      <h1>{loading ? "Loading..." : ""}</h1>
      <table style={{ width: "100%" }}>
        <tr>
          <th>Item Name</th>
          <th>Order Date</th>
          <th>Price</th>
        </tr>
        {data.map((row) => (
          <tr>
            <td>{row["Item Name"]}</td>
            <td>{row["Order Date"]}</td>
            <td>{row["Product Price"]}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;

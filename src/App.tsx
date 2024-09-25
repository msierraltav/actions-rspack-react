import React from "react";
import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
// method one, is possible to get the data from the json file
// simply importing it.
// import dataJsonFile from "./assets/data.json"

interface TData {
  id: number;
  name: string;
}

function App() {
  // this was a interview question, take data from the data.json
  // then show it in a list
  // and in search component filter the list
  // when a element of the list is clicked , delete it.
  // add test in jest!!, por que si!

  const [initialData, setInitialData] = useState<TData[]>([]);
  const [dataList, setDataList] = useState<TData[]>([]);

  const handleDelete = (id) => {
    setDataList(dataList.filter((item) => item.id !== id));
  }

  const handleSearchText = (text) => {
    if(text.length > 2){
      setDataList(dataList.filter((item) => item.name.toLowerCase().includes(text.toLowerCase())));
    }else{
      setDataList(initialData);
    }
  }

  // using axios. the tip is the response from the file is "data"
  const axios = require("axios");
  useEffect(() => {
    const getData = async () => {
      await axios.get("/data.json").then((response) => {
        return response.data;
      })
      .then((data) => {
        setInitialData(data);
        setDataList(data);
      })
      .catch(error => console.log(error));
    };

    getData();
  }, []);

  // using fetch
  // really it was too easy??
  // useEffect(() => {
  //   const getData = async () => {
  //     await fetch("/data.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDataList(data);
  //     })
  //     .catch(error => console.log(error));
  //   };
  //   getData();
  // },[])

  return (
    <>
      <h1>List searcher!!! </h1>
      <div>
        <input type="text"
          placeholder="search..."
          onChange={(e) => {handleSearchText(e.target.value)}}
        >
        </input>
      </div>
      <ul>
        {dataList.length > 0  && dataList.map((data) => (
            <li key={data.id}
              onClick={() => {handleDelete(data.id)}}
            >
              {data.name}
            </li>
          ))}
      </ul>
    </>
  );
}

export default App;

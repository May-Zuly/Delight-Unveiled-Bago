import * as XLSX from "xlsx";

import { Button, Table } from "antd";

import React from "react";
import { useState } from "react";

export default function Item() {
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [header, setHeader] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const header = excelData[0] || [];
      const data = excelData.slice(1).map((row, index) => {
        const obj = {};
        const arrlist = row;
        arrlist.forEach((cell, i) => {
          obj[header[i] || `Column${i + 1}`] = cell;
        });
        obj.key = index.toString();
        return obj;
      });

      setHeader(header);
      setArray(data);
    };

    reader.readAsBinaryString(file);
  };

  const csvFileToArray = () => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    setHeader(csvHeader);
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const newArray = csvRows.map((i, index) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      });
      obj.key = index.toString();
      return obj;
    });

    setArray(newArray);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension === "csv") {
        fileReader.onload = function (event) {
          if (event.target && event.target.result) {
            const text = event.target.result.toString();
            csvFileToArray(text);
          }
        };

        fileReader.readAsText(file);
      } else if (extension === "xls" || extension === "xlsx") {
        readExcel(file);
      } else {
        console.error("Unsupported file format");
      }
    }
  };

  const columns = header.map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }));

  const handleDownload = (type) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(array);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, `movie.${type}`, { compression: true });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV/XLS IMPORT EXAMPLE</h1>
      <Button
        onClick={() => {
          handleDownload("xlsx");
        }}
      >
        Excel Download
      </Button>
      <Button
        onClick={() => {
          handleDownload("csv");
        }}
      >
        Csv Download
      </Button>
      <form>
        <input type={"file"} id={"fileInput"} onChange={handleOnChange} />

        <Button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT FILE
        </Button>
      </form>
      <br />
      <Table dataSource={array} columns={columns} />
    </div>
  );
}

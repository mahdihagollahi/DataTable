import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const AddFile = () => {
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;

      if (file.type === "application/json") {
        setFileType("JSON");
        handleJSONFile(content);
      } else if (file.type === "text/csv") {
        setFileType("CSV");
        handleCSVFile(content);
      } else {
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>فقط فایل‌های JSON و CSV پشتیبانی می‌شوند!</span>
        </div>;
      }
    };

    reader.readAsText(file);
  };

  const handleJSONFile = (content) => {
    try {
      const parsedData = JSON.parse(content);
      if (Array.isArray(parsedData)) {
        setData(parsedData);
      } else {
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>فایل JSON باید آرایه‌ای از اشیاء باشد!</span>
        </div>;
      }
    } catch (error) {
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>فایل CSV نامعتبر است!</span>
      </div>;
    }
  };

  const handleCSVFile = (content) => {
    const rows = content.split("\n").map((row) => row.split(","));
    const [header, ...body] = rows;

    if (header && body.length > 0) {
      setData(
        body.map((row) =>
          row.reduce((acc, value, index) => {
            acc[header[index]] = value;
            return acc;
          }, {})
        )
      );
    } else {
      alert("فایل CSV نامعتبر است!");
    }
  };
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key, index) => ({
          field: key,
          headerName: key,
          width: 150,
        }))
      : [];

  return (
    <div className="">
      {data.length > 0 ? (
        <div className="flex items-center justify-center  h-screen">
          
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data.map((item, index) => ({ id: index + 1, ...item }))}
              columns={columns}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div
            className="w-full px-4 py-8 mx-auto shadow rounded-lg lg:w-1/3 bg-white"
            style={{ backgroundColor: "var(--background)" }}
          >
            <div className="flex items-center mb-6">
              <h1 className="mr-3 text-4xl font-bold text-green-400">
                DataTable
              </h1>
            </div>
            <div className="relative">
              <input
                accept=".json,.csv"
                onChange={handleFileUpload}
                type="file"
                className="file-input file-input-bordered file-input-success w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFile;

import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

type RowData = { [key: string]: string };

const AddFile: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [fileType, setFileType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;

      if (file.type === "application/json") {
        setFileType("JSON");
        handleJSONFile(content);
      } else if (file.type === "text/csv") {
        setFileType("CSV");
        handleCSVFile(content);
      } else {
        alert("فقط فایل‌های JSON و CSV پشتیبانی می‌شوند!");
      }
    };

    reader.readAsText(file);
  };

  const handleJSONFile = (content: string): void => {
    try {
      const parsedData = JSON.parse(content);
      if (Array.isArray(parsedData)) {
        setData(parsedData);
      } else {
        alert("فایل JSON باید آرایه‌ای از اشیاء باشد!");
      }
    } catch (error) {
      alert("فایل JSON نامعتبر است!");
    }
  };

  const handleCSVFile = (content: string): void => {
    const rows = content.split("\n").map((row) => row.split(","));
    const [header, ...body] = rows;

    if (header && body.length > 0) {
      setData(
        body.map((row) =>
          row.reduce((acc, value, index) => {
            acc[header[index]] = value;
            return acc;
          }, {} as RowData)
        )
      );
    } else {
      alert("فایل CSV نامعتبر است!");
    }
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns: GridColDef[] =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          width: 150,
        }))
      : [];

  return (
    <div className="">
      {data.length > 0 ? (
        <div className="flex relative gap-6 flex-col px-20 items-center justify-center h-screen">
       

          <label className="input   w-[100%] input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <Paper sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredData.map((item, index) => ({
                id: index + 1,
                ...item,
              }))}
              columns={columns}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      ) : (
        <div className="flex px-20 items-center justify-center h-screen">
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

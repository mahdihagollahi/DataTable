"use client";
import React, { useState } from "react";

interface user {
  event: string;
  state: string;
}

const AddFile: React.FC<user> = ({ event, state }) => {
  const [newTitle, setNewTitle] = useState<string>("");

  return (
    <div>
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
          <div className="relative flex justify-center">
            <input
              type="file"
              className="file-input file-input-bordered file-input-success w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFile;

import React from "react";

const ReusableTable = ({ headers, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-200 w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 text-gray-600 font-medium"
              >
                {header}
              </th>
            ))}
            {actions?.length > 0 && (
              <th className="border border-gray-300 px-4 py-2 text-gray-600 font-medium">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-gray-50 ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 px-4 py-2 text-gray-800"
                >
                  {row[header.toLowerCase()] || "-"}
                </td>
              ))}
              {actions?.length > 0 && (
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className={`${
                        action.type === "toggle"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      } hover:bg-gray-300 text-sm py-1 px-3 mx-1 rounded`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;

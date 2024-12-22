import React, { ReactNode } from "react";

interface TableProps {
  header: ReactNode;
  body: ReactNode;
}

const Table: React.FC<TableProps> = ({ header, body }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {header}
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default Table;

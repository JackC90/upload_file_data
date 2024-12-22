import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode | string;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr className="bg-white border-b">{children}</tr>;
};

export default TableRow;

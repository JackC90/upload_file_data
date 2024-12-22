import React, { ReactNode } from "react";

interface TableColProps {
  children: ReactNode | string;
}

const TableCol: React.FC<TableColProps> = ({ children }) => {
  return <td className="px-6 py-4">{children}</td>;
};

export default TableCol;

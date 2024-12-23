import React from "react";

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  initialCurrentPage?: number;
  itemsPerPage?: number;
  total?: number;
  onChangePage?: Function;
}

export interface OnChangePageValue {
  page: number;
  offset: number;
  limit: number;
}
